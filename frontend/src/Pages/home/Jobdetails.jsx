import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEligibleJobs } from "../../redux/jobSlice";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JobDetails = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getEligibleJobs());
  }, [dispatch]);

  const jobDetails = jobs.find((job) => job._id === jobId);

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!jobDetails) {
    return <p>No job details found.</p>;
  }

  const {
    title,
    description,
    company,
    location,
    type,
    eligibilityCriteria,
    totalApplications,
    createdAt,
  } = jobDetails;

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
            className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg"
          >
            <div className="relative h-full">
              <button
                onClick={() => window.history.back()}
                className="absolute right-4 top-4 p-2 text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <img
                      src={jobDetails.logo || "/placeholder-logo.png"}
                      alt="Company logo"
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{company}</h1>
                    <p className="text-lg text-gray-700">{title}</p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-800">Description:</h3>
                    <p className="text-gray-600">{description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-800">Location:</h3>
                      <p className="text-gray-600">{location}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Type:</h3>
                      <p className="text-gray-600">{type}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Applications:</h3>
                      <p className="text-gray-600">{totalApplications}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Posted On:</h3>
                      <p className="text-gray-600">
                        {new Date(createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Eligibility Criteria */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800">Eligibility Criteria:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Branches:</h4>
                      <p className="text-gray-600">
                        {eligibilityCriteria.branches.join(", ")}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Gender:</h4>
                      <p className="text-gray-600">{eligibilityCriteria.gender}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">CGPA:</h4>
                      <p className="text-gray-600">{eligibilityCriteria.cgpa}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Session:</h4>
                      <p className="text-gray-600">{eligibilityCriteria.session}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">JEE Score:</h4>
                      <p className="text-gray-600">{eligibilityCriteria.jeeScore}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">MHT CET Score:</h4>
                      <p className="text-gray-600">
                        {eligibilityCriteria.mhtCetScore}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">10th %:</h4>
                      <p className="text-gray-600">
                        {eligibilityCriteria.tenthPercentage}%
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">12th %:</h4>
                      <p className="text-gray-600">
                        {eligibilityCriteria.twelfthPercentage}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="mt-4">
                  <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600">
                    Apply Now
                  </button>
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
