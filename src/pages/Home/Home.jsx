//Libs
import { Link, useNavigate } from "react-router-dom";

//Styles
import styles from "./Home.module.css";

//Components
import PostCard from "../../components/PostCard/PostCard";

//Hooks
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents, loading, error } = useFetchDocuments("Posts");
  const navigate = useNavigate();

  const onSearchFormSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query.toLowerCase()}`);
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <>
      <div className="pageHeader">
        <h1>Recent Posts</h1>
      </div>
      <div className={styles.postCardsContainer}>
        <form onSubmit={onSearchFormSubmit} className={styles.searchForm}>
          <input
            type="text"
            name="searchBar"
            placeholder="Search for posts by tags here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input className="btn btn-dark" type="submit" value="Search" />
        </form>
        {!error &&
          documents.map((doc) => {
            return (
              <PostCard
                key={doc.id}
                postId={doc.id}
                title={doc.title.title}
                tags={doc.tags.tags}
                createdBy={doc.createdBy}
                imageUrl={doc.imageUrl.imageUrl}
              />
            );
          })}
        {(error || documents.length === 0) && (
          <div className="noPosts">
            <p>No posts found.</p>
            <Link to="/createpost" className="btn">
              Create first post
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
