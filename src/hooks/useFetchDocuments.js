import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useFetchDocuments = (
  documentCollection,
  search = null,
) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDocuments() {
      if (isCancelled) return;

      setLoading(true);
      setError(null);

      try {
        const collectionReference = collection(db, documentCollection);
        let q;

        if(search){
          q = await query(
            collectionReference, 
            where("tags.tags", "array-contains", search),
            orderBy("createdAt", "desc"));
        }
        else{
          q = await query(
            collectionReference, 
            orderBy("createdAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    loadDocuments();
  }, [documentCollection, search, isCancelled]);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { documents, loading, error };
};