const { defineConfig } = require('cypress');
const path = require('node:path');
require('dotenv').config();

const qaseEnabled = process.env.QASE_MODE === 'testops';
const qaseReporter = path.join(__dirname, 'scripts', 'qase-reporter.cjs');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://stage.termp.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    retries: {
      runMode: 1,
      openMode: 0
    },
    env: {
      userEmail: process.env.CYPRESS_USER_EMAIL,
      userPassword: process.env.CYPRESS_USER_PASSWORD,
      userMfaSecret: process.env.CYPRESS_USER_MFA_SECRET,
      translatorEmail: process.env.CYPRESS_TRANSLATOR_EMAIL,
      translatorPassword: process.env.CYPRESS_TRANSLATOR_PASSWORD,
      translatorMfaSecret: process.env.CYPRESS_TRANSLATOR_MFA_SECRET,
      projectManagerEmail: process.env.CYPRESS_PM_EMAIL || process.env.CYPRESS_PROJECT_MANAGER_EMAIL,
      projectManagerPassword: process.env.CYPRESS_PM_PASSWORD || process.env.CYPRESS_PROJECT_MANAGER_PASSWORD,
      projectManagerMfaSecret: process.env.CYPRESS_PM_MFA_SECRET || process.env.CYPRESS_PROJECT_MANAGER_MFA_SECRET,
      projectName: process.env.CYPRESS_PROJECT_NAME || 'Qase Smoke Translation Project',
      documentName: process.env.CYPRESS_DOCUMENT_NAME || 'sample-translation.txt'
    },
    setupNodeEvents(on, config) {
      if (qaseEnabled && !process.env.QASE_TESTOPS_API_TOKEN) {
        throw new Error('Qase reporting is enabled, but QASE_TESTOPS_API_TOKEN is missing. Add it to .env or run with QASE_MODE=off.');
      }

      on('task', {
        generateTotp(secret) {
          if (!secret) {
            throw new Error('Missing MFA secret for TOTP generation.');
          }

          const crypto = require('crypto');
          const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
          const cleanedSecret = secret.replace(/\s+/g, '').toUpperCase();
          let bits = '';
          for (const char of cleanedSecret) {
            const value = alphabet.indexOf(char);
            if (value === -1) {
              throw new Error(`Invalid base32 character in MFA secret: ${char}`);
            }
            bits += value.toString(2).padStart(5, '0');
          }

          const bytes = [];
          for (let i = 0; i + 8 <= bits.length; i += 8) {
            bytes.push(parseInt(bits.slice(i, i + 8), 2));
          }

          const counter = Math.floor(Date.now() / 1000 / 30);
          const buffer = Buffer.alloc(8);
          buffer.writeBigUInt64BE(BigInt(counter));
          const hmac = crypto.createHmac('sha1', Buffer.from(bytes)).update(buffer).digest();
          const offset = hmac[hmac.length - 1] & 0x0f;
          const code = (hmac.readUInt32BE(offset) & 0x7fffffff) % 1000000;

          return String(code).padStart(6, '0');
        }
      });
      require('cypress-qase-reporter/plugin')(on, config);
      require('cypress-qase-reporter/metadata')(on);
      return config;
    }
  },
  reporter: qaseEnabled ? qaseReporter : 'spec',
  reporterOptions: qaseEnabled ? {
    mode: 'testops',
    debug: process.env.QASE_DEBUG === 'true',
    testops: {
      project: process.env.QASE_TESTOPS_PROJECT,
      api: {
        token: process.env.QASE_TESTOPS_API_TOKEN
      },
      uploadAttachments: true,
      run: {
        title: process.env.QASE_TEST_RUN_TITLE || 'Termp Cypress Automated Run',
        complete: process.env.QASE_TEST_RUN_COMPLETE !== 'false'
      },
      batch: {
        size: 100
      }
    },
    framework: {
      cypress: {
        screenshotsFolder: 'cypress/screenshots',
        videosFolder: 'cypress/videos',
        browser: {
          addAsParameter: true,
          parameterName: 'browser'
        }
      }
    }
  } : {}
});
