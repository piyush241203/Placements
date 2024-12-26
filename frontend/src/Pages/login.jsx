import React, { useState } from "react";
import college from "../assets/college.png";
import harit from "../assets/harit.png";
import { FaUserCog } from "react-icons/fa";
import back from "../assets/back.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(state => state.user.loading);
  const {  error, user } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  // Redirect to /job after successful login
  if (user) {
    navigate("/job"); // Redirect to the job page if the user is logged in
  }

  return (
    <div className="bg-sky-300/20 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[rgb(22,22,59)] text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={college}
            alt="College Logo"
            className="h-20 w-[800px] ml-3 mr-4"
          />
        </div>
        <div className="flex items-center">
          <img
            src={harit}
            alt="Harit Tech Logo"
            className="h-20 w-[200px] mr-4"
          />
        </div>
      </header>

      <div className="flex justify-end p-3">
        <a
          href="#"
          className="text-gray-950 font-normal hover:text-blue-500 flex items-center group"
        >
          <FaUserCog className="mr-2 text-gray-950 font-semibold group-hover:text-blue-500" />
          Admin login
        </a>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center relative">
        {/* Background Image */}
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <img
            src={back}
            alt="Back"
            className="w-[1200px] h-full object-center"
          />
        </div>

        {/* Glassy Transparent Layer */}
        <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-sm -z-10"></div>

        {/* Login Card */}
        <form onSubmit={handleLogin} className="bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-3xl shadow-lg w-full max-w-md space-y-6 z-10">
          <div className="flex justify-center mb-4">
            <button className="font-bold border-b-2  border-black">
              Log in
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-3">
              Email or phone
            </label>
            <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Email"
               required
              className="w-full p-2 rounded bg-sky-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-2 rounded bg-sky-100"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            {/* Log In Button */}
            <button type="submit" disabled={loading} className="px-6 py-2 bg-sky-400 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">
            {loading ? "Loading..." : "Login"}
            </button>

            {/* Forgot password link */}
            <a
              href="#"
              className="text-gray-700 hover:text-blue-700 font-medium text-sm"
            >
              Forgot password?
            </a>
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </main>

      {/* Footer */}
      <footer className="px-3  py-4 bg-transparent justify-start items-start">
        <p className="text-xs ">
          Made by <span className="text-red-500 ">❤️</span>{" "}
          <span className="text-xs font-bold">Harit Tech Solution</span>
        </p>
      </footer>
    </div>
  );
};

export default Login;
