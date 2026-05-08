# Termp Workflow Map

Date explored: May 6, 2026
Environment: https://stage.termp.com
Account: omoviesmith+1@gmail.com
Organization: Qase Test Org

## Scope Covered

Black-box exploration was performed through the authenticated staging UI using Chrome DevTools. The explored areas include onboarding, dashboard, projects, document upload, assignment, translation, review, resources, analytics, organization settings, role invitation, security settings, global search, and account controls.

## Roles And User Types

Client-provided role model has two layers.

Organization roles:

- Admin
- Project Manager
- Translator
- Reviewer

Document roles:

- Translator
- Reviewer 1
- Reviewer 2

Current user state:

- Movie Smith is an Admin in Qase Test Org.
- Admin can create projects, upload documents, claim assignments, create TM/TB resources, attach resources, invite users, view settings, and access security controls.

Role mapping notes:

- Org role `reviewer` maps to document roles `reviewer_1` and `reviewer_2`.
- Admin has full unrestricted access.
- Project Manager manages assigned projects but cannot delete projects or documents.
- Translator can only work on documents assigned to them as translator and only during translation stage.
- Reviewer can claim reviewer roles and only edit during their assigned review stage.

Role-based workflows still need multi-account validation:

- Translator-only visibility and document actions.
- Reviewer-only visibility and approval actions.
- Project Manager access to project/resource management without full admin security controls.
- Admin-only access to organization member invitation, role assignment, MFA controls, archive/delete, and resource deletion.

## Test Data Created

- Organization: Qase Test Org
- Project: Qase Smoke Translation Project
- Source language: en
- Target language: es
- Workflow: Single Review
- Document: sample-translation.txt
- Translation Memory: Qase Test TM, en to es, attached as writable
- Term Base: Qase Test Term Base, en to es, attached
- Local upload file: test-data/sample-translation.txt

Translated segments:

- Welcome to Termp. -> Bienvenido a Termp.
- This is a sample document for translation workflow testing. -> Este es un documento de muestra para probar el flujo de traduccion.
- Please review each segment before submitting the translation. -> Revise cada segmento antes de enviar la traduccion.

## Navigation Map

Visible authenticated navigation:

- Dashboard: organization overview, metric cards, overall progress, segment status, recent projects, recent activity.
- Projects: project list, status filtering, project creation, project detail tabs.
- Translation Memory: create TM, upload TMX, delete TM.
- Term Base: create term base, upload TBX, delete term base.
- Analytics: organization-wide project/document/segment/word metrics and charts.
- Settings: Members, General, Security.
- Global search: searches projects, documents, segments, TM, and terms.
- Account menu: Settings and Logout.
- Organization selector: current organization shown as Qase Test Org.

## Workflow State Machine

Client-provided expected state transitions:

- Simple workflow: translation -> complete
- Single Review workflow: translation -> review_1 -> complete
- Full Review workflow: translation -> review_1 -> review_2 -> complete

Segment status flow:

- untranslated -> draft -> translated -> reviewed_1 -> reviewed_2 -> locked

Role-specific segment permissions:

- Translator can set untranslated, draft, translated.
- Reviewer 1 can set translated or reviewed_1.
- Reviewer 2 can set reviewed_1 or reviewed_2.
- Admin and Project Manager can set any status, including locked.

Gating rules:

- Documents cannot advance until all segments meet the minimum required status for the next stage.
- Admin can force-override workflow status.
- Non-admin force attempts should still run validation.

## Workflow Map

### 1. Account And Organization Onboarding

Positive scenarios:

- Sign up with a new email.
- Verify email when required.
- Sign in after verification.
- Complete mandatory MFA setup with TOTP and enter a 6-digit code.
- Create first organization from the onboarding dashboard.
- Organization name auto-generates a lowercase slug.
- Authenticated user lands in the dashboard with the full sidebar available.
- Forgot password sends reset link by email.
- Lost MFA flow sends MFA reset link, accepts backup code, and requires TOTP re-setup.

Negative and edge scenarios:

- Try creating an organization with blank name.
- Try invalid slug characters.
- Try duplicate organization slug.
- Refresh after organization creation and confirm org context persists.
- Confirm user with no organization sees the onboarding state only.
- Invalid MFA code.
- Expired password reset or MFA reset link.
- Used or invalid backup code.

Automation priority: High.

### 2. Dashboard Overview

Positive scenarios:

- Dashboard displays active projects, total projects, TM count, term base count, total segments, and source words.
- Metric cards navigate to Projects, TM, TB, and Analytics.
- Recent Projects links to the project detail page.
- Recent Activity lists project, translation, review, TM, and TB activity.

Negative and edge scenarios:

