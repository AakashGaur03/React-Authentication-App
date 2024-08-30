import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { AuthContext, AuthProvider } from "./Context/AuthContext";

const ProtectedRoute = ({ element, redirectTo }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Navigate to={redirectTo} /> : element;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<ProtectedRoute element={<Login />} redirectTo="/" />}
          />
          <Route
            path="/signup"
            element={<ProtectedRoute element={<Signup />} redirectTo="/" />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
