import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEligibleJobs } from "../../redux/jobSlice"; // Adjust the path as necessary
import { Link } from "react-router-dom"; // Import Link
import { FaSearch } from "react-icons/fa";
import { ChevronDown, SlidersHorizontal, Search } from "lucide-react";

export function JobData() {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  // Fetch eligible jobs on component mount
  useEffect(() => {
    dispatch(getEligibleJobs());
  }, [dispatch]);

  return (
    <main className="flex-1 p-6 bg-transparent">
      {/* Search Filter Bar */}
      <div className="bg-gradient-to-b bg-transparent pb-4 pt-2 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-[#EDE5E5] backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-1 border-r pr-2">
              <span className="text-gray-700">Role</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-700">Location</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-6 py-2 bg-white rounded-full text-gray-700 font-medium shadow-sm hover:shadow transition-shadow">
              Search
            </button>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <SlidersHorizontal className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Job Cards */}
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">Error: {error.message}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.filter(job => job.type === "job").map((job) => (
            <div
              key={job._id}
              className="relative p-4 bg-[#D9D9D9] shadow-sm rounded-lg"
            >
              <div className="mb-4 flex items-start gap-4">
                {/* Company Logo */}
                <img
                  src={`${job.logo}`|| "default-logo.png"}// Update with your dynamic logo path
                  alt={`${job.company} logo`}
                  className="h-16 w-16 rounded-lg object-fill"
                />
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-600">
                    in {job.company} • {new Date(job.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {/* Job Description */}
              <p className="text-sm text-gray-700">{job.description}</p>
              {/* Tags and Location */}
              <div className="mb-4 flex flex-wrap gap-2 mt-2">
                {job.eligibilityCriteria.branches.length > 0 && (
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
                    {job.eligibilityCriteria.branches.join(", ")}
                  </span>
                )}
                <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
                  {job.location}
                </span>
              </div>
              {/* Eligibility Criteria */}
              <div className="mb-4 flex gap-2">
               <span className="bg-slate-200 px-3 py-1 text-sm">
                  CGPA: {job.eligibilityCriteria.cgpa || "NA"}
                </span>
                <span className ="bg-slate-200 px-3 py-1 text-sm">
                  JEE Score: {job.eligibilityCriteria.jeeScore || "NA"}
                </span>
                <span className="bg-slate-200 px-3 py-1 text-sm">
                  MHT CET Score: {job.eligibilityCriteria.mhtCetScore || "NA"}
                </span>
                <span className="bg-slate-200 px-3 py-1 text-sm">
                  10th %: {job.eligibilityCriteria.tenthPercentage || "NA"}
                </span>
                <span className="bg-slate-200 px-3 py-1 text-sm">
                  12th %: {job.eligibilityCriteria.twelfthPercentage || "NA"}
                </span>
                <span className="bg-slate-200 px-3 py-1 text-sm">
                  Semester Clear: {job.eligibilityCriteria.semesterClear ? "Yes" : "No"}
                </span>
              </div>
              {/* Call to Action */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Total Applications: {job.totalApplications}
                </p>
                <Link
                  to={`/job/${job._id}`}
                  className="inline-block mt-4 px-2 py-1 border border-gray-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
