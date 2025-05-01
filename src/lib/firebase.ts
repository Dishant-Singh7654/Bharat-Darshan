// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, updateProfile } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from "firebase/firestore";
import { useState, useEffect } from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZf00iePjPxMe8tUQxZvkkz_7FRXH59k8",
  authDomain: "major-project-df13f.firebaseapp.com",
  projectId: "major-project-df13f",
  storageBucket: "major-project-df13f.appspot.com",
  messagingSenderId: "592095606102",
  appId: "1:592095606102:web:ceb4bf17087d5af69752f7",
  measurementId: "G-T9CJDCFWSM"
};

// Initialize Firebase
console.log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

// Use emulator in development environment to bypass security rules
// Uncomment this for local development if you have Firestore emulator running
// if (window.location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "localhost", 8080);
//   console.log("Using Firestore emulator");
// }

// Temporarily disable persistence to troubleshoot permissions errors
// We'll enable it back once permissions are fixed
// try {
//   enableIndexedDbPersistence(db)
//     .then(() => {
//       console.log("Firebase offline persistence enabled");
//     })
//     .catch((err) => {
//       console.error("Error enabling offline persistence:", err);
//       if (err.code === 'failed-precondition') {
//         console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
//       } else if (err.code === 'unimplemented') {
//         console.warn('The current browser does not support all of the features required to enable persistence');
//       }
//     });
// } catch (error) {
//   console.error("Error setting up offline persistence:", error);
// }

// Authentication functions
export const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update profile to add display name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};

// Custom hook to use auth
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed, user:", user ? `${user.email} (${user.uid})` : "null");
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { currentUser, loading };
};

export { auth }; 