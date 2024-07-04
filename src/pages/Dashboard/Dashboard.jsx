//Libs
import { Link } from "react-router-dom";

//Styles
import styles from "./Dashboard.module.css";

//Context
import { useAuthContext } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const user = useAuthContext();
  const uid = user.uid;
  const { documents, loading, error } = useFetchDocuments("Posts", null, uid);
  const { deleteDocument, response } = useDeleteDocument("Posts");

  if (loading) return <p>Loading posts...</p>;

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
