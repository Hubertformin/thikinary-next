import firebase from 'firebase';
import {BookStoreItem} from "../models/book-store-item";
import {ArticleModel} from "../models/articles";
import {UserModel} from "../models/user-model";

const firebaseConfig = {
    apiKey: "AIzaSyCwQl0cfr_i5LXv5z2xmW6Jv-biB6iRjIA",
    authDomain: "thinkabox-4dc7b.firebaseapp.com",
    databaseURL: "https://thinkabox-4dc7b.firebaseio.com",
    projectId: "thinkabox-4dc7b",
    storageBucket: "thinkabox-4dc7b.appspot.com",
    messagingSenderId: "570611550280",
    appId: "1:570611550280:web:2f45188a0f4fe1a054f07d",
    measurementId: "G-L68EE8RYD7"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;

export const fireAuth = fire.auth();

export const articlesCollection: firebase.firestore.CollectionReference<ArticleModel> = fire.firestore().collection('articles');

export const booksCollection: firebase.firestore.CollectionReference<BookStoreItem> = fire.firestore().collection('books');

export const usersCollection: firebase.firestore.CollectionReference<UserModel> = fire.firestore().collection('users');