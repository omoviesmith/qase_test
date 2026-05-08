Cypress.Commands.add('login', (
  email = Cypress.env('userEmail'),
  password = Cypress.env('userPassword'),
  mfaSecret = Cypress.env('userMfaSecret')
) => {
  if (!email || !password) {
    throw new Error('Missing login credentials. Set CYPRESS_USER_EMAIL and CYPRESS_USER_PASSWORD.');
  }

  cy.visit('/login');
  cy.findByLabelTextOrPlaceholder('Email').clear().type(email);
  cy.findByLabelTextOrPlaceholder('Password').clear().type(password, { log: false });
  cy.contains('button', /^Sign in$/).click();

  cy.get('body', { timeout: 15000 }).should(($body) => {
    expect($body.text()).not.to.include('Signing in');
  });

  cy.location('pathname', { timeout: 15000 }).then((pathname) => {
    if (pathname === '/dashboard') {
      return;
    }

    return cy.get('body').then(($body) => {
      const bodyText = $body.text();

      if (bodyText.includes('Two-factor authentication')) {
        if (!mfaSecret) {
          throw new Error(`MFA code is required for ${email}. Set the matching MFA secret in .env.`);
        }

        return cy.task('generateTotp', mfaSecret).then((code) => {
          cy.findByLabelTextOrPlaceholder('Authentication code').clear().type(code, { log: false });
          return cy.contains('button', /^Verify$/).click();
        });
      }

      throw new Error(`Login did not reach dashboard or MFA page. Current path: ${pathname}`);
    });
  });

  cy.location('pathname', { timeout: 15000 }).should('eq', '/dashboard');
});

Cypress.Commands.add('findByLabelTextOrPlaceholder', (label) => {
  return cy.get('body').then(($body) => {
    const lowerName = label.toLowerCase();
    const placeholderSelector = [
      `input[placeholder="${label}"]`,
      `textarea[placeholder="${label}"]`,
      `input[name="${lowerName}"]`,
      `textarea[name="${lowerName}"]`,
      `input[aria-label="${label}"]`,
      `textarea[aria-label="${label}"]`
    ].join(', ');

    if ($body.find(placeholderSelector).length) {
      return cy.get(placeholderSelector).first();
    }

    const labelElement = $body.find('label')
      .filter((_, element) => Cypress.$(element).text().trim() === label)
      .first();
    const inputId = labelElement.attr('for');

    if (inputId && $body.find(`#${inputId}`).length) {
      return cy.get(`#${inputId}`);
    }

    return cy.contains(label)
      .parent()
      .find('input, textarea')
      .first();
  });
});

Cypress.Commands.add('loginAs', (role) => {
  const users = {
    admin: {
      email: Cypress.env('userEmail'),
      password: Cypress.env('userPassword'),
      mfaSecret: Cypress.env('userMfaSecret')
    },
    translator: {
      email: Cypress.env('translatorEmail'),
      password: Cypress.env('translatorPassword'),
      mfaSecret: Cypress.env('translatorMfaSecret')
    },
    projectManager: {
      email: Cypress.env('projectManagerEmail'),
      password: Cypress.env('projectManagerPassword'),
      mfaSecret: Cypress.env('projectManagerMfaSecret')
    }
  };

  const user = users[role];
  if (!user) {
    throw new Error(`Unknown login role: ${role}`);
  }

  if (!user.email || !user.password) {
    throw new Error(`Missing ${role} credentials in Cypress env.`);
  }

  cy.login(user.email, user.password, user.mfaSecret);
});

Cypress.Commands.add('logout', () => {
  cy.get('body').then(($body) => {
    if ($body.text().includes('Sign in')) {
      return;
    }

    cy.contains('button', /@/).click();
    cy.contains('button', 'Logout').click();
  });
});

Cypress.Commands.add('openProjectByName', (projectName = Cypress.env('projectName')) => {
  cy.visit('/projects');
  cy.contains('Loading...', { timeout: 60000 }).should('not.exist');
  cy.contains('a', projectName, { timeout: 60000 }).click();
});

Cypress.Commands.add('assertSignedInAs', (email) => {
  cy.contains('button', email, { timeout: 15000 }).should('be.visible');
});
