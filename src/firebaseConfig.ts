import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyB8_6iCJbbmL5aYUgvSwg8fmdd5mZOSHyc',
    authDomain: 'https://apppronutrir-e0737.firebaseio.com',
    databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'apppronutrir-e0737',
    storageBucket: 'apppronutrir-e0737.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default app;