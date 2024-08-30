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
import Dashboard from "./Components/Dashboard";

const ProtectedRoute = ({ element, redirectTo, requiresAuth }) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (requiresAuth && !isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }
  if (!requiresAuth && isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }
  return element;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={<Dashboard />}
                redirectTo="/login"
                requiresAuth={true}
              />
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute
                element={<Login />}
                redirectTo="/"
                requiresAuth={false}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute
                element={<Signup />}
                redirectTo="/"
                requiresAuth={false}
              />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
