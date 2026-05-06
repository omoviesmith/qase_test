const { defineConfig } = require('cypress');
require('dotenv').config();

const qaseEnabled = process.env.QASE_MODE === 'testops';

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
      userPassword: process.env.CYPRESS_USER_PASSWORD
    },
    setupNodeEvents(on, config) {
      require('cypress-qase-reporter/plugin')(on, config);
      require('cypress-qase-reporter/metadata')(on);
      return config;
    }
  },
  reporter: qaseEnabled ? 'cypress-qase-reporter' : 'spec',
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
