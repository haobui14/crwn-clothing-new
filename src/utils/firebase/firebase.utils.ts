import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { Category } from "../../store/categories/categories.types";

const firebaseConfig = {
  apiKey: "AIzaSyBnoTb8XeoH9radfvA9EGfQDlOdNoxMPRo",
  authDomain: "crwn-clothing-hao.firebaseapp.com",
  projectId: "crwn-clothing-hao",
  storageBucket: "crwn-clothing-hao.appspot.com",
  messagingSenderId: "1023860545932",
  appId: "1:1023860545932:web:30533e54c474dd0fe85ea9",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const storage = getStorage();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as Category);
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export const sendPasswordReset = async (email: string) => {
  if (!email) return;

  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.log("Error sending password reset email:", error);
    throw error;
  }
};

export const updateUserProfile = async (user: User, displayName: string) => {
  try {
    await updateProfile(user, { displayName });

    // Also update the user document in Firestore
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(
      userDocRef,
      {
        displayName,
        email: user.email,
        createdAt: new Date(),
      },
      { merge: true }
    );

    return { success: true };
  } catch (error) {
    console.log("Error updating user profile:", error);
    throw error;
  }
};

export const updateUserPassword = async (user: User, newPassword: string) => {
  try {
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error) {
    console.log("Error updating password:", error);
    throw error;
  }
};
