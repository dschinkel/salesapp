# Tasks  

At the start of any task workflow output exactly:  
ACK: TASKS_READ  

Purpose of `tasks.md`:
- To break down the larger features found in `PROJECT_SPEC.md` into smaller tasks that we can iterate on
- To track tasks completed  
- To track tasks in progress

## F.0 Walking Skeleton  
- [x] F.0.0 Hello World is runnable  
- [x] F.0.1 If the repo has not been initialized and pushed to github, push it to the remote using the github CLI  

## F.0.4 Deploy app to Google Cloud Run. Convert current deploy.yml  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] Convert current deploy.yml to push app containers to google cloud run instead  


## F.0.3 Show an app version number at the bottom of the page  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] Build-time version injection via vite.config.ts  
- [x] React implementation of AppVersion component  
- [x] UI placement in the application footer  
- [x] Debug traceability with git short SHA  
- [x] Architecture constraints  
- [x] Use a black shadcn footer in App.tsx
- [x] Add a shadcn badge to show the version and make the version text color #C5A55A  
- [x] Make the badge larger and more subtle  
- [x] Make the app version text bigger and nicer  
- [x] Replace version badge with a shadcn label  


## F3.1 Shows a list of questions to be answered  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] F.1.0.0 Company Name  
- [x] F.1.0.1 Topic  
- [x] F.1.0.2 Customer's Objectives  
- [x] F.1.0.3 Timeline  
- [x] F.1.0.4 Decision Makers  
- [x] F.1.0.5 Estimated Deal Size  
- [x] F.1.0.6 Competition  
- [x] F.1.0.7 Budget  
- [x] F.1.0.8 Strategy  


## F3.2 Ability to upload a list of questions  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] F3.2.0 Upload a CSV file of questions  

## F3.2.1 Should only append uploaded questions not overwrite previous question  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] F3.2.1 appends new questions  

## F3.2.2 Add a header to the questions lists called "Key Points"  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] F3.2.2 Add "Key Points" header to QuestionList component  

## F3.3 Ability reorder questions
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] F3.3.0 Reorder questions by dragging and dropping

## F3.4 Add Key Points Description  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] F3.4.0 Add a description below the Key Points header  

## F3.5 Apply Cambria Color Scheme to the list of questions
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] F3.5.0 Using this set of Hex colors, apply the Cambria color scheme to the app:
  - [x] gold gradients (#C5A55A → #9E833A) for buttons and accents
  - [x] black backgrounds (#000000 → #0a0a0a gradient with #111111/#161616 panels)
  - [x] cream text (#F5F0E8) for primary content
  - [x] warm muted tones (#D9D0C0, #A09080, #7A6F60, #5A5040)
  - [x] for secondary text, dark borders (#2a2a2a, #222222) for dividers
  - [x] red (#D4443B)
  - [x] ensure that is applied to our shadcn theme
  - [x] use the context image as a reference to see how the colors should look
  - [x] double check that the list is using shadcn components where possible

## F3.6 Create a dark mode theme
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] F3.6.0 Create a dark mode theme that matches the screenshot. Provide a toggle to switch back to light mode
- [x] F3.6.1 Apply colors from the screenshot

## F3.7 Records a Conversation  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] F3.7.0 Provides a section to record voice to text  
- [x] Add concurrently to run Vite and Koa together  
- [x] Fix Server 500 Error on transcription endpoint  
- [x] Implement real-time transcription while recording  

## I1 Code Formatting  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] I1.0.0 Use prettier for code formatting  
- [x] I1.0.1 Add eslint for code linting  


## I2 Versioning  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] I2.0.0 Automated semantic versioning in package.json on push to main  
- [x] Ensure version consistency in package.json, build, and dockerfile  
- [x] Update AppVersion component to show the new version format  


## I3 Model Upgrade
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] I3.0.0 Upgrade Gemini model to `gemini-2.5-flash`  


## PR.3.8 Fix  

### Real-time transcription not working in Chrome  

The Fix:  

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] Investigate why Web Speech API transcription is only showing after stop in Chrome  
- [x] Fix real-time updates in `useVoiceRecorder.ts` and resolve microphone conflict errors  
- [x] Update test mocks to support `getUserMedia` stream tracks  
- [x] Verify real-time updates with tests/logs  

## PR.3.8.1 Fix  

### Speech recognition error in browser mode  

The Fix:  

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] Add error handling to `useVoiceRecorder.ts` to set `isRecording` to false on error  
- [x] Refactor tests to use fakes instead of `jest.fn()` and verify error handling  
- [x] Investigate and resolve root cause of frequent speech recognition errors  

## PR.3.8.2 Fix  

### Network error in speech recognition browser mode  

The Fix:  

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] Implement exponential backoff for network-related speech recognition errors in `useVoiceRecorder.ts`  
- [x] Ensure that persistent network errors eventually stop the recording or notify the user  
- [x] Verify with tests  

## PR.3.8.3 Fix  

### GitHub Action push failure during version bump  

The Fix:  

- [x] Add concurrency group to `.github/workflows/deploy.yml` to prevent race conditions  
- [x] Add `git pull --rebase` to the version bump step in CI  
- [x] Consolidate local remotes to simplify Git workflow  


## PR.3.8.4 Fix  

### Recording Counter is not incremented  

The Fix:  

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] Implement `recordingDuration` state and timer logic in `useVoiceRecorder.ts`  
- [x] Update `VoiceRecorder.tsx` to display formatted recording duration  
- [x] Verify fix by running build and tests  

