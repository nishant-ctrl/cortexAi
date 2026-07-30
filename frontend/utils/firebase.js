import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "cortexai-c2b58.firebaseapp.com",
    projectId: "cortexai-c2b58",
    storageBucket: "cortexai-c2b58.firebasestorage.app",
    messagingSenderId: "172720632783",
    appId: "1:172720632783:web:2e688d47989714d78758ba",
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider()