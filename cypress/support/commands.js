Cypress.Commands.add('login', (email = Cypress.env('userEmail'), password = Cypress.env('userPassword')) => {
  if (!email || !password) {
    throw new Error('Missing login credentials. Set CYPRESS_USER_EMAIL and CYPRESS_USER_PASSWORD.');
  }

  cy.visit('/login');
  cy.findByLabelTextOrPlaceholder('Email').clear().type(email);
  cy.findByLabelTextOrPlaceholder('Password').clear().type(password, { log: false });
  cy.contains('button', /^Sign in$/).click();
});

Cypress.Commands.add('findByLabelTextOrPlaceholder', (label) => {
  return cy.contains(label)
    .invoke('attr', 'for')
    .then((inputId) => {
      if (inputId) {
        return cy.get(`#${inputId}`);
      }

      return cy.get(`input[placeholder="${label}"], input[name="${label.toLowerCase()}"]`).first();
    });
});
