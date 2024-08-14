# Comments-App
## About the app
built this using react-native!

The Comments App is designed to manage and interact with user comments and replies efficiently. Key features include:

- Validation: Ensures that both name and comment text are entered before submission.
- Timestamping: Saves each comment or reply with the current date and time.
- Sorting: Allows sorting of comments and replies by date and time.
- Editing: Enables users to edit only the comment text, not the name.
- Deleting: Features a delete button positioned on the border of each comment or reply.
- Persistence: Uses web storage to persist data, ensuring it is not lost on page refresh.
- State Management: Implements Redux for state management.

## Installation Instructions
Follow these steps to set up and run the project locally :

1.  Clone the repository:
```bash
git clone https://github.com/sanjanaynvsdl/HealthFlex-Assignment.git
```
```bash
cd comments-app
```
2. Install dependencies
 ```bash
npm install
```
or if you're using Yarn:
 ```bash
yarn install
```
3. Install React Native CLI globally (if not already installed):
 ```bash
npm install -g react-native-cli
```
4. Start the Metro bundler:
```bash
npx react-native start
```
5. Run the app:
```bash
npx react-native run-android
```
## Requirements

- Node.js (version 12 or higher)
- npm or Yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
