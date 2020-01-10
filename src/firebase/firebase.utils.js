import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyACmkw7X6NhavvmJ0rZVvyH8ZdlluEbf2Q",
    authDomain: "ecommercereact-b9094.firebaseapp.com",
    databaseURL: "https://ecommercereact-b9094.firebaseio.com",
    projectId: "ecommercereact-b9094",
    storageBucket: "ecommercereact-b9094.appspot.com",
    messagingSenderId: "535301259328",
    appId: "1:535301259328:web:ecd4550afe3271e0b81fa5",
    measurementId: "G-Z5ZGQ5FDWS"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ promt:"select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;