import { getAuth } from "firebase/auth";
import { db } from "./index";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const defaultData = {
  invoices: [],
  companyName: "Invoice Suite",
  currencySymbol: "₹",
  lastWeekMetric: [
    { day: "Monday", amount: 0 },
    { day: "Tuesday", amount: 0 },
    { day: "Wednesday", amount: 0 },
    { day: "Thursday", amount: 0 },
    { day: "Friday", amount: 0 },
    { day: "Saturday", amount: 0 },
    { day: "Sunday", amount: 0 },
  ],
  totalAmountProcessed: 0,
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
const updateCurrencySymbol = async (newName) => {
  const auth = getAuth();
  const user = auth.currentUser;

  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    await updateDoc(docRef, { ...docSnap.data(), currencySymbol: newName })
      .then(() => alert("Currency Symbol Updated"))
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
      totalAmountProcessed:
        newInvoice.invoiceTotal + docData.totalAmountProcessed,
      invoices: [...docData.invoices, newInvoice],
    })
      .then(() => alert("Invoice Created"))
      .catch(() => alert("Something Went Wrong"));
  } catch (e) {
    console.error("Something Went Wrong: ", e);
  }
};

export {
  createDocumentOnUserSignUp,
  updateCompanyName,
  createInvoice,
  updateCurrencySymbol,
};
