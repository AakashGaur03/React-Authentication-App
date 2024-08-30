import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Comineufb");
    logout();
    setTimeout(() => navigate("/login"), 0);
  };
  return (
    <nav className="flex justify-between items-center bg-blue-500 text-white p-4">
      <Link to="/" className="text-xl font-semibold">
        App
      </Link>
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        ) : (
          <Link to="/" className="hover:underline" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
