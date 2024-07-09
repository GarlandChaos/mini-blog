import { useEffect, useState } from "react";

//Hooks
import { useAuthentication } from "../../hooks/useAuthentication";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const user = { email, password };

    await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <div className="page_header">
        <h1>Login</h1>
        <p>Login to share your stories</p>
      </div>
      <form onSubmit={handleLogin}>
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
