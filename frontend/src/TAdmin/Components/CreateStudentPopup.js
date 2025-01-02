import React from "react";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import animationData from "./newStudent.json";
import { ClipLoader } from "react-spinners";
import { FaTimes, FaUserPlus, FaEnvelope, FaLock } from "react-icons/fa";

const CreateStudentPopup = ({
  isOpen,
  onClose,
  onCreateStudent,
  status,
  error,
  createdStudent,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCreate = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    onCreateStudent({ email, password });
  };

  React.useEffect(() => {
    if (status === "succeeded" && createdStudent) {
      toast.success(
        `Student ${createdStudent.email} created successfully!` ||
          `Student Created Successfully!`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else if (status === "failed") {
      toast.error(error || "Failed to create student", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [status, error, createdStudent]);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    onClose();
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed top-0 z-50 left-0 w-full h-full bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-8 rounded-lg w-1/2 max-w-md shadow-lg ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUserPlus className="mr-2 text-blue-500" />
            Create New Student
          </h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={handleClose}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <form>
          <div className="mb-6">
            <label className="flex text-gray-700 text-sm font-bold mb-2  items-center">
              <FaEnvelope className="mr-2 text-blue-500" />
              Email
            </label>
            <input
              type="email"
              className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter student email"
            />
          </div>
          <div className="mb-6">
            <label className="flex text-gray-700 text-sm font-bold mb-2  items-center">
              <FaLock className="mr-2 text-blue-500" />
              Password
            </label>
            <input
              type="password"
              className="shadow appearance-none border  border-gray-400 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter student password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 flex items-center"
              onClick={handleCreate}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <ClipLoader size={20} color="#ffffff" className="mr-2" />
              ) : null}
              {status === "loading" ? "Creating..." : "Create Student"}
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
        {status === "succeeded" && createdStudent && (
          <div className="mt-6 text-center">
            <Lottie
              options={{
                animationData: animationData,
                loop: false,
                autoplay: true,
              }}
              height={100}
              width={100}
            />
            <p className="text-gray-600">Email: {createdStudent.email}</p>
          </div>
        )}
        {status === "failed" && error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default CreateStudentPopup;