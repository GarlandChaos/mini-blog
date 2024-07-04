//Libs
import { Link, useNavigate } from "react-router-dom";

//Styles
import styles from "./Dashboard.module.css";

//Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

//Context
import { useAuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const user = useAuthContext();
  const uid = user.user.uid;
  const { documents, loading, error } = useFetchDocuments("Posts", null, uid);
  const { deleteDocument, response } = useDeleteDocument("Posts");
  const navigate = useNavigate();

  if (loading) return <p>Loading posts...</p>;

  const editDocument = (postId) => {
    navigate(`/post/${postId}/edit`);
  };

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        {!error &&
          documents.length !== 0 &&
          documents.map((post, index) => {
            return (
              <div key={index}>
                <span>{post.title.title}</span>
                <button onClick={() => editDocument(post.id)}>Edit</button>
                <button onClick={() => deleteDocument(post.id)}>Delete</button>
              </div>
            );
          })}
        {(error || documents.length === 0) && (
          <div className={styles.noPosts}>
            <p>No posts found.</p>
            <Link to="/createpost" className="btn">
              Create first post
            </Link>
          </div>
        )}
        {response.error && <p className="error">{response.error}</p>}
      </div>
    </>
  );
};

export default Dashboard;
