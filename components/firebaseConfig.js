import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
 import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCsp3d3o2ou7aTx1WqxKABiAPeskDsoI64",
  authDomain: "ciie-web-app-cbe0b.firebaseapp.com",
  databaseURL: "https://ciie-web-app-cbe0b-default-rtdb.firebaseio.com",
  projectId: "ciie-web-app-cbe0b",
  storageBucket: "ciie-web-app-cbe0b.appspot.com",
  messagingSenderId: "106677054157",
  appId: "1:106677054157:web:5807a7ecee2c34bad31784"
};
 
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