- Empty organization dashboard before any project/resource exists.
- Metrics update after project, TM, and TB creation.
- Metrics remain consistent after document stage changes.

Automation priority: High.

### 3. Project Management

Positive scenarios:

- Create a project with name, description, source language, target language, workflow type, and optional deadline.
- View project in project list with owner, languages, workflow, status, and progress.
- Filter project list by All, Active, Completed, and Archived.
- Sort document table by name, type, segments, date, progress, and status.
- Edit project name, description, and workflow in project settings.
- Archive project.
- Restore archived project from archived view, if available.
- Delete project from danger zone with confirmation.

Negative and edge scenarios:

- Required field validation for project name and target language.
- Invalid or same source/target language.
- Very long project names and descriptions.
- Archive/delete permissions for non-admin roles.
- Project list and dashboard counts after archive/delete.

Automation priority: High for create/view/edit. Medium for archive/delete.

### 4. Document Upload And Assignment

Positive scenarios:

- Upload supported file types: TXT, XLIFF, XLF, SDLXLIFF, JSON, HTML, DOCX, PDF.
- Upload modal allows up to five files.
- Upload files up to expected 50MB limit.
- Uploaded document appears with file type, segment count, date, progress, status, and assignments.
- Assignment modal shows workflow roles: Translator and Reviewer 1 for Single Review.
- Admin can assign a user to Translator or Reviewer 1.
- User can claim available Translator assignment.
- Reviewer can claim Reviewer 1 or Reviewer 2 document roles.
- Assignment filters show All documents, Awaiting my action, Assigned to me, Assigned as Translator, Assigned as Reviewer 1, Assigned as Reviewer 2, and Unassigned.

Negative and edge scenarios:

- Upload no file, unsupported file type, empty file, oversized file, duplicate filename, and more than five files.
- Remove pending file before upload.
- Assign without selecting a user.
- Remove assignment and verify role returns to Unassigned.
- Assignment filter behavior for assigned and unassigned documents.
- Translator opening unassigned document should be blocked with "No translator is assigned to this document".
- Translator opening review-stage document should be blocked with "Only the assigned reviewer_1 can edit during this stage".
- Reviewer editing during translation stage should be blocked.
- Non-admin deleting documents should be blocked.

Automation priority: High.

### 5. Translation Editor

Positive scenarios:

- Open uploaded document in editor.
- Select a segment and enter a translation.
- Save Draft keeps segment editable.
- Confirm marks segment translated.
- Copy Source copies source text into target.
- Segment counts and progress update after each confirmed segment.
- Next/previous navigation moves through segments.
- Filters update between All, New, Done, Reviewed, and Next New.
- Right panel shows TM matches, concordance, terms, segment info, comments, QA checks, and activity.
- Translator can use MT, TM match insertion, term insertion, propagation for exact source matches, concordance search, and Ctrl+H Find & Replace.
- Send to Review becomes available after all segments are confirmed.

Negative and edge scenarios:

- Confirm disabled until target text changes.
- Blank target validation.
- Save Draft versus Confirm status behavior.
- Cancel discards unsaved changes.
- Comment add disabled until text is entered.
- Concordance search minimum character behavior.
- Run QA with empty target, copied source, punctuation mismatch, or terminology mismatch.
- Export before translation, during translation, and after review.
- Propagation only fills untranslated or draft segments with exact matching source text.
- Auto-save to TM triggers on confirm or when segment status reaches reviewed_1, reviewed_2, or locked.

Automation priority: Highest.

### 6. Review Workflow

Positive scenarios:

- Send completed translation to Review stage.
- Reviewer opens each segment and approves it.
- Review progress updates to 100%.
- Mark Complete becomes available after all segments are approved.

Negative and edge scenarios:

- Send to Review disabled until all required segments are translated.
- Approve disabled until review stage.
- Reviewer 1 assignment missing but approval still attempted.
- Same user acting as Translator and Reviewer should be validated against expected permissions.
- Mark Complete after all reviews did not visibly move the document out of Review during exploration; this needs confirmation as a possible defect or permission/stage transition issue.
- Reviewer 1 can reject by setting segment back to translated.
- Reviewer 2 can reject by setting segment back to reviewed_1.
- Reviewer cannot edit completed documents.

Automation priority: Highest.

### 7. Translation Memory And Term Base

Positive scenarios:

- Create a Translation Memory with name, source language, and target language.
- Edit Translation Memory metadata.
- Create a Term Base with name, source language, and target language.
- Edit Term Base metadata.
- TM list shows name, language pair, created date, creator, Upload TMX, and Delete TM.
- TB list shows name, language pair, created date, creator, Upload TBX, and Delete Term Base.
- Add, edit, and delete individual TM entries.
- Add, edit, and delete individual terms.
- Attach TM to a project.
- Attach TM as writable to allow confirmed translations to be saved.
- Attach TB to a project.
- Remove attached TM/TB resources from a project.

