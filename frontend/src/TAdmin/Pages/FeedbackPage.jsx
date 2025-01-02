import React, { useState } from "react";
import Content from "../Components/Content";

const FeedbackPage = () => {
  const [notifications] = useState([
    {
      id: 1,
      name: "Piush Ninane",
      message:
        "Sir, I am Puish Niwane from CSE 1st year and I am facing an issue with my height, Bec...",
      time: "Today 10:55 am",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
    },
    {
      id: 2,
      name: "Piush Ninane",
      message:
        "Becoz of which no is accepting me everyone is rejecting me by seeing my height .........",
      time: "Sun 10:55 am",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
    },
    {
      id: 3,
      name: "Piush Ninane",
      message:
        "Becoz of which no is accepting me everyone is rejecting me by seeing my height .........",
      time: "Sun 10:55 am",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
    },
    {
      id: 4,
      name: "Piush Ninane",
      message:
        "Becoz of which no is accepting me everyone is rejecting me by seeing my height .........",
      time: "Sun 10:55 am",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
    },
    {
      id: 5,
      name: "Piush Ninane",
      message:
        "Becoz of which no is accepting me everyone is rejecting me by seeing my height .........",
      time: "Sun 10:55 am",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
    },
    {
      id: 6,
      name: "Piush Ninane",
      message:
        "Becoz of which no is accepting me everyone is rejecting me by seeing my height .........",
      time: "Sun 10:55 am",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
    },
    {
      id: 7,
      name: "Piush Ninane",
      message:
        "Becoz of which no is accepting me everyone is rejecting me by seeing my height .........",
      time: "Sun 10:55 am",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
    },
    {
      id: 8,
      name: "Piush Ninane",
      message:
        "Becoz of which no is accepting me everyone is rejecting me by seeing my height .........",
      time: "Sun 10:55 am",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
    },
  ]);

  return (
    <div className="relative flex flex-col flex-1 min-h-screen bg-[#A3B5C0] rounded-l-[35px]">
      <h1 className="text-[28px] font-bold p-2 mt-5 mb-3 ml-7 text-[rgb(22,22,59)]">
        User Feedback/Messages
      </h1>
      <Content />
      <h5 className="text-[22px] font-bold text-[rgb(22,22,59)] px-10 pb-2">Notifications</h5>
      <div className="w-[90%] h-[490px] mx-auto bg-transparent rounded-[20px] border border-[rgba(33,86,105,0.758)] p-5 shadow-lg overflow-y-auto scrollbar-hide">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center mb-4 p-3 bg-[#ffffff37] backdrop-blur-sm shadow-md rounded-[20px] hover:bg-[#ffffff71] cursor-pointer"
          >
            <img
              src={notification.avatar}
              alt="avatar"
              className="w-[52px] h-[52px] rounded-2xl mr-4"
            />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-[16px] text-[#333]">
                  {notification.name}
                </span>
                <span className="text-[13px] text-[#717171]">{notification.time}</span>
              </div>
              <div className="text-[15px] text-[#383838]">{notification.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
