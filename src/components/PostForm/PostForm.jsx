//Styles
import styles from "./PostForm.module.css";

//Hooks
import { useEffect, useState } from "react";

const PostForm = ({ handleFormSubmit, response, document = null }) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState(null);
  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    if (document) {
      if (Object.hasOwn(document, "title")) {
        setTitle(document.title);
      }

      if (Object.hasOwn(document, "imageUrl")) {
        setImageUrl(document.imageUrl);
      }

      if (Object.hasOwn(document, "body")) {
        setBody(document.body);
      }

      if (Object.hasOwn(document, "tags")) {
        const tagsString = document.tags.join(",");
        updateTags(tagsString);
      }
    }
  }, [document]);

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
      <form
        onSubmit={async (e) =>
          await handleFormSubmit(e, title, imageUrl, tags, body, setFormError)
        }
      >
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
            onChange={(e) => {
              setImageUrl(e.target.value);
              setIsValidUrl(true);
            }}
          />
        </label>
        {isValidUrl && (
          <>
            <p className={styles.imagePreviewTitle}>Image preview</p>
            <img
              className={styles.imagePreview}
              src={imageUrl}
              alt={title}
              onError={() => setIsValidUrl(false)}
            />
          </>
        )}
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Write your tags separated by comma"
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
          <input className="btn" type="submit" value="Save edit" />
        )}
        {response.loading && <input className="btn" disabled value="Wait..." />}
        {formError && <p className="error">{formError}</p>}
        {response.error && <p className="error">{response.error}</p>}
      </form>
    </>
  );
};

export default PostForm;
