import { getAuth } from "firebase/auth";
import { db } from "./index";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const defaultData = {
  invoices: [],
  totalAmountProcessed: 0,
  companyName: "Invoice Suite",
  lastWeekMetric: [
    { day: "monday", amount: 1000 },
    { day: "tuesday", amount: 1200 },
    { day: "wednesday", amount: 800 },
    { day: "thursday", amount: 400 },
    { day: "friday", amount: 1900 },
    { day: "saturday", amount: 1400 },
    { day: "sunday", amount: 900 },
  ],
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
const updateCompanyName = async (newName) => {
  const auth = getAuth();
  const user = auth.currentUser;

  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    await updateDoc(docRef, { ...docSnap.data(), companyName: newName })
      .then(() => alert("Company Name Updated"))
      .catch(() => alert("Something Went Wrong"));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const createInvoice = async (
  invoiceDetails,
  senderAddress,
  clientsAddress,
  items
) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const newInvoice = {
    ...invoiceDetails,
    senderAddress: senderAddress,
    clientsAddress: clientsAddress,
    items: items,
  };

  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    await updateDoc(docRef, {
      ...docData,
      invoices: [...docData.invoices, newInvoice],
    })
      .then(() => alert("Invoice Created"))
      .catch(() => alert("Something Went Wrong"));
  } catch (e) {
    console.error("Something Went Wrong: ", e);
  }
};
export { createDocumentOnUserSignUp, updateCompanyName, createInvoice };
