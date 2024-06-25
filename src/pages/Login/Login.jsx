import { useEffect, useState } from "react";

//Styles
import styles from "./Login.module.css";

//Hooks
import { useAuthentication } from "../../hooks/useAuthentication";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const user = { email, password };

    const res = await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <div className={styles.login_header}>
        <h1>Login</h1>
        <p>Login to share your stories</p>
      </div>
      <form onSubmit={handleLogin}>
        <label>
          <span>Username:</span>
          <input
            type="text"
            name="userName"
            required
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.currentTarget.value)}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        {!loading && <input className="btn" type="submit" value="Login" />}
        {loading && <input className="btn" disabled value="Wait..." />}
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
};

export default SignUp;
