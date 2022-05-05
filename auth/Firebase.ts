import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const envVariables: any = process.env

const firebaseConfig = {
    apiKey: envVariables.apiKey,
    authDomain: envVariables.authDomain,
    projectId: envVariables.projectId,
    storageBucket: envVariables.storageBucket,
    messagingSenderId: envVariables.messagingSenderId,
    appId: envVariables.appId,
    measurementId: envVariables.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);