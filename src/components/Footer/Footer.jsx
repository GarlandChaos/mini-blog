import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className="page_header">
          Express yourself on
          <h3 className="brand">
            Mini <span>Blog</span>
          </h3>
        </div>
        <p>Mini Blog &copy; 2024</p>
        <p>Developed by Bernardo Alvarez Braga</p>
      </footer>
    </>
  );
};

export default Footer;