Negative and edge scenarios:

- Required field validation for name and language fields.
- Duplicate TM/TB names.
- Invalid language codes.
- Upload invalid TMX/TBX file.
- Attach resource with mismatched language pair.
- Attach already-attached resource.
- Delete resource while attached to a project.
- Translator and Reviewer should have read-only access to TM/TB matches and terms.

Automation priority: Medium.

### 8. Analytics And Reporting

Positive scenarios:

- Organization analytics show total projects, active projects, documents, segments, and source words.
- Translation velocity chart displays segment and word progress.
- Project progress chart shows project completion.
- Translation leverage chart shows match distribution.
- Project analytics tab shows documents, segments, source/target words, workflow progress, segment status, quality metrics, timeline, and team productivity.
- Team productivity range controls support 7d, 30d, and All.

Negative and edge scenarios:

- Empty-state analytics before any project data.
- Metrics after translation, review, and resource attachment.
- Metrics after archive/delete.
- Chart rendering in narrow viewport.

Automation priority: Medium.

### 9. Organization Members And Roles

Positive scenarios:

- Members tab lists current member name, email, and role.
- Admin can open Invite Member modal.
- Invite requires email and role.
- Invite roles available: Translator, Reviewer, Project Manager, Admin.
- Invitation text indicates invited users without an account are prompted to create one.
- Admin can add existing registered users directly by email.
- Admin can update member roles, including promotion to Admin.
- Admin can remove members.
- Admin can view, cancel, and resend pending invitations.
- Project Manager can invite non-admin users and manage pending invitations.

Negative and edge scenarios:

- Invalid email.
- Already invited email.
- Existing member email.
- Blank email.
- Role changes after invitation.
- Non-admin access to Members and Invite Member.
- Invited user accepting invite, creating account, and landing in the correct org/role.
- Last admin cannot be removed or leave the organization.
- Project Manager cannot invite or add Admin users.
- Only Admin can invite or add other Admins.

Automation priority: High once test inbox/account strategy is finalized.

### 10. Organization General And Security Settings

Positive scenarios:

- General tab shows organization name, slug, and current user role.
- Security tab shows MFA status.
- MFA enabled state shows remaining backup codes, regenerate backup codes, and disable MFA.

Negative and edge scenarios:

- Non-admin visibility of security controls.
- Regenerate backup codes confirmation and recovery display.
- Disable MFA confirmation.
- Login with MFA and backup code.

Automation priority: Medium for visibility, Low for destructive MFA changes unless a dedicated test account is used.

### 11. Global Search And Account Controls

Positive scenarios:

- Global search accepts queries for project names and updates visible/relevant content.
- Search shortcut indicator is shown as `/`.
- Account menu opens Settings and Logout.
- Logout returns user to unauthenticated state.

Negative and edge scenarios:

- No-result search.
- Search by document, segment source text, translated text, TM name, and term base name.
- Search persistence across navigation.
- Logout then direct navigation to protected URLs redirects to login.

Automation priority: Medium.

## Key Business Journeys To Automate First

1. Sign in and land on dashboard.
2. Complete mandatory MFA setup for a fresh verified account.
3. Create organization for a fresh account.
4. Create project with Single Review workflow.
5. Upload TXT document and verify segment extraction.
6. Assign or claim Translator role.
7. Translate and confirm all document segments.
8. Send document to Review.
9. Approve all segments as Reviewer.
10. Validate project and dashboard progress metrics.
11. Create TM/TB and attach both to project.
12. Invite a role-specific user.
13. Verify role-specific access for Translator, Reviewer, Project Manager, and Admin.
14. Validate negative permission checks for Translator, Reviewer, Project Manager, and last-admin removal.

## Dependencies And Assumptions

- Test emails can be created with aliases such as omoviesmith+N@gmail.com.
- Email verification and invite acceptance may require manual or inbox access unless a test email API is provided.
- MFA-sensitive tests should use a disposable account.
- Resource upload tests require valid TMX and TBX fixtures.
- Role-permission tests require at least four accounts or accepted invites.
- File upload tests need fixtures for TXT, invalid file type, empty file, and oversized file.

## Observations For Follow-Up

