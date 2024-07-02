//Libs
import { Link } from "react-router-dom";

//Styles
import styles from "./PostCard.module.css";

const PostCard = ({ postId, title, body, tags, createdBy, imageUrl }) => {
  return (
    <div className={styles.card}>
      <Link to={`/post/${postId}`}>
        <div className={styles.imgContainer}>
          <img src={imageUrl} alt={title} />
        </div>
        <div className={styles.textContainer}>
          <h2>{title}</h2>
          <p>by {createdBy}</p>
          <div className={styles.tagsContainer}>
            {tags.map((tag, index) => {
              return (
                <span key={index} className={styles.tag}>
                  #{tag}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
