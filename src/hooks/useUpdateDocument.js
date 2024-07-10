//Libs
import { useEffect, useReducer, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

//Firebase config
import { db } from "../firebase/config";

const initialState = {
  loading: null,
  error: null,
};

const updateDocumentReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (documentCollection) => {
  const [response, dispatch] = useReducer(updateDocumentReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const checkIfIsCancelledBeforeDispatch = (action) => {
    if (isCancelled) return;

    dispatch(action);
  };

  const updateDocument = async (id, data) => {
    checkIfIsCancelledBeforeDispatch({ type: "LOADING" });

    try {
      const docReference = await doc(db, documentCollection, id);
      const updatedDoc = await updateDoc(docReference, data);

      checkIfIsCancelledBeforeDispatch({
        type: "UPDATED",
        payload: updatedDoc,
      });
    } catch (error) {
        console.log(error);
      checkIfIsCancelledBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { updateDocument, response };
};
