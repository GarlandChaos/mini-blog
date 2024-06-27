//Libs
import { useEffect, useReducer, useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";

//Firebase config
import { db } from "../firebase/config";

const initialState = {
  loading: null,
  error: null,
};

const addDocumentReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "ADDED":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useAddDocument = (documentCollection) => {
  const [response, dispatch] = useReducer(addDocumentReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const checkIfIsCancelledBeforeDispatch = (action) => {
    if (isCancelled) return;

    dispatch(action);
  };

  const addDocument = async (data) => {
    checkIfIsCancelledBeforeDispatch({ type: "LOADING" });

    try {
      const newDocument = { ...data, createdAt: Timestamp.now() };
      const insertedDocument = await addDoc(
        collection(db, documentCollection),
        newDocument
      );
      checkIfIsCancelledBeforeDispatch({
        type: "ADDED",
        payload: insertedDocument,
      });
    } catch (error) {
      checkIfIsCancelledBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, response };
};
