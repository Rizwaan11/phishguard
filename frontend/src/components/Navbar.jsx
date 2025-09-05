import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, email, handleLogout }) {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Brand
      </Link>
      <div className="space-x-6">
        <Link to="/" className="hover:text-gray-400">
          Home
        </Link>
        <Link to="/contact" className="hover:text-gray-400">
          Contact
        </Link>
      </div>
      <div className="space-x-3">
        {isLoggedIn ? (
          <>
            <span>Welcome, {email}</span>
            <button
              onClick={onLogoutClick}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-gray-800 px-4 py-1 rounded hover:bg-gray-200"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
