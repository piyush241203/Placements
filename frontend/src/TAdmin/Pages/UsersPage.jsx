import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode"; // Fix incorrect import
import Header from "../Components/Header";
import Content from "../Components/Content";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { listUsersOfCollege } from "../../redux/userSlice";

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // St
  const { token, collegeUsers, status, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false); // Use ref to persist fetching state
  const [filterCriteria, setFilterCriteria] = useState({
    branch: "",
    cgpa: "",
    gender: "",
    semester: "",
    tenthPercent: "",
    twelfthPercent: "",
  });

  const onFilterChange = (newFilter) => {
    setFilterCriteria(newFilter);
  };

  
  useEffect(() => {
    if (token && !isFetching.current) {
      const fetchCollegeUsers = async () => {
        try {
          const decodedToken = jwtDecode(token);
          const collegeId = decodedToken.college;
  
          if (!collegeId) {
            toast.error("Invalid token or college ID missing");
            return;
          }
  
          isFetching.current = true; // Prevent concurrent fetches
          setLoading(true);
  
          await dispatch(listUsersOfCollege(collegeId)).unwrap();
        } catch (err) {
          toast.error(err || "Failed to fetch users");
        } finally {
          setLoading(false);
          isFetching.current = false; // Reset fetching state
        }
      };
  
      fetchCollegeUsers();
    }
  }, [dispatch, token]); // Minimize dependencies
  
  const filteredUsers = collegeUsers.filter((user) => {
    if (user.role === "tnp_admin") return false;

    // Apply filter criteria
    if (filterCriteria) {
      if (filterCriteria.branch && user.profile?.branch !== filterCriteria.branch) return false;
      if (filterCriteria.year && user.profile?.year !== filterCriteria.year) return false;
      if (filterCriteria.cgpa && user.profile?.academicRecords?.cgpa?.[0]?.semesters?.[0]?.cgpa < filterCriteria.cgpa) return false;
      if (filterCriteria.semester && user.profile?.semester !== filterCriteria.semester) return false;
      if (filterCriteria.tenthPercent && user.profile?.academicRecords?.twelfth?.percentage !== filterCriteria.tenthPercent) return false;
      if (filterCriteria.twelfthPercent && user.profile?.academicRecords?.tenth?.percentage !== filterCriteria.twelfthPercent) return false;
      if (filterCriteria.gender && user.profile?.gender !== filterCriteria.gender) return false;
    }

    return true;
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (token && !isFetching.current) {
        // Place API call logic here
      }
    }, 300); // Adjust delay as needed
  
    return () => clearTimeout(timeout);
  }, [token]);
  
  const handleUserClick = (userId) => {
    navigate(`/tadmin/userprofile/${userId}`); // Step 3: Navigate to UserProfile with userId
  };

  return (
    <div className="relative flex flex-col flex-1 bg-[#A3B5C0] min-h-screen rounded-l-[35px]">
      <Header filterCriteria={filterCriteria} onFilterChange={onFilterChange}/>
      <div className="flex justify-between mx-6 space-x-6">
      <div className="sticky flex">
                <h1 className="text-[28px] font-bold p-2  ml-7 text-[rgb(22,22,59)]">
                    Students
                </h1>
            </div>

        <div>
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-3xl hover:bg-blue-600 ">
                    Apply Now
                  </button>
                  <button className="px-6 py-3 bg-white border-[2px] border-gray-700 text-gray-700 font-medium rounded-3xl hover:border-black hover:font-semibold">
                    Contact
                  </button>
        </div>

                </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="flex justify-center p-6">
          {filteredUsers.length === 0 ? (
            <div className="text-center text-gray-600">
              No users found for this college.
            </div>
          ) : (
            <table className="w-full border-collapse bg-[#cdd9e156] backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#cdd9e1a7]">
                <tr>
                  <th className="text-left p-4 text-sm font-bold">Name</th>
                  <th className="text-left p-4 text-sm font-bold">College ID</th>
                  <th className="text-left p-4 text-sm font-bold">Branch</th>
                  <th className="text-left p-4 text-sm font-bold">Year/Sem</th>
                  <th className="text-left p-4 text-sm font-bold">CGPA</th>
                  <th className="text-left p-4 text-sm font-bold">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id} onClick={() => handleUserClick(user._id)} 
                    className={`${
                      index % 2 === 0 ? "bg-[#cdd9e165]" : ""
                    } hover:bg-[#ffffff82] hover:backdrop-blur-sm hover:shadow-lg cursor-pointer`}
                  >
                    <td className="flex items-center gap-2 p-3 border border-[#cdd9e1bc]">
                      <img src={user.profile?.profilePic} alt="img" className="w-10 h-10 mr-3 object-cover text-center font-semibold text-sm transition-all border-gray-300 hover:bg-opacity-20 hover:backdrop-blur-sm hover:bg-white text-red-400 rounded-3xl shadow-sm" />
                      {`${user.profile?.firstName || ""} ${user.profile?.lastName || ""}`}
                    </td>
                    <td className="p-3 border border-[#cdd9e1bc]">
                      {user.profile?.collegeID || "N/A"}
                    </td>
                    <td className="p-3 border border-[#cdd9e1bc]">
                      {user.profile?.branch || "N/A"}
                    </td>
                    <td className="p-3 border border-[#cdd9e1bc]">
                      {`${user.profile?.year || "N/A"}/${user.profile?.semester || "N/A"}`}
                    </td>
                    <td className="p-3 border border-[#cdd9e1bc]">
                      {user.profile?.academicRecords?.cgpa?.[0]?.semesters?.[0]?.cgpa || "N/A"}
                    </td>
                    <td className="p-3 border border-[#cdd9e1bc]">
                      {user.profile?.phoneNum || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;
