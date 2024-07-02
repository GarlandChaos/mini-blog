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
        <div className={styles.noPosts}>
          <p>Error retrieving post. It may not exist or was deleted.</p>
          <Link to="/createpost" className="btn">
            Create post
          </Link>
        </div>
      </>
    );
  }
  console.log(post);

  return (
    <>
      <div className={styles.postContainer}>
        {Object.hasOwn(post, "imageUrl") && (
          <img src={post.imageUrl.imageUrl} alt={post.title.title} />
        )}
        {Object.hasOwn(post, "title") && <h1>{post.title.title}</h1>}
        <p>by {post.createdBy}</p>
        {Object.hasOwn(post, "tags") &&
          post.tags.tags.map((tag) => {
            return <span key={tag}>#{tag}</span>;
          })}
        {Object.hasOwn(post, "body") && <p>{post.body.body}</p>}
      </div>
    </>
  );
};

export default Post;
