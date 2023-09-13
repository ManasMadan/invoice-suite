import { useEffect, useState } from "react";
import { db, initializeFirebase } from "../Firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function useData() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fn = async () => {
      initializeFirebase();
      const auth = getAuth();
      const user = auth.currentUser;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data());
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    fn();
  }, []);
  return data;
}

export default useData;
