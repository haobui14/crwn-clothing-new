import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBnoTb8XeoH9radfvA9EGfQDlOdNoxMPRo',
  authDomain: 'crwn-clothing-hao.firebaseapp.com',
  projectId: 'crwn-clothing-hao',
  storageBucket: 'crwn-clothing-hao.appspot.com',
  messagingSenderId: '1023860545932',
  appId: '1:1023860545932:web:30533e54c474dd0fe85ea9',
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      console.log('error creating user: ', error.message);
    }
  }
  return userDocRef;
};
