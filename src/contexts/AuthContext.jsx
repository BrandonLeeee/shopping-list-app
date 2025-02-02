import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "@/config/firebaseConfig";
import { useLoading } from "./LoadingContext";
import useFirestore from "@/hooks/useFirestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setLoading } = useLoading();
  const [error, setError] = useState("");
  const { addUserData } = useFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          name: currentUser.displayName || "Anonymous",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = useCallback(
    async (email, password) => {
      setLoading(true);
      setError("");
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const handleSignUp = useCallback(
    async (email, password, displayName, phoneNumber) => {
      setError("");
      setLoading(true);
      try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const newUser = userCredential.user;

        // Update Firebase profile with displayName
        await updateProfile(newUser, { displayName });

        const userData = {
          id: newUser.uid,
          name: displayName,
          email,
          phoneNumber,
          address: "",
        };

        await addUserData(newUser.uid, userData);

        setUser(userData);

        navigate("/");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );
  const handleSignOut = useCallback(async () => {
    setLoading(true);
    setUser(null);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
