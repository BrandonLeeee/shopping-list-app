import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, updateProfile } from "../config/firebase";

export const addUserData = async (userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, data);
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const ordersRef = collection(db, "users", userId, "orders");
    const paymentsRef = collection(db, "users", userId, "payments");

    const [userSnap, orderSnap, paymentSnap] = await Promise.all([
      getDoc(userRef),
      getDocs(ordersRef),
      getDocs(paymentsRef),
    ]);

    if (!userSnap.exists()) {
      console.error("No user found!");
      return null;
    }

    const userInfo = { id: userSnap.id, ...userSnap.data() };

    const userOrders = orderSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const userPayments = paymentSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { userInfo, userOrders, userPayments };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateUserData = async (docId, newData) => {
  await updateProfile(auth.currentUser, { displayName: newData.name });
  const userDoc = doc(db, "users", docId);
  return await updateDoc(userDoc, newData);
};

export const addUserOrder = async (userId, newOrder) => {
  try {
    const ordersRef = collection(db, "users", userId, "orders");

    // Add a new order with a Firestore-generated timestamp
    await addDoc(ordersRef, {
      ...newOrder,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating user orders:", error);
    throw error;
  }
};

export const addUserPayment = async (userId, newPayment) => {
  try {
    const paymentRef = collection(db, "users", userId, "payments");

    await addDoc(paymentRef, {
      ...newPayment,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error addind user payment", error);
    throw error;
  }
};

export const deleteUser = async (docId) => {
  return await deleteDoc(doc(db, "users", docId));
};
