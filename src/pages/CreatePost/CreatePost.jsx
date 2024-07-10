//Hooks
import { useNavigate } from "react-router-dom";
import { useAddDocument } from "../../hooks/useAddDocument";
import { useAuthContext } from "../../context/AuthContext";
import PostForm from "../../components/PostForm/PostForm";

const CreatePost = () => {
  const { addDocument, response } = useAddDocument("Posts");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleCreatePost = (
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

    addDocument({
      title,
      imageUrl,
      tags,
      body,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <>
      <div className="pageHeader">
        <h1>Create your post</h1>
        <p>Write about what you want and share your knowledge!</p>
      </div>
      <PostForm handleFormSubmit={handleCreatePost} response={response} />
    </>
  );
};

export default CreatePost;
