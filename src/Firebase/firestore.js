import { db } from "./index";
import { getDoc, doc, setDoc } from "firebase/firestore";

const defaultData = {
  pastOrders: [],
  activeOrders: [],
  pastIssues: [],
  activeIssues: [],
};

const createDocumentOnUserSignUp = async (user) => {
  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return user;
    } else {
      await setDoc(docRef, defaultData);
      return user;
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { createDocumentOnUserSignUp };
