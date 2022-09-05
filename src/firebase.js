import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
} from 'firebase/firestore';

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

export async function addRecord(name, record, collec) {
    try {
        const docRef = await addDoc(collection(db, collec), {
            name: name,
            record: record,
        });
        console.log(docRef.id);
    } catch (err) {
        console.error(err);
    }
}
export async function getRecords(collec) {
    try {
        const q = query(collection(db, collec), orderBy('record', 'asc'));
        var docs = await getDocs(q);
    } catch (err) {
        console.error(err);
    }
    return docs.docs;
}
