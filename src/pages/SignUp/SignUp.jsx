import { useState } from "react";

//Styles
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccount = (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Confirmation password doesn't match!");
      return;
    }

    const user = { userName, email, password };

    console.log(user);
  };

  return (
    <>
      <div className={styles.signup_header}>
        <h1>Sign up to post</h1>
        <p>Create your user and share your stories</p>
      </div>
      <form onSubmit={handleCreateAccount}>
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
        <label>
          <span>Password confirmation:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />
        </label>
        <input className="btn" type="submit" value="Create account" />
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
};

export default SignUp;
