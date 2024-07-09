//Libs
import { Link } from "react-router-dom";

//Styles
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <div className="page_header">
        <h1>
          About Mini <span>Blog</span>
        </h1>
        <p>
          This project consists of a blog made with React for the front-end and
          Firebase for the back-end.
        </p>
      </div>
      <Link to="/posts/create" className="btn">
        Create post
      </Link>
    </div>
  );
};

export default About;
