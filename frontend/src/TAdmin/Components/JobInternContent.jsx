import React, { useState } from 'react';

const JobInternContent = ({appliedJobsHistory}) => {
    const [showMoreJobs, setShowMoreJobs] = useState(false);
    const [showMoreInternships, setShowMoreInternships] = useState(false);

    if (!appliedJobsHistory) return null;

    // const jobs = appliedJobsHistory.filter(item => item.jobId.type === "job");
    // const internships = appliedJobsHistory.filter(item => item.jobId.type === "internship");

    const jobs = appliedJobsHistory.filter(item => item.jobId && item.jobId.type === "job");
    const internships = appliedJobsHistory.filter(item => item.jobId && item.jobId.type === "internship");

    const { job } = appliedJobsHistory;

    return (
        // <div className="flex justify-between">
        //     <div className="w-[48%]">
        //         <h2 className="text-[22px] mt-7  font-semibold  mb-2 text-gray-700">Job :</h2>
        //         <div className="p-5 bg-[#ffffff38] backdrop-blur-sm shadow-md rounded-2xl w-full max-h-[500px] overflow-y-auto scrollbar-hide">
        //             {(showMoreJobs ? jobs : jobs.slice(0, 3)).map((job) => (
        //                 <div key={job.jobId._id} className="mb-5 p-3 relative bg-[#ffffff38] backdrop-blur-md shadow-md rounded-2xl w-full ">
        //                     <div className="flex items-center">
        //                         <img
        //                             src={job.jobId.logo || "https://via.placeholder.com/50"}
        //                             alt="company-logo"
        //                             className="w-[50px] h-[50px] rounded-md mr-2"
        //                         />
        //                         <div>
        //                             <h3 className='text-[17px] font-medium'>{job.jobId.company}</h3>
        //                             <p className='text-[16px] font-normal'>{job.jobId.title}</p>
        //                         </div>
        //                         <button className="ml-auto bg-[#A6C0CF] text-text-[rgb(22,22,59)] border border-[#84a7bb] rounded-xl px-3 py-1 shadow-md hover:bg-[#84a7bb]">Remove</button>
        //                     </div>
        //                     <div className="mt-2 text-[14px]">
        //                         <p><strong>Job Title:</strong> {job.jobId.title}</p>
        //                         <p><strong>Location:</strong> {job.jobId.location}</p>
        //                         <p><strong>Employment Type:</strong> {job.jobId.type}</p>
        //                         <p><strong>About:</strong> {job.jobId.description}</p>
        //                     </div>
        //                     {/* {job.selected && <span className="text-green-600 font-bold text-xl absolute bottom-1 right-2">&#10003;</span>} */}
        //                      <span className="text-green-600 font-bold text-xl absolute bottom-1 right-2">&#10003;</span>
        //                 </div>
        //             ))}
        //             <p
        //                 onClick={() => setShowMoreJobs(!showMoreJobs)}
        //                 className="text-[rgb(64,64,148)] text-center cursor-pointer mt-2 hover:underline"
        //             >
        //                 {showMoreJobs ? "See less..." : "See more..."}
        //             </p>
        //         </div>
        //         <p className="mt-1 ml-2 text-[rgb(64,64,148)]">Applied {jobs.filter((job) => job.selected).length}/{jobs.length}</p>
        //     </div>

        //     <div className="w-[48%]">
        //         <h2 className="text-[22px] mt-7 mb-2  font-semibold  text-gray-700">Internship :</h2>
        //         <div className="p-5 bg-[#ffffff38] backdrop-blur-sm shadow-md rounded-2xl w-full max-h-[500px] overflow-y-auto scrollbar-hide">
        //             {(showMoreInternships ? internships : internships.slice(0, 3)).map((internship) => (
        //                 <div key={job.jobId._id} className="mb-5 p-3 relative bg-[#ffffff38] backdrop-blur-md shadow-md rounded-2xl w-full">
        //                     <div className="flex items-center">
        //                         <img
        //                             src={job.jobId.logo ||"https://via.placeholder.com/50"}
        //                             alt="company-logo"
        //                             className="w-12 h-12 rounded-md mr-2"
        //                         />
        //                         <div>
        //                             <h3 className='text-[17px] font-medium'>{job.jobId.company}</h3>
        //                             <p className='text-[16px] font-normal'>{job.jobId.title}</p>
        //                         </div>
        //                         <button className="ml-auto bg-[#A6C0CF] text-[rgb(22,22,59)] border border-[#84a7bb] rounded-lg px-3 py-1 shadow-md hover:bg-[#84a7bb] ">Remove</button>
        //                     </div>
        //                     <div className="mt-2 text-[14px]">
        //                         <p><strong>Job Title:</strong> {job.jobId.title}</p>
        //                         <p><strong>Location:</strong> {job.jobId.location}</p>
        //                         <p><strong>Employment Type:</strong> {job.jobId.type}</p>
        //                         <p><strong>About:</strong> {job.jobId.description}</p>
        //                     </div>
        //                     {/* {internship.selected && <span className="text-green-600 font-bold text-xl absolute bottom-1 right-2">&#10003;</span>} */}
        //                    <span className="text-green-600 font-bold text-xl absolute bottom-1 right-2">&#10003;</span>
        //                 </div>
        //             ))}
        //             <p
        //                 onClick={() => setShowMoreInternships(!showMoreInternships)}
        //                 className="text-[rgb(64,64,148)] text-center cursor-pointer mt-2 hover:underline"
        //             >
        //                 {showMoreInternships ? "See less..." : "See more..."}
        //             </p>
        //         </div>
        //         <p className="mt-1 ml-2 text-[rgb(64,64,148)]">Applied {internships.filter((intern) => intern.selected).length}/{internships.length}</p>
        //     </div>
        // </div>
        <div className="flex justify-between">
            <div className="w-[48%]">
                <h2 className="text-[22px] mt-7 font-semibold mb-2 text-gray-700">Job :</h2>
                <div className="p-5 bg-[#ffffff38] backdrop-blur-sm shadow-md rounded-2xl w-full max-h-[500px] overflow-y-auto scrollbar-hide">
                    {(showMoreJobs ? jobs : jobs.slice(0, 3)).map((job) => (
                        <div key={job.jobId._id} className="mb-5 p-3 relative bg-[#ffffff38] backdrop-blur-md shadow-md rounded-2xl w-full">
                            <div className="flex items-center">
                                <img
                                    src={job.jobId.logo || "https://via.placeholder.com/50"}
                                    alt="company-logo"
                                    className="w-[50px] h-[50px] rounded-md mr-2"
                                />
                                <div>
                                    <h3 className="text-[17px] font-medium">{job.jobId.company}</h3>
                                    <p className="text-[16px] font-normal">{job.jobId.title}</p>
                                </div>
                                <button className="ml-auto bg-[#A6C0CF] text-text-[rgb(22,22,59)] border border-[#84a7bb] rounded-xl px-3 py-1 shadow-md hover:bg-[#84a7bb]">Remove</button>
                            </div>
                            <div className="mt-2 text-[14px]">
                                <p><strong>Job Title:</strong> {job.jobId.title}</p>
                                <p><strong>Location:</strong> {job.jobId.location}</p>
                                <p><strong>Employment Type:</strong> {job.jobId.type}</p>
                                <p><strong>About:</strong> {job.jobId.description}</p>
                            </div>
                            <span className="text-green-600 font-bold text-xl absolute bottom-1 right-2">&#10003;</span>
                        </div>
                    ))}
                    <p
                        onClick={() => setShowMoreJobs(!showMoreJobs)}
                        className="text-[rgb(64,64,148)] text-center cursor-pointer mt-2 hover:underline"
                    >
                        {showMoreJobs ? "See less..." : "See more..."}
                    </p>
                </div>
                <p className="mt-1 ml-2 text-[rgb(64,64,148)]">Applied {jobs.filter((job) => job.selected).length}/{jobs.length}</p>
            </div>

            <div className="w-[48%]">
                <h2 className="text-[22px] mt-7 mb-2 font-semibold text-gray-700">Internship :</h2>
                <div className="p-5 bg-[#ffffff38] backdrop-blur-sm shadow-md rounded-2xl w-full max-h-[500px] overflow-y-auto scrollbar-hide">
                    {(showMoreInternships ? internships : internships.slice(0, 3)).map((internship) => (
                        <div key={internship.jobId._id} className="mb-5 p-3 relative bg-[#ffffff38] backdrop-blur-md shadow-md rounded-2xl w-full">
                            <div className="flex items-center">
                                <img
                                    src={internship.jobId.logo || "https://via.placeholder.com/50"}
                                    alt="company-logo"
                                    className="w-12 h-12 rounded-md mr-2"
                                />
                                <div>
                                    <h3 className="text-[17px] font-medium">{internship.jobId.company}</h3>
                                    <p className="text-[16px] font-normal">{internship.jobId.title}</p>
                                </div>
                                <button className="ml-auto bg-[#A6C0CF] text-[rgb(22,22,59)] border border-[#84a7bb] rounded-lg px-3 py-1 shadow-md hover:bg-[#84a7bb]">Remove</button>
                            </div>
                            <div className="mt-2 text-[14px]">
                                <p><strong>Job Title:</strong> {internship.jobId.title}</p>
                                <p><strong>Location:</strong> {internship.jobId.location}</p>
                                <p><strong>Employment Type:</strong> {internship.jobId.type}</p>
                                <p><strong>About:</strong> {internship.jobId.description}</p>
                            </div>
                            <span className="text-green-600 font-bold text-xl absolute bottom-1 right-2">&#10003;</span>
                        </div>
                    ))}
                    <p
                        onClick={() => setShowMoreInternships(!showMoreInternships)}
                        className="text-[rgb(64,64,148)] text-center cursor-pointer mt-2 hover:underline"
                    >
                        {showMoreInternships ? "See less..." : "See more..."}
                    </p>
                </div>
                <p className="mt-1 ml-2 text-[rgb(64,64,148)]">Applied {internships.filter((intern) => intern.selected).length}/{internships.length}</p>
            </div>
        </div>
    );
};

export default JobInternContent;
