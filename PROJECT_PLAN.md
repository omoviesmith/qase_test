## One-Page Project Plan: Qase Test Plan & Cypress Automation

### Project Goal

The goal of this project is to build a complete functional testing framework for **stage.termp.com**, covering the website’s core workflows across different user roles. The project will include manual test case documentation in **Qase.io**, automated test scripts using **Cypress**, Qase execution result integration, and final delivery with clear setup instructions and a demo recording.

---

## Stage 1: Project Access, Setup & Requirement Confirmation

The first stage is to collect all required access and confirm the testing scope. I will request access to the client’s **Qase.io project**, the staging website URL, available user roles, and any known business-critical workflows. Since the client mentioned that many users and emails can be created for testing, I will prepare a list of required test accounts for each role or create them directly where possible.

Key activities:

* Share Qase login/email with the client for project access.
* Confirm available roles and user types on `stage.termp.com`.
* Confirm whether test users can be freely created and deleted.
* Review any existing documentation, if available.
* Set up the local Cypress project structure.

Deliverable from this stage: confirmed access, testing assumptions, and initial Cypress project skeleton.

---

## Stage 2: Website Analysis & Workflow Mapping

After access is confirmed, I will perform black-box testing on the staging site. The purpose of this stage is to explore the website like a real user and identify all major workflows across the roughly 20 pages.

This will include reviewing navigation, authentication, dashboards, forms, role-based permissions, user management flows, and any key transactional or business logic features. Each workflow will be mapped clearly before test case creation begins.

Key activities:

* Explore all visible pages and menus.
* Identify core user journeys for each role.
* Document positive, negative, and edge-case scenarios.
* Note reusable test data, required accounts, and dependencies.
* Prioritize critical workflows for automation.

Deliverable from this stage: a workflow map showing what will be tested and automated.

---

## Stage 3: Qase Test Case Creation

Once workflows are mapped, I will create a structured test suite inside the client’s **Qase.io** project. Test cases will be written in plain English so they are easy for both technical and non-technical stakeholders to review.

The Qase structure will likely be organized by feature area and user role, for example:

* Authentication
* User registration and login
* Role-based access
* Dashboard workflows
* Profile/account management
* Forms and submissions
* Admin or management workflows
* Notifications or email-related flows, if applicable
* Error handling and validation

Each test case will include clear preconditions, test steps, expected results, and priority.

Deliverable from this stage: a fully populated Qase project containing functional test suites and test cases.

---

## Stage 4: Cypress Automation Development

After the Qase test cases are prepared, I will develop Cypress automation scripts for the selected functional workflows. The framework will be built from scratch using a clean and maintainable structure.

The Cypress repository will include:

* `package.json`
* Cypress configuration files
* Test specs organized by feature or role
* Reusable commands and helper functions
* Test data handling
* Environment variable support for URLs, credentials, and Qase API settings
* Clear folder structure for future maintenance

The automation will focus on stable, repeatable test cases that can be run locally against the staging URL.

Deliverable from this stage: Cypress automated test suite covering the agreed core workflows.

---

## Stage 5: Qase Reporter Integration

The next stage is to configure Cypress so that automated test execution results sync directly with the Qase dashboard using the open-source Qase reporter plugin.

This will include setting up the Qase project code, API token configuration, test run creation, and mapping Cypress tests to Qase case IDs where required.

Key activities:

* Install and configure the Qase Cypress reporter.
* Add environment-based Qase API settings.
* Connect automated test cases to Qase case references.
* Run tests locally and confirm pass/fail results appear in Qase.
* Document how the client can configure their own API token.

Deliverable from this stage: working Cypress-to-Qase result synchronization.

---

## Stage 6: Final Verification, README & Recording

Before delivery, I will run the full test suite locally and verify that the setup works from a clean installation. I will also prepare a detailed README file explaining exactly how to install dependencies, configure the staging URL, set Qase credentials, run the tests, and view synced results in Qase.

A screen recording will be created to demonstrate:

* Cypress tests running successfully.
* Test results appearing in the terminal.
* Pass/fail results syncing to the Qase dashboard.

Final deliverables:

* Fully populated Qase.io project.
* Complete Cypress testing repository as a ZIP file.
* Detailed README with setup and execution instructions.
* Screen recording showing successful automation and Qase sync.

---

## Proposed Client Reply

Hello, nice to work with you too, and thank you for the details.

The staged approach makes sense. I will first review `stage.termp.com`, identify the available user roles and core workflows, then create structured test cases in Qase before automating the key flows with Cypress. After that, I will configure the Qase reporter so Cypress execution results sync back to the Qase dashboard.

Please add me to your Qase project using this email: **[your Qase email here]**.

Once I have access, I will begin by reviewing the site structure, creating test users for the different roles, and mapping the workflows before writing the test cases and automation scripts.


## Original Project Details

Build a testing framework from scratch for a new website (around 20 pages). A live staging URL will be provided for black-box testing. The objective is to analyze the site, document the core workflows tests in our Qase.io, and automate them using Cypress.

Scope of Work
Analyze & Plan: Analyze the live staging site to map out all core functional workflows.
Test Case Creation: Write a structured, comprehensive test suite in our Qase.io using plain English.
Automation: Develop Cypress scripts to automate the test cases against the staging URL.
Integration: Configure the open-source Cypress framework to sync execution results directly to the Qase dashboard using the Qase reporter plugin. Final verification will take place locally after the delivered files are extracted and run.

Deliverables
A fully populated project in our Qase.io containing all functional test suites and cases.
A ZIP file containing the complete Cypress testing repository (including package.json, test scripts, and config files).
A detailed README file with step-by-step instructions for local installation, test execution, and configuring the Qase API integration.
A screen recording demonstrating the automated test suite running successfully and the pass/fail results syncing to the Qase dashboard.
