# ChatterBox

ChatterBox is a mobile chat application built using React Native and Expo. The app allows users to communicate with friends through messages, share images, and send their location. With support for offline use and a user-friendly interface, ChatterBox is an ideal app for staying connected.

## Features

- **User Authentication:** Anonymous user authentication with Firebase.
- **Messaging:** Real-time messaging through Firestore, with offline support using AsyncStorage.
- **Image Sharing:** Users can send images either by selecting from the gallery or taking a photo with the camera.
- **Location Sharing:** Users can share their current location.
- **Offline Support:** Messages are stored locally. New messages cannot be created while offline.

## Technologies

- **React Native:** Framework for building native mobile apps.
- **Expo:** Development environment for React Native apps.
- **Firebase Authentication:** For anonymous user authentication.
- **Firestore:** NoSQL database for storing messages in real-time.
- **Firebase Cloud Storage:** For storing images sent by users.
- **Gifted Chat:** Library for building chat UI components.

## Installation

### Prerequisites

Before setting up  the project, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Emulator](https://developer.android.com/studio) (Mobile device simulator)
- [Xcode](https://developer.apple.com/xcode/) (For iOS development - macOS only)
- [Firebase](https://console.firebase.google.com) project set up with Firestore and Firebase Storage

### Setting up Firebase

To enable Firebase features like real-time messaging and authentication, follow these steps:

1. **Create a Firebase Project:** Go to the Firebase Console and click Add Project. Follow the instructions to create a new project.

2. **Set up Firebase Authentication:** In the Firebase Console, go to Authentication > Sign-in method. Enable the Anonymous sign-in provider.

3. **Set up Firestore Database:** Go to Firestore Database in the Firebase Console. Click Create Database and choose Start in production mode. Firestore will be used to store chat messages in real-time. In Firestore Database enable read and write queries in the rules, like so:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. **Enable Firebase Storage (for Image Upload):** Navigate to Storage in the Firebase Console and click Get Started. Set up Firebase Storage for uploading images that users send.

5. **Add Firebase Config to Your Project:** In the Firebase Console, go to Project Settings. Scroll down to Your Apps and click Add App. Select Web as the platform. Copy the Firebase configuration object from the console. Initialize Firebase in App.js: 
``` 
//initialize Firebase and Cloud Firestore
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
```
### Install Project locally

1. Clone the repository:
  ```bash
  git clone https://github.com/lenachat/chatterBox
  ```

2. Navigate to the project directory:
  ```bash
  cd chatterBox
  ```

3. Install the dependencies:
  ```bash
  npm install
  ```

4. Start the Expo development server:
  ```bash
  npx expo start
  ```

## Usage

1. Open the app an enter your name.
2. Choose a background color for your chat screen.
4. Start chatting by sending text messages, images, or location data.
5. Your conversations will be stored and available both online and offline. 

## Key User Stories

- Users can enter a chat room with ease and start conversations with their friends.
- Send and receive text messages, images, and locations within the chat.
- Access chat history even when offline.

## Project Structure

```plaintext
/chatterBox
  ├── /assets                 # App assets like images, icons, and fonts
  ├── /components             # Reusable UI components
  |     ├── Start.js          # Start screen component where users enter their name and select background color
  |     ├── Chat.js           # Chat screen component displaying messages and handling message input
  |     └── CustomActions.js  # Custom actions component for sending images, location, etc.
  ├── App.js                  # Root component that initializes navigation and context providers
  ├── package.json            # Project metadata and dependencies
  └── README.md               # Project documentation
