import React from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";

export const NotificationPage = () => {
  return (
    <div
      id="webcrumbs"
      className="font-roboto flex justify-center min-h-screen items-center p-4 border-2 border-gray-600"
    >
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8 animate-fadeIn border-2 border-sky-600">
        <form className="space-y-6">
          <h1 className="font-title font-bold text-2xl text-neutral-950 flex items-center gap-2">
            <FaEnvelope className="text-primary-500" /> Massage Request Form
          </h1>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-neutral-950">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="border border-primary-500 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                  placeholder="Your first name"
                />
                <FaUser className="absolute top-3 left-3 text-primary-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-neutral-950">
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="border border-primary-500 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                  placeholder="Your last name"
                />
                <FaUser className="absolute top-3 left-3 text-primary-500" />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-neutral-950">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="border border-primary-500 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                placeholder="Your email address"
              />
              <FaEnvelope className="absolute top-3 left-3 text-primary-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-neutral-950">
              Massage Details
            </label>

            <textarea
              id="message"
              name="message"
              rows="4"
              className="border border-primary-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
              placeholder="Describe your massage needs..."
            ></textarea>
          </div>
          <button
            type="submit"
            className=" bg-sky-500 bg-primary-500 text-primary-50 text-lg font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-xl hover:bg-primary-600 transition-transform transform hover:scale-105 animate-bounce"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationPage;
