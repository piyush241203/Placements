import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./component/Sidebar";
import Home from "./Pages/home/home";
import Job from "./Pages/home/Job";
import Notification from "./Pages/home/Notification";
import Login from "./Pages/login";
import { ToastContainer } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import GAdminRoutes from "./Routes/GAdminRoutes";
import Cookies from "js-cookie"; // Import js-cookie library
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode token
import JobDetails from "./Pages/home/Jobdetails";
import { Internship } from "./Pages/home/Internship";

function App() {
  const { token } = useSelector((state) => state.user); // Redux token state

  
  // Effect to set background color based on user role (not on login page)
  useEffect(() => {
    if (window.location.pathname !== "/login") {
      const tokenFromCookies = Cookies.get("token") || token;
      if (tokenFromCookies) {
        try {
          const decoded = jwtDecode(tokenFromCookies);
          // Set background color based on user role
          if (decoded.role === "student") {
            document.body.style.backgroundColor = "rgb(22, 22, 59)";
          } else if (decoded.role === "global_admin") {
            document.body.style.backgroundColor = "rgb(26, 32, 44)";
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        document.body.style.backgroundColor = "rgb(22, 22, 59)"; // Default background for guest users
      }
    }
  }, [token]); // Add token as a dependency to re-run when token changes

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = token || Cookies.get("token"); // Check Redux and cookies
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // Function to check the user's role
  const checkUserRole = () => {
    const tokenFromCookies = Cookies.get("token") || token;
    if (tokenFromCookies) {
      try {
        const decoded = jwtDecode(tokenFromCookies);
        if (decoded && decoded.role) {
          if (decoded.role === "student") {
            return "/job"; // Navigate to job if role is student
          } else if (decoded.role === "global_admin") {
            return "/gadmin/dashboard"; // Navigate to global admin dashboard if role is global_admin
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return "/login"; // Default to login if no valid role
  };

  return (
    <Router>
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <Routes>
        {/* Login Page (Public Route) */}
        <Route path="/login" element={!token && !Cookies.get("token") ? <Login /> : <Navigate to={checkUserRole()} />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-gray-200 p-3 rounded-l-3xl">
                  <Home />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/job"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-[#A3B5C0] p-6 rounded-l-3xl">
                  <Job />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/:jobId"
          element={
            
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-[#A3B5C0] p-6 rounded-l-3xl">
                  <JobDetails />
                </main>
              </div>
            
          }
        />
        <Route
          path="/internship"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-[#A3B5C0] p-6 rounded-l-3xl">
                  <Internship />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notify"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-[#A3B5C0] p-6 rounded-l-3xl">
                  <Notification />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gadmin/*"
          element={
            <ProtectedRoute>
              <GAdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes to Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
