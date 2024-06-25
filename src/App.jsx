//Libs
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//Styles
import "./App.css";

//Hooks
import { useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//Context
import { AuthContextProvider } from "./context/AuthContext";

//Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Posts from "./pages/Posts/Posts";
import Dashboard from "./pages/Dashboard/Dashboard";

//Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;
  const isUserNull = user === null;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, [auth]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AuthContextProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={isUserNull ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={isUserNull ? <SignUp /> : <Navigate to="/" />}
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/posts"
                element={!isUserNull ? <Posts /> : <Navigate to="/signup" />}
              />
              <Route
                path="/dashboard"
                element={
                  !isUserNull ? <Dashboard /> : <Navigate to="/signup" />
                }
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
