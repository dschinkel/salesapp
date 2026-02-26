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

## F3.x Records a Conversation
- [ ] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD
- [ ] F3.x Provides a section to record voice to text

## I1 Code Formatting  
- [x] Re-read GUIDELINES.MD AND PROJECT_SPEC.MD  
- [x] I1.0.0 Use prettier for code formatting  
- [x] I1.0.1 Add eslint for code linting  
