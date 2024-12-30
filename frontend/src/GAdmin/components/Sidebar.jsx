import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, Bell, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser, resetState } from "../../redux/userSlice";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // Dispatch the logout action
      dispatch(resetState()); // Reset the Redux state
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex w-84 flex-col w-[300px]  bg-[rgb(26,32,44)] text-[rgb(192,192,192)]">
      <div className="p-4">
        <img
          src="/compa.png"
          alt="College logo"
          width={150}
          height={80}
          className="mb-8 "
        />
        <div className="mb-8 text-center">
          <div className="mb-4 inline-block overflow-hidden rounded-full bg-white">
            <img
              src="/placeholder.svg"
              alt="Profile picture"
              width={120}
              height={120}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-2xl">Hii, Mahesh!</h2>
          <p className="text-sm text-gray-400">Your job is waiting for you!...</p>
          <div className="mt-4 text-sm">
            <p>Student ID: TBT221234</p>
            <p>Branch: CSE</p>
            <p>
              Year / Sem: 4<sup>th</sup> year / 8<sup>th</sup> sem
            </p>
          </div>
        </div>
        <nav className="space-y-4">
          <NavLink
            to="/"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/10 ${
              location.pathname === "/" ? "border-b-2 border-white" : ""
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Profile
          </NavLink>
          <NavLink
            to="/internship"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/10 ${
              location.pathname === "/internship" ? "border-b-2 border-white" : ""
            }`}
          >
            <Briefcase className="h-5 w-5" />
            Internship
          </NavLink>
          <NavLink
            to="/job"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/10 ${
              location.pathname === "/job" ? "border-b-2 border-white" : ""
            }`}
          >
            <Briefcase className="h-5 w-5" />
            Job&apos;s
          </NavLink>
          <NavLink
            to="/notify"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/10 ${
              location.pathname === "/notify" ? "border-b-2 border-white" : ""
            }`}
          >
            <Bell className="h-5 w-5" />
            Notification
          </NavLink>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="mb-4">
          <div className="relative mx-auto h-40 w-40">
            <div className="absolute inset-0 rounded-full border-8 border-gray-700" />
            <div
              className="absolute inset-0 rounded-full border-8 border-blue-500"
              style={{
                clipPath: "polygon(0 0, 60% 0, 60% 100%, 0% 100%)",
                transform: "rotate(-90deg)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">60%</span>
              <span className="text-xs">Profile Completed</span>
            </div>
          </div>
        </div>
        <button onClick={handleLogout}  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
