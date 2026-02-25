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

# Brainstorming

## F.0 Walking Skeleton
- [x] F.0.0 Hello World is runnable
- [x] F.0.1 If the repo has not been initialized and pushed to github, push it to the remote using the github CLI
- [x] F.0.2 Deploy the app to ECS (Elastic Container Registry) via Github Actions
- [x] F.0.3 Show an app version number at the bottom of the page
- [x] F.0.4 Deploy app to Google Cloud Run

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

NOTES

later down the road
- Use Gemini parsing of blob text

