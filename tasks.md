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

## PR.3.9.2 Refinement

### Refine Light Mode Theme

The Fix:

- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [x] Refine `VoiceRecorder.tsx` light mode colors for better readability
- [x] Refine `Questionnaire.tsx` light mode colors for better visual hierarchy
- [x] Refine `UploadQuestions.tsx` light mode colors to match the refined theme
- [x] Verify fix by running build and lint
