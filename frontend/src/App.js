import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./component/Sidebar";
import Home from "./Pages/home/home";
import Job from "./Pages/home/Job";
import Notification from "./Pages/home/Notification";
import Login from "./Pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GAdminRoutes from "./Routes/GAdminRoutes";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Fix import for jwt-decode
import JobDetails from "./Pages/home/Jobdetails";
import { Internship } from "./Pages/home/Internship";
import TAdminRoutes from "./Routes/TAdminRoutes";

function App() {
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (window.location.pathname !== "/login") {
      const tokenFromCookies = Cookies.get("token") || token;
      if (tokenFromCookies) {
        try {
          const decoded = jwtDecode(tokenFromCookies);
          if (decoded.role === "student") {
            document.body.style.backgroundColor = "rgb(22, 22, 59)";
          } else if (decoded.role === "global_admin") {
            document.body.style.backgroundColor = "rgb(26, 32, 44)";
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        document.body.style.backgroundColor = "rgb(22, 22, 59)";
      }
    }
  }, [token]);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    const tokenFromCookies = Cookies.get("token") || token;
    if (!tokenFromCookies) return <Navigate to="/login" />;
    try {
      const decoded = jwtDecode(tokenFromCookies);
      if (allowedRoles.includes(decoded.role)) {
        return children;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return <Navigate to="/" />;
  };

  const checkUserRole = () => {
    const tokenFromCookies = Cookies.get("token") || token;
    if (tokenFromCookies) {
      try {
        const decoded = jwtDecode(tokenFromCookies);
        if (decoded && decoded.role) {
          if (decoded.role === "student") return "/";
          else if (decoded.role === "global_admin") return "/gadmin/dashboard";
          else if (decoded.role === "tnp_admin") return "/tadmin/dashboard";
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return "/login";
  };

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Routes>
        <Route
          path="/login"
          element={
            !token && !Cookies.get("token") ? (
              <Login />
            ) : (
              <Navigate to={checkUserRole()} />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["student", "tnp_admin", "global_admin"]}>
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
            <ProtectedRoute allowedRoles={["student", "tnp_admin", "global_admin"]}>
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
            <ProtectedRoute allowedRoles={["student", "tnp_admin", "global_admin"]}>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-[#A3B5C0] p-6 rounded-l-3xl">
                  <JobDetails />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/internship"
          element={
            <ProtectedRoute allowedRoles={["student", "tnp_admin", "global_admin"]}>
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
            <ProtectedRoute allowedRoles={["student", "tnp_admin", "global_admin"]}>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-[#A3B5C0] p-6 rounded-l-3xl">
                  <Notification />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        {/* GAdmin Routes */}
        <Route
          path="/gadmin/*"
          element={
            <ProtectedRoute allowedRoles={["global_admin"]}>
              <GAdminRoutes />
            </ProtectedRoute>
          }
        />
        {/* TAdmin Routes */}
        <Route
          path="/tadmin/*"
          element={
            <ProtectedRoute allowedRoles={["tnp_admin"]}>
              <TAdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
