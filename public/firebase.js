import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';
import {
    getMessaging,
    isSupported,
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js';

export const firebaseConfig = {
    apiKey: 'AIzaSyAAMvoXCfQ4NjFY6tUTELXG-lQd9OhkMTg',
    authDomain: 'e-comm-team-amig-1678127873989.firebaseapp.com',
    projectId: 'e-comm-team-amig-1678127873989',
    storageBucket: 'e-comm-team-amig-1678127873989.appspot.com',
    messagingSenderId: '513503659466',
    appId: '1:513503659466:web:da5de785bcc746037ebb33',
    measurementId: 'G-Q1B43ESV2N',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const messaging = async () => (await isSupported()) && getMessaging(app);
export const storage = getStorage(app);