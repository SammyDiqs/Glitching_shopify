import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDURe0ktUIIckvZAIZggAk1VI50wlZwbyk",
    authDomain: "feco-c2699.firebaseapp.com",
    projectId: "feco-c2699",
    storageBucket: "feco-c2699.appspot.com",
    messagingSenderId: "425305853828",
    appId: "1:425305853828:web:23741aa19ad8cdbe76d7d1"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);