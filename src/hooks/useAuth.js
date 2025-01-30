import IsLoading from "@/components/IsLoading";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@/services/firebase";

import React, { useState } from "react";

const useSignIn = (email, password) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, handleSignUp, loading, error, setError };
};

export default useSignIn;
