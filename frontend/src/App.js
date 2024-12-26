import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Home from "./Pages/home/home";
import Job from "./Pages/home/Job";
import Internship from "./Pages/home/Internship";
import Notification from "./Pages/home/Notification";
import Login from "./Pages/login";
import { useSelector } from "react-redux"; // Redux hook for accessing the state

// Protected Route Component to check for login token
function ProtectedRoute({ children }) {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ); // Get token from cookies
  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token is found
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Requires Login Token) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-[#A3B5C0] p-6 rounded-l-3xl">
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
      </Routes>
    </Router>
  );
}

export default App;
