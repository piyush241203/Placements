import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JobDetails = () => {
  const { jobId } = useParams(); // Get the jobId from the URL
  const [jobDetails, setJobDetails] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Web Designer",
      company: "Amazon Web Services",
      location: "Sita Burdi, Nagpur",
      employmentType: "Full-Time",
      description:
        "As a Web Developer at Amazon, you will collaborate with cross-functional teams to design, develop, and maintain Amazon’s web applications and services.",
      aboutCompany:
        "Amazon Web Services is a subsidiary of Amazon providing on-demand cloud computing platforms.",
      roleSummary:
        "Design, develop, and maintain web applications for Amazon Web Services.",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "BeReal",
      location: "Nagpur, Maharashtra",
      employmentType: "Part-Time",
      description:
        "Collaborate with designers to craft intuitive user interfaces that solve real-world problems while improving user experience.",
      aboutCompany:
        "BeReal is a social media company focused on real-time sharing.",
      roleSummary:
        "Work with teams to design user-friendly, innovative interfaces.",
    },
    // Additional jobs here
  ];

  useEffect(() => {
    const job = jobs.find((job) => job.id === parseInt(jobId)); // Find job by ID
    setJobDetails(job);
  }, [jobId]);

  if (!jobDetails) {
    return <p>Loading job details...</p>;
  }

  return (
    <AnimatePresence>
      {jobDetails && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => window.history.back()}
          />
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-xl bg-[#EDE5E5] p-6 shadow-lg"
          >
            <div className="relative h-full">
              <button
                onClick={() => window.history.back()}
                className="absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-orange-100">
                  <img
                    src="/amazon.jpg?height=48&width=48"
                    alt="Company logo"
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {jobDetails.company}
                  </h2>
                  <p className="text-lg">{jobDetails.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Location: {jobDetails.location}
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Apply
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-medium">Job Description:</h3>
                  <p className="text-sm text-muted-foreground">
                    {jobDetails.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Job Title:</h3>
                  <p className="text-sm text-muted-foreground">
                    {jobDetails.title}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Location:</h3>
                  <p className="text-sm text-muted-foreground">
                    {jobDetails.location}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Company:</h3>
                  <p className="text-sm text-muted-foreground">
                    {jobDetails.company}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Employment Type:</h3>
                  <p className="text-sm text-muted-foreground">
                    {jobDetails.employmentType}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">About {jobDetails.company}:</h3>
                  <p className="text-sm text-muted-foreground">
                    {jobDetails.aboutCompany}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Role Summary:</h3>
                  <p className="text-sm text-muted-foreground">
                    {jobDetails.roleSummary}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JobDetails;