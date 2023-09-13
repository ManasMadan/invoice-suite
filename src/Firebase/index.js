import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZFRvHaNSHqqNCjOE6Eae8Pwv3a9CH7m4",
  authDomain: "invoice-suite-ee4df.firebaseapp.com",
  projectId: "invoice-suite-ee4df",
  storageBucket: "invoice-suite-ee4df.appspot.com",
  messagingSenderId: "444061516198",
  appId: "1:444061516198:web:67e20b18d1222d8ad9cf67",
};

let app;
let db;

const initializeFirebase = () => {
  if (app == undefined) {
    app = initializeApp(firebaseConfig);
  }
  if (db == undefined) {
    db = getFirestore(app);
  }
};

export { initializeFirebase, app, db };