## F3.9.0 Feature

### Improve Light Mode

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Modify `App.tsx` to preserve `bg-cambria-bg` in both light and dark modes, only toggling the `dark` class
- [x] Update `Questionnaire.tsx` to use `bg-cambria-cream` and `text-cambria-black` (flipped theme) for light mode
- [x] Update `VoiceRecorder.tsx` to use `bg-cambria-cream` and appropriate header colors for light mode
- [x] Update `UploadQuestions.tsx` to use `bg-cambria-cream` for its card background in light mode
- [x] Verify fix by running build and lint

## PR.3.9.1 Fix

### Light mode looks exactly like the black theme

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Add `darkMode: 'class'` to `tailwind.config.js` to enable manual theme toggling via class
- [x] Update `App.tsx` to toggle page background and text color in light mode for better visibility
- [x] Theme the application footer in `App.tsx` to align with the chosen mode
- [x] Verify fix by running build and lint


## PR.3.10.3 Fix

### Gemini call failing (Quota exceeded)

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Implement 429 error handling in `TranscriptionController.ts`
- [x] Propagate error messages through `fetchHttpClient.ts`
- [x] Add error state to `useVoiceRecorder.ts` to capture transcription failures
- [x] Update `VoiceRecorder.tsx` to display transcription errors to the user
- [x] Verify fix with backend and frontend tests


## PR.3.10.4 Fix

### Browser transcript analysis calls Gemini multiple times while recording

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Update `useVoiceRecorder.ts` to avoid invoking transcript analysis callbacks during live browser recognition results
- [x] Trigger transcript analysis callback once after recording stops with the final transcript
- [x] Update `useVoiceRecorder.test.ts` to verify a single final callback in browser mode
- [x] Verify with hook tests and build


## PR.3.10.5 Fix

### Transcript analysis returns generic "Analysis failed"

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Improve `GeminiClient.ts` transcript analysis parsing to support fenced JSON and object payloads
- [x] Return detailed backend analysis errors from `TranscriptAnalysisController.ts` instead of generic message
- [x] Return 429 with quota message for analysis requests when Gemini quota is exceeded
- [x] Add/Update backend tests for resilient parsing and error propagation
- [x] Verify with tests and build


## PR.3.10.6 Fix

### Migrate Gemini SDK to current @google/genai package

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Replace deprecated `@google/generative-ai` with `@google/genai`
- [x] Update Gemini client calls to `models.generateContent` with current config shape
- [x] Run `yarn install` immediately after dependency change
- [x] Update Gemini client tests for the new SDK shape
- [x] Verify with tests and build


## PR.3.10.7 Fix

