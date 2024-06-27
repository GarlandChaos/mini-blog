//Styles
import styles from "./Posts.module.css";

//Hooks
import { useState } from "react";
import { useAddDocument } from "../../hooks/useAddDocument";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState(null);
  const { addDocument, response } = useAddDocument("Posts");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleCreatePost = (e) => {
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

    addDocument({
      title: { title },
      imageUrl: { imageUrl },
      tags: { tags },
      body: { body },
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  const updateTags = (tagsString) => {
    tagsString = tagsString.trim();
    setTagsInput(tagsString);

    const tagsArray = tagsString
      .toLowerCase()
      .split(",")
      .filter((tag) => tag !== "");
    // console.log(tagsArray);

    setTags(tagsArray);
  };

  return (
    <>
      <div className={styles.create_post_header}>
        <h1>Create your post</h1>
        <p>Write about what you want and share your knowledge!</p>
      </div>
      <form onSubmit={handleCreatePost}>
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
        {!response.loading && (
          <input className="btn" type="submit" value="Create post" />
        )}
        {response.loading && <input className="btn" disabled value="Wait..." />}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
      {/* <div> */}
      {/* <ol> */}
      {/* {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))} */}
      {/* </ol> */}
      {/* </div> */}
    </>
  );
};

export default Posts;
