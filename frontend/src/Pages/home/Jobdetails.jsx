import React, { useState } from "react";

const JobDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Web Designer",
      company: "Amazon Web Services",
      location: "Sita Burdi, Nagpur",
      employmentType: "Full-Time",
      description:
        "As a Web Developer at Amazon, you will collaborate with cross-functional teams to design, develop, and maintain Amazon’s web applications and services.",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "BeReal",
      location: "Nagpur, Maharashtra",
      employmentType: "Part-Time",
      description:
        "Collaborate with designers to craft intuitive user interfaces that solve real-world problems while improving user experience.",
    },
  ];

  const handleReadMore = (job) => {
    setSelectedJob(job);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded shadow-md hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500 mt-2">{job.location}</p>
            <button
              className="text-blue-500 mt-4 underline"
              onClick={() => handleReadMore(job)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {showPopup && selectedJob && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-auto shadow-lg transform transition-transform duration-300 translate-x-0">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={closePopup}
            >
              Close
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{selectedJob.company}</p>
            <p className="text-gray-600 mb-4">{selectedJob.description}</p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                <strong>Location:</strong> {selectedJob.location}
              </li>
              <li>
                <strong>Employment Type:</strong> {selectedJob.employmentType}
              </li>
            </ul>
            <button className="bg-blue-500 text-white px-4 py-2 mt-6 rounded hover:bg-blue-600">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
