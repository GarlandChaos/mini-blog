import { BrowserRouter, Routes, Route } from "react-router-dom";

//Styles
import "./App.css";

//Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SignUp from "./pages/SignUp/SignUp";

//Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
