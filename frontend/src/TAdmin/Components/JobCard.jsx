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














import React from "react";
import { MdModeEdit } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

const JobCard = ({ job }) => {
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
                    <button className="absolute top-[0px] right-[10px] flex items-center gap-1 px-2 py-0.5 pr-3 bg-[#A6C0CF] shadow-xl text-[#16163b] border border-[#517488] rounded-xl text-[15px] font-medium hover:bg-[#80a7be]">
                        <FaRankingStar /> Create Rounds
                    </button>
                    <div className="absolute top-[35px] right-[0px] flex items-center gap-2">
                        <button className="flex items-center gap-1 px-2 py-0.5 pr-3 bg-[#A6C0CF] shadow-md text-[#16163b] border border-[#517488] rounded-xl text-[15px] font-medium hover:bg-[#80a7be]">
                            <MdModeEdit /> Edit
                        </button>
                        <button className="flex items-center gap-1 px-2 py-0.5 pr-3 bg-[#dd4d4d] shadow-md text-white border border-[#a52929] rounded-xl text-[15px] font-medium hover:bg-[#a52929]">
                            <MdDeleteForever /> Delete
                        </button>
                    </div>
                </div>
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
