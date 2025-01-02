import React from "react";
import { FaEnvelope, FaUser  } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";

export const NotificationPage = () => {
  return (
    <div
      id="webcrumbs"
      className="font-roboto flex justify-center min-h-screen items-center p-4 bg-gradient-to-b bg-[#A3B5C0]"
    >
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 animate-fadeIn border border-gray-100">
        <form className="space-y-6">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="font-title font-bold font-serif text-4xl text-sky-800 flex items-center justify-center gap-2">
              <FaEnvelope className="text-sky-600 pl-2 " /> Help Request Form
            </h1>
            <p className="text-gray-600 mt-2 text-xs">Please fill out the form below to request a massage.</p>
          </div>

          {/* Form Fields */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* First Name */}
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your first name"
                />
                <FaUser  className="absolute top-3.5 left-3 text-gray-400" />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your last name"
                />
                <FaUser  className="absolute top-3.5 left-3 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                placeholder="Your email address"
              />
              <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
            </div>
          </div>

          {/* Massage Details */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1">
              Massage Details
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
              placeholder="Describe your massage needs..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-sky-700 hover:shadow-lg "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationPage;