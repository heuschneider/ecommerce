import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA9zg8aD3hvoId_dugGh1HrMhdCQNLFVd0",
    authDomain: "crwn-db-13b7a.firebaseapp.com",
    databaseURL: "https://crwn-db-13b7a.firebaseio.com",
    projectId: "crwn-db-13b7a",
    storageBucket: "crwn-db-13b7a.appspot.com",
    messagingSenderId: "505490173694",
    appId: "1:505490173694:web:cb034bf33eca3bd1813faf"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
