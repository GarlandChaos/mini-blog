//Libs
import { Link } from "react-router-dom";

//Styles
import styles from "./Search.module.css";

//Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

//Components
import PostCard from "../../components/PostCard/PostCard";

const Search = () => {
  const query = useQuery("");
  const search = query.get("q");
  const { documents, loading, error } = useFetchDocuments("Posts", search);

  console.log(documents);
  if (loading) return <p>Loading posts...</p>;

  return (
    <>
      <div className="pageHeader">
        <h1>Search results for &apos;{search}&apos;</h1>
      </div>
      <div className={styles.postCardsContainer}>
        {!error &&
          documents.map((doc) => {
            return (
              <PostCard
                key={doc.id}
                postId={doc.id}
                title={doc.title.title}
                body={doc.body.body}
                tags={doc.tags.tags}
                createdBy={doc.createdBy}
                imageUrl={doc.imageUrl.imageUrl}
              />
            );
          })}
        {(error || documents.length === 0) && (
          <div className="noPosts">
            <p>No posts found.</p>
            <Link to="/" className="btn">
              Return to home
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
