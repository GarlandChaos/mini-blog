//Libs
import { useEffect, useReducer, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

//Firebase config
import { db } from "../firebase/config";

const initialState = {
  loading: null,
  error: null,
};

const deleteDocumentReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (documentCollection) => {
  const [response, dispatch] = useReducer(deleteDocumentReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const checkIfIsCancelledBeforeDispatch = (action) => {
    if (isCancelled) return;

    dispatch(action);
  };

  const deleteDocument = async (id) => {
    checkIfIsCancelledBeforeDispatch({ type: "LOADING" });

    try {
        const docReference = await doc(db, documentCollection, id);
        const deletedDoc = await deleteDoc(docReference);

        checkIfIsCancelledBeforeDispatch({
            type: "DELETED",
            payload: deletedDoc,
        });
        console.log("tried");
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

  return { deleteDocument, response };
};
