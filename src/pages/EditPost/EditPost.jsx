//Styles
import styles from "./EditPost.module.css";

//Hooks
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSingleDocument } from "../../hooks/useFetchSingleDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

//Context
import { useAuthContext } from "../../context/AuthContext";
import PostForm from "../../components/PostForm/PostForm";

const EditPost = () => {
  const { id } = useParams();
  const user = useAuthContext();
  const {
    document,
    loading: fetchDocumentLoading,
    error: fetchDocumentError,
  } = useFetchSingleDocument("Posts", id);
  const { updateDocument, response } = useUpdateDocument("Posts");
  const navigate = useNavigate();

  if (fetchDocumentLoading) return <p>Loading post...</p>;

  const handleEditPost = async (
    event,
    title,
    imageUrl,
    tags,
    body,
    setFormError
  ) => {
    event.preventDefault();

    setFormError(null);

    if (!title || !imageUrl || !tags || !body) {
      setFormError("All fields needs to be filled");
      return;
    }

    try {
      new URL(imageUrl);
    } catch (error) {
      setFormError("Invalid URL");
      return;
    }

    const updatedData = {
      title,
      imageUrl,
      tags,
      body,
      uid: user.user.uid,
      createdBy: user.user.displayName,
    };

    await updateDocument(id, updatedData);

    navigate(`/post/${id}`);
  };

  return (
    <>
      <div className="pageHeader">
        <h1>Edit post</h1>
      </div>
      <PostForm
        handleFormSubmit={handleEditPost}
        response={response}
        document={document}
      />
      {fetchDocumentError && (
        <div className={styles.fetchDocumentErrorContainer}>
          <p className="error">{fetchDocumentError}</p>
        </div>
      )}
    </>
  );
};

export default EditPost;
