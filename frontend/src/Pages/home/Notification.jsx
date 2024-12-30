import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";

const NotificationPage = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Google Placement Drive",
      date: "2024-12-30",
      description:
        "Participate in the upcoming placement drive by Google. Don't miss it!",
    },
    {
      id: 2,
      title: "Microsoft Hackathon",
      date: "2024-12-28",
      description:
        "Register now for the Microsoft Hackathon to secure your future opportunities!",
    },
    {
      id: 3,
      title: "Amazon Tech Interviews",
      date: "2024-12-26",
      description:
        "Amazon is hosting a placement drive for software engineering roles.",
    },
  ]);

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        '<span style="color: #FF5733;">UPCOMING PLACEMENT DRIVE TGPCET 🎓 </span>',
        '<span style="color: #000000;">UPCOMING PLACEMENT DRIVE TGPCET 🎓</span>',
        '<span style="color: #b20487;">UPCOMING PLACEMENT DRIVE TGPCET 🎓</span>',
        '<span style="color: #0298db;">UPCOMING PLACEMENT DRIVE TGPCET 🎓</span>',
      ],
      typeSpeed: 100,
      backSpeed: 20,
      loop: true,
      backDelay: 1000,
    });

    return () => {
      typed.destroy(); // Clean up on component unmount
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Typing Animation Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          <span ref={el}></span>
        </h1>

        {/* Notifications */}
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg animate-fade-in"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {notification.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Date: {notification.date}
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                {notification.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;