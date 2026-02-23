# Tasks  
  
At the start of any task workflow output exactly:  
ACK: TASKS_READ  
  
## F.0.1 Walking Skeleton [COMPLETED]  
- [x] F.0.1 Hello World is runnable on iOS emulator (locally)  
  
## F.1.2.0 Push to Expo [COMPLETED]  
- [x] **F.1.2.0** Setup EAS for cloud builds and TestFlight submission  
  - Initialized React Native boilerplate.  
  - Configured `app.json` with Expo metadata.  
  - Installed `eas-cli`, `expo`, and `expo-dev-client`.  
  - Created `eas.json` with `development`, `preview`, and `production` profiles.  
  
## F.1.3 Formatted report with Answers [COMPLETED]  
- [x] **F.1.3** Run on iOS Simulator with Development Client  
- [x] **F.1.3.0** Topic Answers  
- [x] **F.1.3.1** What is their objective Answers  
- [x] **F.1.3.2** Timeline Answers  
- [x] **F.1.3.3** Decision makers Answers  
  - Successfully aligned dependencies with `npx expo install --fix` (React 19, RN 0.81.5 for Expo SDK 54).  
  - Regenerated the `ios` directory with `npx expo prebuild`.  
  - Verified `pod install` succeeds with the new `ReactAppDependencyProvider` podspec.  
  
### F.1.0 Provide this list of questions for a sales person to answer [COMPLETED]  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] **F.1.0.0** Company Name  
- [x] **F.1.0.1** What was Topic of your conversation with the customer  
- [x] **F.1.0.2** What is the customer's objectives  
- [x] **F.1.0.3** What is the Timeline for the project  
- [x] **F.1.0.4** Who are the Decision makers for the project  
- [x] **F.1.0.5** Estimated Deal Size  
- [x] **F.1.0.6** Decision Makers’ Goals, Likes, and Interests?  
- [x] **F.1.0.7** Concerns  
- [x] **F.1.0.8** Competition  
- [x] **F.1.0.9** Budget  
- [x] **F.1.0.10** Marketing Support Expectations  
- [x] **F.1.0.11** Confidence Level  
- [x] **F.1.0.12** Strategy  
- [x] **F.1.0.13** What Does Success Look Like for Them?  
- [x] **F.1.0.14** Procurement, Legal, Security? Gating step?  
- [x] **F.1.0.15** Risk to Forecast Date?  
  
### F.1.1 Answer those questions [COMPLETED]  
- [x] **F.1.1.0** Highlight questions answered in green  
  
### F.1.2 List questions not answered yet [COMPLETED]  
- [x] **F.1.2** List questions not answered yet  
- [x] **F.1.2.0** Highlight questions not answered in red  
  
### F.10 Build and Deploy script [COMPLETED]  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] Created `deploy.sh` to automate build, install, and launch.  
- [x] Integrated with `yarn deploy` in `package.json`.  
- [ ] **F.2.0** Prompt the sales person to fill out set question  
- [ ] **F.2.3** Formatted report with Answers  
- [ ] **F.1.2.1** Run `eas login` and `eas init` (requires user intervention)  
- [ ] **F.1.2.2** Run `eas build -p ios --profile development` to generate iOS binary for real device  
- [ ] **F.1.2.3** Run `eas build -p ios --profile production` to generate iOS binary for App Store  
- [ ] **F.1.2.4** Run `eas submit -p ios --latest` to push to TestFlight  
- [ ] **F.1.3** Run on iOS Simulator with Development Client  
  - [x] Align dependencies and fix native `ios` folder using prebuild.  
  - [ ] Run `npx expo run:ios` once to build and install the native app on the simulator.  
  
### F.11 Add prettier js to the project [COMPLETED]  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] **F.11.0** Use `eslint-config-prettier` to avoid conflicts between ESLint and Prettier.  
  
### F.12 Update guidelines for task management [COMPLETED]  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] F.12.0 Update GUIDELINES.md with rules for header alignment, completion tagging, auto-feature creation, and fix logging.  
  
  
### F.13 Add missing linting libraries [COMPLETED]  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] F.13.0 Add `eslint-plugin-sonarjs` to support cognitive complexity rules.  
- [x] F.13.1 Verify `eslint-plugin-react-hooks` and `eslint-plugin-import` are present.  
  
## Fix: PR.1.2 [COMPLETED]  
  
### Fix for compile error, Development Build mismatch, and ReactAppDependencyProvider missing  
  
The Fix:  
  
- [x] Align `bundleIdentifier` in `app.json` with the native project (`org.reactjs.native.example.salesrecorder`).  
- [x] Change `babel.config.js` to use `babel-preset-expo`.  
- [x] Import `expo-dev-client` in `index.js`.  
- [x] Fix `ReactAppDependencyProvider` error by upgrading dependencies (`npx expo install --fix`) to match Expo SDK 54 (RN 0.81.5).  
- [x] Use `npx expo prebuild` to generate a fresh, compatible `ios` directory.  
- [x] Verified `pod install` completion.  
