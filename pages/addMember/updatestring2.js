import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

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
const db = getFirestore(app);

const updateJsonFile = async () => {
  const Strings2Path = path.resolve(__dirname, 'E:/ciie-web-app/public/values/strings2.tsx');

  try {
    const snapshot = await getDocs(collection(db, 'core-members'));
    const coreMembersData = snapshot.docs.map(doc => doc.data());

    // Generate the updated JSON content
    const updatedJson = {
      ...Strings2,
      First_Year: coreMembersData.filter(member => member.year === 'First_Year'),
      Second_Year: coreMembersData.filter(member => member.year === 'Second_Year'),
      Third_Year: coreMembersData.filter(member => member.year === 'Third_Year'),
    };

    // Write the updated JSON content to the file
    fs.writeFileSync(Strings2Path, JSON.stringify(updatedJson, null, 2));
    console.log('Strings2.json updated successfully!');
  } catch (error) {
    console.error('Error updating Strings2.json:', error);
  }
};

updateJsonFile();
