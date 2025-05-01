# Firebase Setup Guide for User Places

This guide will help you set up your Firebase Firestore database for storing user visited and wishlist places.

## 1. Firestore Rules

For security, you'll need to set up Firestore rules to ensure that users can only access their own data. Navigate to your Firebase console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Replace the rules with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write only their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Optional: Allow admin access
      // allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

6. Click **Publish**

These rules ensure that:
- Users can only read and write to their own document in the `users` collection
- Each user document is identified by their Firebase Auth UID
- No other collections are accessible to users

## 2. Data Structure

The data in Firestore will be structured as follows:

```
users/
  ├── {userId}/
  │     └── places/
  │           ├── visited: []  // Array of visited places
  │           └── wishlist: [] // Array of wishlist places
  └── {anotherUserId}/
        └── ...
```

## 3. Required Firebase Configuration

Make sure your Firebase config in the project includes Firestore. Your firebase.js file should look something like:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
```

## 4. Enabling Firestore

If you haven't already created a Firestore database:

1. Go to **Firestore Database** in the Firebase Console
2. Click **Create Database**
3. Choose your starting mode (Start in production mode is recommended)
4. Choose a location that's close to your target audience
5. Click **Enable**

## 5. Troubleshooting

### Common Issues:

1. **Permission Denied Errors**: Double-check that your security rules are correctly set and that users are properly authenticated.

2. **Missing Data**: If data isn't being saved or retrieved, check the console for errors and verify the document paths match your implementation.

3. **Array Operations**: Firebase has specific limitations when working with arrays. Be careful with array updates as they can lead to unexpected results. The implementation in this project uses arrayUnion and arrayRemove to safely modify arrays.

### Testing Tips:

- Use the Firebase Console to manually check if data is being properly written to Firestore.
- You can temporarily relax the security rules during development, but make sure to tighten them before going to production:

```
// Development-only rules - DO NOT USE IN PRODUCTION
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 6. Backup Plan

If you encounter issues with Firestore, the system can fall back to local storage. To enable this, modify the `UserPlacesContext.tsx` file to include a fallback mechanism that saves to localStorage if Firestore operations fail. 