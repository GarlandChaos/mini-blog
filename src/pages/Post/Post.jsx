//Libs
import { Link } from "react-router-dom";

//Styles
import styles from "./Post.module.css";

//Hooks
import { useParams } from "react-router-dom";
import { useFetchSingleDocument } from "../../hooks/useFetchSingleDocument";

const Post = () => {
  const { id } = useParams();
  const {
    document: post,
    loading,
    error,
  } = useFetchSingleDocument("Posts", id);

  if (loading) return <p>Loading post...</p>;

  if (error || !post || post == {}) {
    return (
      <>
        <div className="noPosts">
          <p>Error retrieving post. It may not exist or was deleted.</p>
          <Link to="/createpost" className="btn">
            Create post
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.postContainer}>
        {Object.hasOwn(post, "imageUrl") && (
          <img src={post.imageUrl} alt={post.title} />
        )}
        {Object.hasOwn(post, "title") && <h1>{post.title}</h1>}
        <p>by {post.createdBy}</p>
        <div className={styles.tagsContainer}>
          {Object.hasOwn(post, "tags") &&
            post.tags.map((tag) => {
              return (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              );
            })}
        </div>
        {Object.hasOwn(post, "body") && (
          <p className={styles.bodyArea}>{post.body}</p>
        )}
      </div>
    </>
  );
};

export default Post;
