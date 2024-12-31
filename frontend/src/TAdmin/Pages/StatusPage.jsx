// import Content from '../../Components/Content'
// import React, { useState } from 'react';
// import { NavLink } from "react-router-dom";
// import './StatusPage.css'
// import JobCard from '../../Components/JobCard';
// import { TbProgressCheck } from "react-icons/tb";

// const StatusPage = () => {
//     const [activeForm, setActiveForm] = useState('job');

//   return (
//     <div className='status-page'>
//         <div className="back-heading">
//             <h1 className="heading-main">Post's Status</h1>
//         </div>
//       <Content/>
//         <div className="status-outer-main">
//             <div className="job-intern-status">
//                 <NavLink
//                     to="#"
//                     className={`nav-post ${activeForm === 'job' ? "active-nav" : ""}`}
//                     onClick={() => setActiveForm('job')}
//                 >
//                     <TbProgressCheck className="icon" />
//                     <h2>Posted Job's</h2>
//                 </NavLink>
//                 <span></span>
//                 <NavLink
//                     to="#"
//                     className={`nav-post ${activeForm === 'internship' ? "active-nav" : ""}`}
//                     onClick={() => setActiveForm('internship')}
//                 >
//                     <TbProgressCheck className="icon" />
//                     <h2>Posted Internship's</h2>
//                 </NavLink>
//             </div>
//             {activeForm === 'job' && (
//                 <div><JobCard/>
//                 <JobCard/>
//                 <JobCard/>
//                 <JobCard/>
//                 <JobCard/>
//                 <JobCard/>
//                 <JobCard/>
//                 </div>
                
//             )}
    
//             {activeForm === 'internship' && (
//                 <div><JobCard/>
//                 <JobCard/>
//                 <JobCard/>
//                 <JobCard/>
//                 <JobCard/>
//                 </div>
//             )}
//         </div>
//     </div>
//   )
// }

// export default StatusPage


















import Content from '../Components/Content';
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import JobCard from '../Components/JobCard';
import { TbProgressCheck } from "react-icons/tb";

const StatusPage = () => {
    const [activeForm, setActiveForm] = useState('job');

    return (
        <div className="relative flex flex-col flex-1 bg-[#A3B5C0] min-h-screen rounded-l-[35px]">
            <div className="sticky flex items-center">
                <h1 className="text-[28px] font-bold p-2 mt-5 mb-3 ml-7 text-[rgb(22,22,59)] ">Post's Status</h1>
            </div>
            <Content />
            <div className="flex flex-col items-center w-full">
                <div className="flex items-center justify-evenly w-[92%] mb-5 mx-[40px]">
                    <NavLink
                        to="#"
                        className={`flex items-center gap-2 px-4 py-3 rounded-md overflow-hidden cursor-pointer h-[30px] border-b-2 ${activeForm === 'job' ? 'border-[#16163B]' : 'border-transparent'} hover:bg-[#5081A7]/40`}
                        onClick={() => setActiveForm('job')}
                    >
                        <TbProgressCheck className="text-[22px] text-[#16163B] font-extrabold" />
                        <h2 className="text-[20px] font-semibold text-[#16163B] ">Posted Job's</h2>
                    </NavLink>
                    <span className="h-[30px] w-[2px] rounded-full bg-[#215669]/75"></span>
                    <NavLink
                        to="#"
                        className={`flex items-center gap-2 px-4 py-3 rounded-md overflow-hidden cursor-pointer h-[30px] border-b-2 ${activeForm === 'internship' ? 'border-[#16163B]' : 'border-transparent'} hover:bg-[#5081A7]/40`}
                        onClick={() => setActiveForm('internship')}
                    >
                        <TbProgressCheck className="text-[22px] text-[#16163B] font-extrabold" />
                        <h2 className="text-[18px] font-semibold text-[#16163B] font-raleway">Posted Internship's</h2>
                    </NavLink>
                </div>
                {activeForm === 'job' && (
                    <div className=' w-full'>
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                    </div>
                )}

                {activeForm === 'internship' && (
                    <div className=' w-full'>
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                        <JobCard />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusPage;