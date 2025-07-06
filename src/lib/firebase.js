import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPwUQdGDovmI5WZjiPzBTfpXk4wnS83Mc",
  authDomain: "neighborlycalgary.firebaseapp.com",
  projectId: "neighborlycalgary",
  storageBucket: "neighborlycalgary.firebasestorage.app",
  messagingSenderId: "1045114625371",
  appId: "1:1045114625371:web:974f887ca67ceb96034e7e",
  measurementId: "G-6V4EK3B14H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Analytics, only on client side
if (typeof window !== "undefined") {
    getAnalytics(app);
}

export {db};
export default app;
