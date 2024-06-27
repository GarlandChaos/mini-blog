import { auth } from "../firebase/config";

import {
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

      await updateProfile(user, { displayName: data.username });

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
      console.log(error);

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "User not found";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong password";
      } else if (error.message.includes("invalid-credential")) {
        systemErrorMessage = "Invalid login credentials";
      } else if (error.message.includes("too-many-requests")) {
        systemErrorMessage =
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
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
      setIsCancelled(true);
    };
  }, []);

  return { auth, createUser, login, logout, error, loading };
};