### Remove Gemini API key fallbacks and bubble configuration errors

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Remove `fake-key` fallback from `GeminiClient.ts`
- [x] Remove no-key transcript/analysis fallback behavior in `GeminiClient.ts`
- [x] Fail fast when `GEMINI_API_KEY` is missing and no test double is injected
- [x] Update integration test gating for explicit real-service runs
- [x] Verify with tests and build


## PR.3.10.8 Refactor

### Remove Jest Mocks. We just need simple TS Stubs, Fakes, or Dummies.

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Fix the `successfully transcribes` test behavior for no-key environments
- [x] Add new rule to GUIDELINES.md: For refactors that replace jest mocks with TS stubs, use commit message pattern: `refactor <filename>: remove jest mocks, use simple TS stubs or fakes`


## PR.3.10.9 Fix

### GitHub Actions version bump fails when git tag already exists

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Update deploy workflow to fetch tags before bumping version
- [x] Replace `npm version patch` auto-tag behavior with explicit next-available patch version selection
- [x] Create commit/tag manually with the selected version and push with follow-tags


## Add new rule to GUIDELINES.md: Prefer plain domain names over capture-tracking prefixes

### Remove unnecessary technical capture naming in repository tests

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Refactor transcript analysis repository test naming from capture prefixes to simple domain names
- [x] Add guideline rule to avoid capture-tracking prefixes when plain domain names are sufficient


## PR.3.10.10 Refactor

### Convert class-based test doubles to function-based TypeScript constructs

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Refactor `useVoiceRecorder.test.ts` to replace class-based recorder and speech recognition doubles
- [x] Keep behavior identical for callback wiring, restart behavior, and lifecycle hooks
- [x] Verify with targeted hook tests and lint


## Add new rule to GUIDELINES.md: Test helper functions must be below the last describe

### Refactor helper function placement in tests

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Add helper-placement rule to GUIDELINES
- [x] Move test helper functions in `useVoiceRecorder.test.ts` to below the last describe block
- [x] Verify with targeted tests and lint


## PR.3.10.11 Refactor

### Remove capture-tracking prefixes from test variable names

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Rename `captured*` variables to simple domain names in service and client tests
- [x] Preserve test behavior with variable rename-only refactors
- [x] Verify with targeted tests


## Add new rule to GUIDELINES.md: Forbid the word value in construct names

### Refactor value-based identifier names in code and tests

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Add naming rule that forbids `value` in construct names
- [x] Rename `*Value` and `value` identifiers to direct domain names in modified code and tests
- [x] Verify with targeted tests and lint


## Add new rule to GUIDELINES.md: Group related component files into granular domain folders

### Reorganize Questionnaire files into component-level and concern-level folders

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Add component-folder organization rule with granular concern subfolders in GUIDELINES
- [x] Move `csvParser.ts` and `csvParser.test.ts` into `src/components/Questionnaire/CSVParser/`
- [x] Move `useQuestions.ts` and `useQuestions.test.ts` into `src/components/Questionnaire/Questions/`
- [x] Update imports and verify with targeted component tests


## Add new rule to GUIDELINES.md: Group related client and service files into domain folders

### Reorganize client and server code by shared domain terms

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Add client/service domain-folder grouping rule to GUIDELINES
- [x] Group client repository implementation and tests into `Transcription` and `TranscriptAnalysis` folders
- [x] Group service command/controller/repository implementation and tests into `Transcription` and `TranscriptAnalysis` folders
- [x] Update imports and verify with full test run


## Add new rule to GUIDELINES.md: Run lint auto-fix and lint verification after every task

### Enforce mandatory linting completion workflow

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Add rule requiring `eslint --fix` followed by `eslint` verification after every task
- [x] Align alias config so lint/type-check/build resolve current module paths consistently
- [x] Run lint auto-fix and lint verification
- [x] Verify with build and tests


## Add new rule to GUIDELINES.md: Run lint auto-fix and lint verification after every RED GREEN REFACTOR step in TDD

### Enforce linting checks during each TDD cycle step

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Add rule requiring lint auto-fix and lint verification after RED, GREEN, and REFACTOR when TDD is chosen
- [x] Keep existing task-level linting rule and add TDD-step-level enforcement
