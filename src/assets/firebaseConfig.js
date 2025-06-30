import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBGnN9GJuboajSn7TdMGPFKU0xZjRLXyYA",
    authDomain: "neighbourly-jassm.firebaseapp.com",
    projectId: "neighbourly-jassm",
    storageBucket: "neighbourly-jassm.firebasestorage.app",
    messagingSenderId: "126061597996",
    appId: "1:126061597996:web:dd444bbe46c6c457a50889"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  export {db};
  export default app;
 