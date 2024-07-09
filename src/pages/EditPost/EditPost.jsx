//Styles
import styles from "./EditPost.module.css";

//Hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSingleDocument } from "../../hooks/useFetchSingleDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

//Context
import { useAuthContext } from "../../context/AuthContext";

const EditPost = () => {
  const { id } = useParams();
  const user = useAuthContext();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState(null);
  const { document, loading, error } = useFetchSingleDocument("Posts", id);
  const { updateDocument, response } = useUpdateDocument("Posts");
  const navigate = useNavigate();

  useEffect(() => {
    if (document) {
      if (Object.hasOwn(document, "title")) {
        setTitle(document.title.title);
      }

      if (Object.hasOwn(document, "imageUrl")) {
        setImageUrl(document.imageUrl.imageUrl);
      }

      if (Object.hasOwn(document, "body")) {
        setBody(document.body.body);
      }

      if (Object.hasOwn(document, "tags")) {
        const tagsString = document.tags.tags.join(",");
        updateTags(tagsString);
      }
    }
  }, [document]);

  const handleEditPost = async (e) => {
    e.preventDefault();

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
      title: { title },
      imageUrl: { imageUrl },
      tags: { tags },
      body: { body },
      uid: user.user.uid,
      createdBy: user.user.displayName,
    };

    await updateDocument(id, updatedData);

    navigate(`/post/${id}`);
  };

  const updateTags = (tagsString) => {
    tagsString = tagsString.replace(" ", "");
    setTagsInput(tagsString);

    const tagsArray = tagsString
      .toLowerCase()
      .split(",")
      .filter((tag) => tag !== "");

    setTags(tagsArray);
  };

  return (
    <>
      <div className="page_header">
        <h1>Edit post</h1>
      </div>
      <form onSubmit={handleEditPost}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Image URL:</span>
          <input
            type="url"
            name="imageUrl"
            required
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <p className={styles.imagePreviewTitle}>Image preview</p>
        <img className={styles.imagePreview} src={imageUrl} alt={title} />
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Tags"
            value={tagsInput}
            onChange={(e) => updateTags(e.target.value)}
          />
        </label>
        <label>
          <span>Post content:</span>
          <textarea
            name="body"
            required
            placeholder="Write your post here"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        {!loading && <input className="btn" type="submit" value="Save edit" />}
        {loading && <input className="btn" disabled value="Wait..." />}
        {error && <p className="error">{error}</p>}
        {formError && <p className="error">{formError}</p>}
        {response.error && <p className="error">{response.error}</p>}
      </form>
    </>
  );
};

export default EditPost;
