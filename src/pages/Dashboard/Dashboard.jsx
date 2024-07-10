//Libs
import { Link } from "react-router-dom";

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
  const {
    documents,
    loading: fetchDocumentsLoading,
    error: fetchDocumentsError,
  } = useFetchDocuments("Posts", null, uid);
  const { deleteDocument, response } = useDeleteDocument("Posts");

  if (fetchDocumentsLoading) return <p>Loading posts...</p>;

  return (
    <>
      <div className={styles.dashboard}>
        <div className="pageHeader">
          <h1>Dashboard</h1>
        </div>
        {!fetchDocumentsError && documents.length !== 0 && (
          <>
            <div className={styles.postHeader}>
              <span>Title</span>
              <span>Actions</span>
            </div>
            {documents.map((post) => {
              return (
                <div key={post.id} className={styles.postRow}>
                  <p>{post.title.title}</p>
                  <div>
                    <Link to={`/post/${post.id}`} className="btn btn-outline">
                      View
                    </Link>
                    <Link
                      to={`/post/${post.id}/edit`}
                      className="btn btn-outline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteDocument(post.id)}
                      className="btn btn-outline btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {(fetchDocumentsError || documents.length === 0) && (
          <div className="noPosts">
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
