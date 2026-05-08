# Termp Cypress Test Automation

Functional Cypress test framework for `https://stage.termp.com` with optional Qase TestOps result sync.

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- Verified Termp test user credentials
- Qase project code and API token when result sync is required
- Access to `https://stage.termp.com`
- Access to Qase project `TERMP`

## Setup

```bash
npm install
copy .env.example .env
```

For a clean CI-style install, use:

```bash
npm ci
```

Update `.env` with the local credentials and, when needed, Qase settings.

Required account variables for the current automated coverage:

```bash
CYPRESS_USER_EMAIL=omoviesmith+1@gmail.com
CYPRESS_USER_PASSWORD=<admin password>
CYPRESS_USER_MFA_SECRET=<admin TOTP secret>

CYPRESS_TRANSLATOR_EMAIL=omoviesmith+2@gmail.com
CYPRESS_TRANSLATOR_PASSWORD=<translator password>
CYPRESS_TRANSLATOR_MFA_SECRET=<translator TOTP secret>

CYPRESS_PM_EMAIL=omoviesmith+3@gmail.com
CYPRESS_PM_PASSWORD=<project manager password>
CYPRESS_PM_MFA_SECRET=<project manager TOTP secret>
```

The MFA secret is the manual setup code shown by Termp when enabling two-factor authentication. Cypress uses it to generate current TOTP codes locally during login.

## Run Tests Locally

```bash
npm run cy:run
```

Open interactive Cypress:

```bash
npm run cy:open
```

Run in Chrome:

```bash
npm run cy:run:chrome
```

## Qase Sync

Qase reporting is disabled by default through `QASE_MODE=off`.

To send results to Qase, create a Qase API token from the logged-in Qase account, then set:

```bash
QASE_MODE=testops
QASE_TESTOPS_PROJECT=TERMP
QASE_TESTOPS_API_TOKEN=<api-token>
QASE_TEST_RUN_TITLE=Termp Cypress Automated Run
QASE_TEST_RUN_COMPLETE=true
```

Run the full suite and upload results:

```bash
npm run cy:qase
```

Run a single synced spec:

```bash
npm run cy:qase -- --spec cypress/e2e/auth/authentication.cy.js
```

For local-only runs, keep `QASE_MODE=off` and use `npm run cy:run`. The Cypress wrapper also supports one-off Qase sync by setting `QASE_MODE=testops` automatically when `npm run cy:qase` is used.

The Cypress specs are mapped to the Qase cases created in project `TERMP` using `qase(<case-id>, ...)` annotations.

The local reporter bridge at `scripts/qase-reporter.cjs` exports the reporter class used by Cypress. Keep this file when upgrading the reporter unless the package root begins exporting the reporter class directly.

Qase results can be viewed from the Qase project runs area:

```text
https://app.qase.io/run/TERMP
```

Recent verified synced runs from final verification:

- Run 3: Authentication
- Run 4: Dashboard
- Run 5: Project management
- Run 6: Document workflows
- Run 7: Translation Memory and Term Base
- Run 8: Role-based permissions
- Run 9: Global search

## Automated Coverage

Current Stage 4 specs are organized by feature area:

- `cypress/e2e/auth/authentication.cy.js`
- `cypress/e2e/dashboard/dashboard.cy.js`
- `cypress/e2e/projects/project-management.cy.js`
- `cypress/e2e/documents/document-workflows.cy.js`
- `cypress/e2e/resources/tm-tb.cy.js`
- `cypress/e2e/roles/role-permissions.cy.js`
- `cypress/e2e/search/global-search.cy.js`

The role-permission specs intentionally assert the expected client behavior. They may fail while known UI permission exposures remain open, for example Translator visibility of project/TM/TB management controls.

## Final Verification

Final verification was run on Windows PowerShell from:

```text
C:\Users\Smith\Documents\qase_test
```

Clean dependency installation:

```bash
npm ci
```

Local full-suite verification:

```bash
npm run cy:run
```

Final local result:

```text
26 tests
26 passing
0 failing
0 pending
0 skipped
Duration: 04:19
```

Qase sync verification was run per spec with `npm run cy:qase -- --spec <spec-path>` to avoid long all-spec upload sessions timing out in the local shell. Each synced spec completed successfully and created a Qase run.

## Recording Artifacts

Cypress writes videos to `cypress/videos/`, but that folder is managed by Cypress and can be cleared or replaced on later runs. For delivery, successful run videos are copied into `automation-recordings/` so they persist independently of future Cypress executions.

Persistent recording files:

- `automation-recordings/01-authentication.cy.js.mp4`
- `automation-recordings/02-dashboard.cy.js.mp4`
- `automation-recordings/03-project-management.cy.js.mp4`
- `automation-recordings/04-document-workflows.cy.js.mp4`
- `automation-recordings/05-tm-tb.cy.js.mp4`
- `automation-recordings/06-role-permissions.cy.js.mp4`
- `automation-recordings/07-global-search.cy.js.mp4`

Terminal output from final verification is represented by the command summaries above and by the Qase run IDs listed in the Qase Sync section.

The generated delivery ZIP excludes `.env`, `node_modules`, screenshots, and other local-only artifacts. Do not add `.env` or API tokens to source control or delivery archives.

## Current Notes

- `omoviesmith+1@gmail.com` is the Admin account.
- `omoviesmith+2@gmail.com` is the Translator account.
- `omoviesmith+3@gmail.com` is the Project Manager account.
- Additional Gmail aliases can be used for Reviewer and disposable edge-case accounts.
