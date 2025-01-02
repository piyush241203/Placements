import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, Bell, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, logoutUser, resetState, getProfileCompletionDetails } from "../redux/userSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Sidebar = () => {
  const { token, user, profileCompletionDetails } = useSelector((state) => state.user); // Use profileCompletionDetails from Redux state
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => { 
    // Fetch user data if token exists and user data is not already fetched
    if (token && !user?.profile) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT token to get user ID
        const userId = decoded.id;

        // Dispatch fetchUserById to get the user data
        dispatch(fetchUserById(userId));
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, [token, dispatch, user?.profile]); // Dependency array now includes user.profile to avoid re-fetching if already available

  useEffect(() => {
    // Fetch profile completion details if not already present
    if (profileCompletionDetails.length === 0) {
      dispatch(getProfileCompletionDetails());
    }
  }, [dispatch, profileCompletionDetails]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // Dispatch the logout action
      dispatch(resetState()); // Reset the Redux state
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Calculate the progress based on profileCompletion
  const profileCompletion = profileCompletionDetails?.profileCompletion || 0; // Default to 0 if not available

  return (
    <div className=" sticky top-0 flex w-84 flex-col  bg-transparent text-[rgb(192,192,192)] h-[120vh]">
      <div className="p-4">
        <img
          src="/harit.png"
          alt="College logo"
          width={300}
          height={80}
          className="mb-8"
        />
        <div className=" text-white p-2 rounded-lg flex items-center space-x-4">
          <img
            src={user?.profile?.profilePic || "/placeholder.svg"}
            alt="Profile picture of a student"
            className="w-28 h-28 rounded-full object-cover"
          />
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-bold">Branch :</span>{" "}
              {user?.profile?.branch}
            </p>
            <p className="text-sm">
              <span className="font-bold">Student ID :</span>{" "}
              {user?.profile?.collegeID}
            </p>
            <p className="text-sm">
              <span className="font-bold">Year / Sem :</span>{" "}
              {user?.profile?.year} year / {user?.profile?.semester} sem
            </p>
          </div>
        </div>
        <div className=" justify-center mt-3 font-semibold text-start p-2 items-center space-y-1 mb-3">
          <h2 className="text-2xl">Hii, {user?.profile?.firstName}!</h2>
          <p className="text-sm text-gray-400">
            Your job is waiting for you!...
          </p>
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
              location.pathname === "/internship"
                ? "border-b-2 border-white"
                : ""
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
            Help
          </NavLink>
        </nav>

        <div className="mb-4 mt-12 ">
          <div className="relative mx-auto h-40 w-40 transform hover:scale-105 transition-transform duration-200">
            {/* Background Circle */}
            <div className="absolute inset-0 rounded-full border-[2px] border-gray-600 bg-gray-200" />
            {/* Progress Circle with Glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  rgba(99, 102, 241, 1) 0%,
                  rgba(99, 102, 241, 1) ${profileCompletion}%,
                  #e5e7eb ${profileCompletion}%,
                  #e5e7eb 100%
                )`,
                clipPath: "circle(50% at 50% 50%)",
                boxShadow: "0px 0px 10px rgba(99, 102, 241, 0.8)",
              }}
            />
            {/* Inner Circle */}
            <div className="absolute inset-[10%] rounded-full border-[2px] border-gray-600 bg-gray-200 shadow-lg" />
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-sky-600">{profileCompletion}%</span>
              <span className="text-xs font-semibold text-gray-600 tracking-wide">
                Profile Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4">
        {/* circle */}
        <div className="px-3 py-4 bg-transparent justify-start items-start">
          <p className="text-xs">
            Made by <span className="text-red-500">❤️</span>{" "}
            <span className="text-xs font-bold">Harit Tech Solution</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
