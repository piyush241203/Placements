import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../TAdmin/Components/Navigation";
import Dashboard from "../TAdmin/Pages/Main";
import Users from "../TAdmin/Pages/UsersPage";
import Usersprofile from "../TAdmin/Pages/UserProfile";
import Posts from "../TAdmin/Pages/PostsPage/PostsPage";
import Status from "../TAdmin/Pages/StatusPage";
import Feedback from "../TAdmin/Pages/FeedbackPage";
import Profile from "../TAdmin/Pages/ProfilePage";

function TAdminRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="dashboard"
          element={
            <div className="flex">
              <Navigation/>
              <main className="flex-1 bg-[#002146] ">
                <Dashboard />
              </main>
            </div>
          }
        />
        <Route
          path="users"
          element={
            <div className="flex">
              <Navigation />
              <main className="flex-1 bg-[#002146]">
                <Users />
              </main>
            </div>
          }
        />

        <Route
          path="userprofile/:userId"
          element={
            <div className="flex">
              <Navigation />
              <main className="flex-1 bg-[#002146]">
                < Usersprofile/>
              </main>
            </div>
          }
        />

        <Route
          path="/posts"
          element={
            <div className="flex">
              <Navigation />
              <main className="flex-1 bg-[#002146]">
                <Posts />
              </main>
            </div>
          }
        />

        <Route
          path="/status"
          element={
            <div className="flex">
              <Navigation />
              <main className="flex-1 bg-[#002146]">
                <Status />
              </main>
            </div>
          }
        />

        <Route
          path="/feedback"
          element={
            <div className="flex">
              <Navigation />
              <main className="flex-1 bg-[#002146]">
                <Feedback />
              </main>
            </div>
          }
        />

        <Route
          path="/profile"
          element={
            <div className="flex">
              <Navigation />
              <main className="flex-1 bg-[#002146]">
                <Profile />
              </main>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default TAdminRoutes;
