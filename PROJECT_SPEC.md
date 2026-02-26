# PROJECT SPEC

At the start of any workflow output exactly:  
ACK: PROJECT_SPEC_READ

Project: `Sales Record`
Purpose: A Sales Assistant / Report gatherer that allows sales people record sales  
conversations or sales calls. After the salesperson has left a customer, this will prompt them to summarize  
the conversation they had with the customer through voice to text transcription. The final result is that it outputs  
the transcript for review.

Purpose of `PROJECT_SPEC.md`: 

This document is the **source of truth**, a higher level list of features to be worked on by the agent(s).
These features are then split out into smaller tasks to be worked on by the agent.

All implementation work must follow `GUIDELINES.md` which is located at the root of the project.
At the start of every task and before proceeding to the next step in the PLAN, re-load PROJECT_SPEC.md and GUIDELINES.md from disk, state what the next step is, and ask the User for permission to proceed.

👇All behavior mentioned below are to be incrementally implemented will be broken down into smaller tasks defined in `tasks.md` and worked on one at a time.

Legend:
`I.x` - Infrastructure Reqirements
`F.x` - Feature Requirements

# Brainstorming

## F.0 Walking Skeleton
- [x] F.0.0 Hello World is runnable
- [x] F.0.1 If the repo has not been initialized and pushed to github, push it to the remote using the github CLI
- [x] F.0.2 Deploy the app to ECS (Elastic Container Registry) via Github Actions
- [x] F.0.3 Show an app version number at the bottom of the page  
- [x] F.0.4 Deploy app to Google Cloud Run. Convert current deploy.yml to push app containers to google cloud run instead  

## 3. Feature Requirements

### F3.1 Shows a list of questions to be answered
list of questions of questions:
- F.1.0.0 Company Name 
- F.1.0.1 Topic
- F.1.0.2 Customer's Objectives  
- F.1.0.3 Timeline 
- F.1.0.4 Decision Makers
- F.1.0.5 Estimated Deal Size  
- F.1.0.6 Competition  
- F.1.0.7 Budget
- F.1.0.8 Strategy

### F3.2 Ability to upload a list of questions
- [x] F3.2.0 Add new questions by uploading a CSV file question list
- [x] F3.2.1 Should only append uploaded questions not overwrite previous question
- [x] F3.2.2 Add a header to the questions lists called "Key Points"

### F3.3 Ability reorder questions
- [x] F3.3.0 Reorder questions by dragging and dropping

### F3.4 Add Key Points Description
- [x] F3.4.0 Add a description below the Key Points header with text "Add key points or topics that should be mentioned during the call. They'll be automatically checked off when detected in the transcript."

### F3.5 Apply Cambria Color Scheme to the list of questions
- [x] F3.5.0 Using this set of Hex colors, apply the Cambria color scheme to the app:
  - gold gradients (#C5A55A → #9E833A) for buttons and accents
  - black backgrounds (#000000 → #0a0a0a gradient with #111111/#161616 panels)
  - cream text (#F5F0E8) for primary content
  - warm muted tones (#D9D0C0, #A09080, #7A6F60, #5A5040)
  - for secondary text, dark borders (#2a2a2a, #222222) for dividers
  - red (#D4443B)
  - ensure that is applied to our shadcn theme
  - use the context image as a reference to see how the colors should look

### F3.6 Create a dark mode theme
In F3.5 you created a light mode theme. We want to be able to toggle to a dark mode theme whereas the questions list is themed and looks like the attached screenshot.
- [x] F3.6.0 Create a dark mode theme that matches the screenshot. Provide a toggle to switch back to light mode
- [x] F3.6.1 Ensure that the background behind title, the title text, and description text have the same colors as the screenshot provided


### F3.x Records a Conversation
- [] F3.x Provides a section to record voice to text. Text that is transcribed shows below voice recorder

### F3.x Parses pre sales questions pasted in by sales into the question list


# Code Requirements (non business specific behavior / infrastructure)
### I1 Code Formatting
- [x] I1.0.0 Use prettier for code formatting
- [x] I1.0.1 Add eslint for code linting.  Do not add any rules. Just a placeholder for rules

NOTES
later down the road
- Use Gemini parsing of blob text

