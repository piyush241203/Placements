import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteUser, getProfileCompletionDetails } from "../../redux/userSlice";
import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSortAmountDown } from "react-icons/fa"; // Import a sorting icon
import debounce from "lodash.debounce";

const StatusSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { profileCompletionDetails, status, error } = useSelector(
    (state) => state.user
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const selectRef = useRef(null); // Ref to the select element
  const hasFetched = useRef(true);
  const sidebarRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Memoize the debounced fetchData function
  const fetchData = useCallback(
    debounce(() => {
      if (isOpen && !hasFetched.current) {
        setIsLoading(true);
        hasFetched.current = true; // Set the flag immediately
        dispatch(getProfileCompletionDetails()).finally(() => {
          setIsLoading(false);
        });
      }
    }, 300000), // 300ms delay
    [isOpen, dispatch]
  );

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, fetchData]);

  useEffect(() => {
    if (!isOpen) {
      hasFetched.current = false;
    }
  }, [isOpen]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        toast.success("User  deleted successfully!");
        window.location.reload(); // Refresh the page after successful deletion
      } catch (error) {
        toast.error(error.message || "Failed to delete user");
      }
    }
  };

  // Determine color based on profile completion percentage
  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return "text-green-600 bg-green-100";
    if (percentage >= 45) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  // Filter and sort profile completion details
  const filteredAndSortedDetails = profileCompletionDetails
    .filter((detail) =>
      detail.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.profileCompletion - b.profileCompletion;
      } else {
        return b.profileCompletion - a.profileCompletion;
      }
    });

  const handleSortButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed z-50 top-0 inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Profile Completion Status</h2>
        <div className="relative">
          <button
            onClick={handleSortButtonClick}
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaSortAmountDown className="text-gray-600" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <button
                onClick={() => handleSortOrderChange("asc")}
                className="block w-full px-4 py-2  text-left hover:bg-gray-100"
              >
                Sort by Completion (Ascending)
              </button>
              <button
                onClick={() => handleSortOrderChange("desc")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Sort by Completion (Descending)
              </button>
            </div>
          )}
        </div>

        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <AiOutlineClose className="text-xl" />
        </button>
      </div>
      <div className="p-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Sort Dropdown */}

        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader"></div>
            </div>
          ) : (
            <div>
              {filteredAndSortedDetails.map((detail) => (
                <div
                  key={detail.id}
                  className="flex justify-between items-center p-3 border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium">{detail.name}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm text-center font-semibold ${getCompletionColor(
                      detail.profileCompletion
                    )}`}
                  >
                    {detail.profileCompletion}%
                  </span>
                  <button
                    onClick={() => handleDelete(detail.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              ))}
              {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusSidebar;
