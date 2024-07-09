import { useEffect, useState } from "react";

//Hooks
import { useAuthentication } from "../../hooks/useAuthentication";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Confirmation password doesn't match!");
      return;
    }

    const user = { username, email, password };

    await createUser(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <div className="page_header">
        <h1>Sign up to post</h1>
        <p>Create your user and share your stories</p>
      </div>
      <form onSubmit={handleCreateAccount}>
        <label>
          <span>Username:</span>
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
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
        {!loading && (
          <input className="btn" type="submit" value="Create account" />
        )}
        {loading && <input className="btn" disabled value="Wait..." />}
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
};

export default SignUp;
