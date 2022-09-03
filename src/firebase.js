import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Firebase configuration
const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
};

// Initialize Firebase
const app = initializeApp(config);

const db = getFirestore(app);

export async function addRecord (name, record, collec) {
    try {
        const docRef = await addDoc(collection(db, collec), {
            name: name,
            record: record
        });
        console.log(docRef.id);
    }
    catch (err) {
        console.error(err);
    }
}
export async function getRecords (collec) {
    try {
        var docs = await getDocs(collection(db, collec));
    }
    catch (err) {
        console.error(err)
    }
    return docs;
}
