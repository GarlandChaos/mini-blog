import { BrowserRouter, Routes, Route } from "react-router-dom";

//Styles
import "./App.css";

//Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

//Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
