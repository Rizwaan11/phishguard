import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TextService from "./pages/TextService";
import LinkService from "./pages/LinkService";
import QrService from "./pages/QrService";
import PdfService from "./pages/AudioService";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  // Check session from backend on app load
  useEffect(() => {
    fetch("http://localhost:8000/check-auth", {
      credentials: "include", // include cookies for session
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setIsLoggedIn(true);
          setEmail(data.email);
        } else {
          setIsLoggedIn(false);
          setEmail("");
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  // Logout handler
  const handleLogout = () => {
    fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setIsLoggedIn(false);
        setEmail("");
      });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              email={email}
              handleLogout={handleLogout}
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/text-upload" element={<TextService />} />
        <Route path="/url-upload" element={<LinkService />} />
        <Route path="/qrcode-upload" element={<QrService />} />
        <Route path="/audio-upload" element={<PdfService />} />
      </Routes>
    </Router>
  );
}

export default App;
