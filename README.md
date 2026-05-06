# Termp Cypress Test Automation

Functional Cypress test framework for `https://stage.termp.com` with optional Qase TestOps result sync.

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- Verified Termp test user credentials
- Qase project code and API token when result sync is required

## Setup

```bash
npm install
copy .env.example .env
```

Update `.env` with the local credentials and, when needed, Qase settings.

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

To send results to Qase, set:

```bash
QASE_MODE=testops
QASE_TESTOPS_PROJECT=<project-code>
QASE_TESTOPS_API_TOKEN=<api-token>
```

Then run:

```bash
npm run cy:run
```

Replace placeholder `qase(0, ...)` IDs in specs with the real Qase case IDs once the manual suite is created.

## Current Notes

- `omoviesmith+1@gmail.com` was created and verified manually.
- Login currently accepts credentials, then requires two-factor authentication setup before reaching the application.
- Additional Gmail aliases such as `omoviesmith+2@gmail.com` can be used for separate test accounts if the app requires unique emails.
