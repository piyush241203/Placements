import React from "react";
import { useState } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";

import { ChevronDown, SlidersHorizontal, Search } from "lucide-react";

export function JobData() {
  const [role, setRole] = useState("Web Designer UI/UX");
  const [location, setLocation] = useState("Nagpur");

  const jobCards = [
    {
      company: "Amazon",
      logo: "/logo/amazon.jpg",
      position: "Web Designer",
      postedTime: "6 h ago",
      tags: ["CSE/IT", "Full-Time", "Senior"],
      location: "Nagpur, Sita Burdi",
      workType: "Remote/Office",
      seatsRemaining: 20,
    },
    {
      company: "Phone Pay",
      logo: "/logo/phonepay.jpeg",
      position: "UI/UX Designer",
      postedTime: "2 d ago",
      tags: ["CSE", "Full-Time/Part-Time", "Middle"],
      location: "Nagpur, Mohagaon",
      workType: "Office",
      seatsRemaining: 2,
    },
    {
      company: "Google",
      logo: "/logo/google.png",
      position: "UI/UX Designer",
      postedTime: "5 d ago",
      tags: ["CSE", "Full-Time/Part-Time", "Middle"],
      location: "Nagpur, Mohagaon",
      workType: "Office",
      seatsRemaining: 0,
    },
    {
      company: "Tcs",
      logo: "/logo/tcs.jpeg",
      position: "Web Designer",
      postedTime: "6 h ago",
      tags: ["CSE/IT", "Full-Time", "Senior"],
      location: "Nagpur, Sita Burdi",
      workType: "Remote/Office",
      seatsRemaining: 20,
    },
  ];

  return (
    <main className="flex-1 p-6 bg-transparent">
      {/* Search Filter Bar */}
      <div className=" bg-gradient-to-b bg-transparent pb-4 pt-2 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-[#EDE5E5] backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-1 border-r pr-2">
              <span className="text-gray-700">{role}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-700">{location}</span>
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
      <div className="grid gap-4 md:grid-cols-2">
        {jobCards.map((job, index) => (
          <div
            className="relative p-4 bg-[#EDE5E5] shadow-sm rounded-lg"
            key={index}
          >
            {/* Favorite Button */}
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-red-500"
              aria-label="Favorite"
            >
              <FaHeart />
            </button>
            <div className="mb-4 flex items-start gap-4">
              {/* Company Logo */}
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="h-16 w-16 rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{job.position}</h3>
                <p className="text-sm text-gray-600">
                  in {job.company} • {job.postedTime}
                </p>
              </div>
            </div>
            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {job.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-slate-200 px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Location and Work Type */}
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
                {job.location}
              </span>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
                {job.workType}
              </span>
            </div>
            {/* Seats Remaining and Call to Action */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">• 3.5LPA - 5LPA</p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12">
                  <div
                    className="absolute inset-0 rounded-full border-4 border-gray-200"
                    style={{
                      clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                      transform: "rotate(-90deg)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-full border-4 border-blue-500"
                    style={{
                      clipPath: `polygon(0 0, ${job.seatsRemaining}% 0, ${job.seatsRemaining}% 100%, 0% 100%)`,
                      transform: "rotate(-90deg)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs">
                    {job.seatsRemaining}%
                  </div>
                </div>
                <a
                  href="/jobdetails"
                  className="inline-block mt-4 px-2 py-1 border border-gray-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
