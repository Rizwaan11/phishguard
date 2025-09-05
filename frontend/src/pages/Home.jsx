import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home({ isLoggedIn, email, handleLogout }) {
  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        email={email}
        handleLogout={handleLogout}
      />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}
