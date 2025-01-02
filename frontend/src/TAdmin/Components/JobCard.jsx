// import React from "react";
// import { MdModeEdit } from "react-icons/md";
// import { FaRankingStar } from "react-icons/fa6";
// import { MdDeleteForever } from "react-icons/md";

// const JobCard = () => {
//   return (
//     <div className="flex flex-wrap gap-5 justify-center p-5 mx-10 mt-5">
//       <div className="w-[90%] min-w-[600px] h-[270px] bg-[#cdd9e156] backdrop-blur-[3px] shadow-md rounded-2xl overflow-hidden p-5 flex flex-col transition-all hover:bg-[#cdd9e1ab] hover:shadow-lg hover:cursor-pointer">
//         <div className="flex items-center px-4 mb-3 border-b-[1px] border-[#3c768a] pb-2 relative">
//           <img
//             src=""
//             alt={`Company Name logo`}
//             className="w-20 h-20 mr-5 rounded-xl object-contain"
//           />
//           <div className="flex-1">
//             <h2 className="text-[18px] font-medium text-[#16163b]">Company Name</h2>
//             <h4 className="text-[20px] font-bold text-[#16163b] my-[2px]">Job Title</h4>
//             <p className="text-[15px] text-[#16163b]">Location:</p>
//           </div>
//           <button className="absolute top-[0px] right-[10px] flex items-center gap-1 px-2 py-0.5 pr-3 bg-[#A6C0CF] shadow-xl text-[#16163b] border border-[#517488] rounded-xl text-[15px] font-medium hover:bg-[#80a7be]">
//             <FaRankingStar /> Create Rounds
//           </button>
//           <div className="absolute top-[35px] right-[0px] flex items-center gap-2">
//             <button className="flex items-center gap-1 px-2 py-0.5 pr-3 bg-[#A6C0CF] shadow-md text-[#16163b] border border-[#517488] rounded-xl text-[15px] font-medium hover:bg-[#80a7be]">
//               <MdModeEdit /> Edit
//             </button>
//             <button className="flex items-center gap-1 px-2 py-0.5 pr-3 bg-[#dd4d4d] shadow-md text-white border border-[#a52929] rounded-xl text-[15px] font-medium hover:bg-[#a52929]">
//               <MdDeleteForever /> Delete
//             </button>
//           </div>
//         </div>
//         <div className="px-4">
//           <p className="text-[15px] text-[#16163b] mb-1">Employment Type: job designation</p>
//           <h3 className="text-[17px] text-[#16163b] mb-[1px]">About (company/Job):</h3>
//           <p className="text-[15px] text-[#16163b]">Description</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobCard;














// import React from "react";
import React, { useState } from "react";
// import { MdModeEdit } from "react-icons/md";
import { FaRankingStar, FaUserCheck } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteJob } from "../../redux/jobSlice"; // Adjust the import path as needed
import { toast } from "react-toastify"; // Optional: For toast notifications

const JobCard = ({ job }) => {

    const dispatch = useDispatch();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleDelete = async () => {
        try {
          const resultAction = await dispatch(deleteJob(job._id));
          if (deleteJob.fulfilled.match(resultAction)) {
            toast.success("Job deleted successfully!");
            window.location.reload();
          } else {
            toast.error("Failed to delete the job!");
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
        setIsConfirmOpen(false); // Close the confirmation popup
    };


    const {
        title,
        description,
        company,
        location,
        type,
        logo
    } = job;

    return (
        <div className="flex flex-wrap gap-5 justify-center p-5 mx-10 mt-5">
            <div className="w-[90%] min-w-[600px] h-[270px] bg-[#cdd9e156] backdrop-blur-[3px] shadow-md rounded-2xl overflow-hidden p-5 flex flex-col transition-all hover:bg-[#cdd9e1ab] hover:shadow-lg hover:cursor-pointer">
                <div className="flex items-center px-4 mb-3 border-b-[1px] border-[#3c768a] pb-2 relative">
                    <img
                        src={logo || "default-logo.png"}
                        alt={`${company} logo`}
                        className="w-20 h-20 mr-5 rounded-xl object-contain"
                    />
                    <div className="flex-1">
                        <h2 className="text-[18px] font-medium text-[#16163b]">{company}</h2>
                        <h4 className="text-[20px] font-bold text-[#16163b] my-[2px]">{title}</h4>
                        <p className="text-[15px] text-[#16163b]">Location: {location}</p>
                    </div>
                    <button className="absolute top-[0px] right-[0px] flex items-center gap-1 px-2 py-0.5 pr-3 bg-[#A6C0CF] shadow-xl text-[#16163b] border border-[#517488] rounded-xl text-[15px] font-medium hover:bg-[#80a7be]">
                        <FaRankingStar /> Create Rounds
                    </button>
                    <div className="absolute top-[35px] right-[0px] flex items-center gap-2">
                        <button className="flex items-center gap-1 px-2 py-0.5 pr-3 bg-[#A6C0CF] shadow-md text-[#16163b] border border-[#517488] rounded-xl text-[15px] font-medium hover:bg-[#80a7be]">
                        <FaUserCheck /> Applied
                        </button>
                        <button className="flex items-center gap-1 px-2 py-0.5 pr-3 bg-[#dd4d4d] shadow-md text-white border border-[#a52929] rounded-xl text-[15px] font-medium hover:bg-[#a52929]"
                        onClick={() => setIsConfirmOpen(true)}>
                            <MdDeleteForever /> Delete
                        </button>
                    </div>
                </div>

                {isConfirmOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[#ffffff35] backdrop-blur-[6px] flex items-center justify-center z-50">
                        <div className=" rounded-[20px] border-[1px] border-[#9d9d9dbe] bg-[#ffffff52] backdrop-blur-[2px] shadow-xl px-5 pt-4 pb-6  w-[90%] max-w-[400px]">
                            <h2 className="text-[20px] font-bold text-[rgb(22,22,59)]">Confirm Delete</h2>
                            <p className="text-[rgb(22,22,59)] mt-1 mb-4 mx-3 font-semibold">Are you sure you want to delete this job?</p>
                            <div className="flex justify-end gap-4">
                            <button
                                className="bg-[#A6C0CF] shadow-lg px-4 py-1 rounded-xl font-bold text[rgb(22,22,59)] hover:bg-[#80a7be] border-[1px] border-[#517488]"
                                onClick={() => setIsConfirmOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#3e79a7] shadow-lg text-white font-bold px-4 py-1 rounded-xl hover:bg-[#21537a] "
                                onClick={handleDelete}
                            >
                                Confirm
                            </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="px-4">
                    <p className="text-[15px] text-[#16163b] mb-1">Employment Type: {type}</p>
                    <h3 className="text-[17px] text-[#16163b] mb-[1px]">About:</h3>
                    <p className="text-[15px] text-[#16163b]">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default JobCard;