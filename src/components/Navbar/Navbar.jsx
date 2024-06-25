//Libs
import { NavLink } from "react-router-dom";

//Styles
import styles from "./Navbar.module.css";

//Hooks
import { useAuthentication } from "../../hooks/useAuthentication";

//Context
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useAuthentication();

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Home
            </NavLink>
          </li>
          {user === null && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
          {user !== null && (
            <>
              <li>
                <NavLink
                  to="/posts"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              About
            </NavLink>
          </li>
          {user !== null && (
            <li>
              <button onClick={logout}>Exit</button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
