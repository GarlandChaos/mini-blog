import { useEffect, useState } from "react";
import {
  doc, getDoc
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useFetchSingleDocument = (
  documentCollection,
  id
) => {
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDocument() {
      if (isCancelled) return;

      setLoading(true);
      setError(null);

      try {
        const docReference = await doc(db, documentCollection, id);
        const docSnapshot = await getDoc(docReference);

        setDocument(docSnapshot.data());
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    loadDocument();
  }, [documentCollection, isCancelled, id]);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { document, loading, error };
};
