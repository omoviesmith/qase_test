# Termp Cypress Delivery Notes

## Delivered Items

- Qase project `TERMP` populated with manual test suites and cases.
- Cypress automation suite covering 26 mapped test cases.
- Qase reporter integration with `npm run cy:qase`.
- Workflow map in `WORKFLOW_MAP.md`.
- README with install, environment, local run, Qase sync, and verification instructions.
- Cypress run videos copied to `automation-recordings/`.

## Final Verification

Environment:

- Windows PowerShell
- Node.js `v20.19.1`
- Cypress `14.5.4`
- Base URL: `https://stage.termp.com`

Clean install:

```powershell
npm ci
```

Result: dependency installation completed successfully.

Local full-suite run:

```powershell
npm run cy:run
```

Result:

```text
26 tests
26 passing
0 failing
0 pending
0 skipped
Duration: 04:19
```

Qase sync verification:

```powershell
npm run cy:qase -- --spec cypress/e2e/auth/authentication.cy.js
npm run cy:qase -- --spec cypress/e2e/dashboard/dashboard.cy.js
npm run cy:qase -- --spec cypress/e2e/projects/project-management.cy.js
npm run cy:qase -- --spec cypress/e2e/documents/document-workflows.cy.js
npm run cy:qase -- --spec cypress/e2e/resources/tm-tb.cy.js
npm run cy:qase -- --spec cypress/e2e/roles/role-permissions.cy.js
npm run cy:qase -- --spec cypress/e2e/search/global-search.cy.js
```

Verified Qase runs:

- Run 3: Authentication
- Run 4: Dashboard
- Run 5: Project management
- Run 6: Document workflows
- Run 7: Translation Memory and Term Base
- Run 8: Role-based permissions
- Run 9: Global search

## Packaging Notes

The delivery ZIP intentionally excludes:

- `.env`
- `node_modules`
- `cypress/screenshots`
- `cypress/downloads`
- local debug output

The client should create their own `.env` from `.env.example`.

Note: Cypress manages `cypress/videos/` and can clear or replace those files on later runs. The persistent delivered recording artifacts are in `automation-recordings/`.