- Dashboard initially displayed active project/resource counts as 0 after navigation, then updated to 1 after interacting with search. This should be retested for loading/state consistency.
- The document reached Review with all three segments approved, and Mark Complete became available, but clicking Mark Complete did not visibly change the document out of Review during the exploratory pass.
- Reviewer 1 remained unassigned, yet the current Admin/Translator user could approve segments. Expected role constraints should be confirmed.
- Project resource attachment worked for both TM and TB after resources were created.
- Client-provided flow states registration requires mandatory MFA setup after email verification; this should be added to auth tests even though this account already had MFA enabled during exploration.

## Possible Issues Noticed

- Dashboard metric counts may briefly render stale values after navigation. Active projects, TM, and TB showed 0 before updating to 1 after interaction.
- `Mark Complete` did not visibly complete the reviewed document, even after all segments were approved and the button became available.
- Reviewer-stage permissions need validation: the Admin/Translator user was able to approve segments while Reviewer 1 was still unassigned.
- Translator org role can see Settings, Members, and an Invite Member button in the UI. This may be expected read-only visibility, but invite/remove actions should be checked for server-side blocking.
- The invited account verification link showed `Invalid or expired verification token` after manual verification. This is likely expected once consumed, but the user-facing message may confuse users who revisit the link.
- Chrome DevTools MCP lost the selected page after the invite flow was opened manually, requiring Playwright MCP fallback. This is a tooling/session issue, not necessarily a Termp defect.

## Translator Permission Check Results

Account checked: Movie Translator, omoviesmith+2@gmail.com, org role Translator.

Checked against the client-provided role rules:

- Translator opening the existing review-stage document was allowed at page level, but segment edit controls were not shown after selecting a segment. The UI showed: `No reviewer 1 is assigned to this document. Ask a project manager to assign someone.`
- Expected exact error for review-stage editing is `Only the assigned reviewer_1 can edit during this stage`; that exact message was not observed in the UI during this pass.
- The existing document is assigned to Movie Smith as translator, not unassigned, so the `No translator is assigned` scenario still needs a fresh unassigned document fixture.
- The `simple` workflow translator completion scenario still needs a fresh simple-workflow project/document assigned to this Translator account.
- Auto-save to TM still needs an assigned Translator document with writable TM attached and a confirmed segment action.
- Propagation still needs a document fixture with duplicate source segments in untranslated/draft status.

Additional Translator UI permission concerns observed:

- Translator can see `New Project` on the Projects page, despite the client rule saying Translators cannot create projects.
- Translator can open project Settings and see editable project fields, `Save Changes`, `Archive Project`, and `Delete Project`.
- Translator can see document `Upload`, `Assign`, `Delete document`, and `Manage assignments` controls.
- Translator can see TM management controls: `New TM`, `Upload TMX`, and `Delete TM`.
- Translator can see TB management controls: `New Term Base`, `Upload TBX`, and `Delete Term Base`.
- Translator can see organization Settings > Members, including `Invite Member` and a `Remove` button for the Admin member.

These UI exposures need server-side permission checks before being logged as confirmed security defects. They are still high-priority role-permission test cases because the client file describes Translator access as read-only except for assigned translation work.

## Project Manager Permission Check Results

Account checked: Movie Project Manager, omoviesmith+3@gmail.com, org role Project Manager.

Account setup data:

- Password: TermpTest123!
- MFA secret: U2BQCYYL3CVV2QCDF5OGXYW277GYMHRG
- Backup codes: 6D9F-5C23, BA5F-B062, 609C-07CF, 6637-8034, BC21-179E, B0CB-32E2, 0A45-8EBC, 0E4B-1218, F970-45FC, 1654-9EF3

Checked against the client-provided role rules:

- PM role was confirmed in Settings as `Project Manager`.
- PM can create projects. Created disposable project: `PM Permission Test Project`.
- PM trying to invite another Admin was blocked with the visible message: `Only admins can invite other admins`.
- PM trying to delete the disposable project was blocked with `API Error: 403`. This matches the expected permission outcome, but the UI did not show the exact expected message `Only admins can delete projects`.
- PM can view and edit project details for the PM-created project, including name, description, and workflow type.
- PM can see Archive Project and Delete Project controls. Delete is server-blocked; archive still needs explicit validation.

PM scenarios still needing dedicated fixtures:

- PM document delete should be tested on a disposable uploaded document; expected result is admin-only block.
- Non-admin force-advance workflow should be tested against a document with incomplete segment status; expected result is that validation still runs and force is ignored.
- PM add/remove project members should be tested on a disposable project.
- PM attach/detach TM and TB resources should be tested on a disposable project.

Additional PM UI permission concerns observed:

- PM can see organization member `Remove` buttons, including for Admin and Translator members. This should be tested for server-side blocking before being logged as a confirmed defect.
- PM sees full Settings navigation, including Members, General, and Security tabs. Expected visibility should be confirmed against product requirements.
