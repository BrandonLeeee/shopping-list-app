import { useLoading } from "@/contexts/LoadingContext";
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
import { useCallback } from "react";
import { toast } from "sonner";
import { auth, db, updateProfile } from "../config/firebaseConfig";

const useFirestore = () => {
  const { loading, setLoading } = useLoading();

  const addUserData = useCallback(async (userId, data) => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, data);
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserById = useCallback(async (userId) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserData = useCallback(async (docId, newData) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newData.name });
      const userDoc = doc(db, "users", docId);
      await updateDoc(userDoc, newData);
    } finally {
      toast.success("Profile updated successfully!", { duration: 2000 });
      setLoading(false);
    }
  }, []);

  const addUserOrder = useCallback(async (userId, newOrder) => {
    setLoading(true);
    try {
      const ordersRef = collection(db, "users", userId, "orders");
      await addDoc(ordersRef, { ...newOrder, createdAt: serverTimestamp() });
    } finally {
      setLoading(false);
    }
  }, []);

  const addUserPayment = async (userId, newPayment) => {
    try {
      const paymentRef = collection(db, "users", userId, "payments");
      await addDoc(paymentRef, { ...newPayment, createdAt: serverTimestamp() });
    } finally {
      toast.success("Payment added successfully!", { duration: 2000 });
    }
  };

  const deleteUser = useCallback(async (docId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", docId));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    addUserData,
    getUsers,
    getUserById,
    updateUserData,
    addUserOrder,
    addUserPayment,
    deleteUser,
  };
};

export default useFirestore;
