import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const auth = getAuth();

  const createUser = async (data) => {
    console.log(isCancelled);
    if (isCancelled) return;

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.displayName });

      setLoading(false);

      return user;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "The password must contain at least 6 characters";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "Email already registered";
      } else {
        systemErrorMessage = "An error has occurred, please try again later";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  const login = async (data) => {
    if (isCancelled) return;

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "User not found";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong password";
      } else {
        systemErrorMessage = "An error has occurred, please try again later";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  const logout = () => {
    if (isCancelled) return;

    signOut(auth);
  };

  useEffect(() => {
    setIsCancelled(false);

    //cleanup function
    return () => {
      console.log("executed cleanup");
      setIsCancelled(true);
    };
  }, []);

  return { auth, createUser, login, logout, error, loading };
};
