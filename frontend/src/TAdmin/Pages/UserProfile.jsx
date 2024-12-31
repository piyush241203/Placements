import React from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import AcademicRecords from '../Components/AcademicRecords';
import UserStatus from '../Components/UserStatus';
import JobInternContent from '../Components/JobInternContent';

const PostsPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex flex-col flex-1 min-h-screen bg-[#A3B5C0] rounded-l-[35px]">
      <div className="sticky flex items-center">
        <button 
          className="ml-8 mt-5 p-1 rounded-full text-[28px] font-extrabold w-9 h-9 text-[#16163b] cursor-pointer hover:bg-[rgba(80,129,167,0.732)]"
          onClick={handleBackClick}
        >
          <IoChevronBackOutline />
        </button>
        <h1 className="text-[28px] font-bold mt-5 px-4 text-[#16163b] font-ralway">User Profile</h1>
      </div>
      <div className="relative flex flex-col w-[92%] ml-[4%]">
        <div className="relative flex items-center p-5">
          <div className="flex justify-center items-center w-[130px] h-[130px] border-l-[2px] border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[20px] overflow-hidden">
            <img src="" alt="User" className="w-[120px] h-[120px] object-contain rounded-[20px] p-1.5" />
          </div>
          <div className="relative flex flex-col w-[80%] h-full justify-evenly gap-1.5">
            <div className="flex items-center w-[80%]">
              <label className="text-[16px] font-bold ml-5 mt-2 text-[#16163b]">Student Name:</label>
              <h3 className="text-[14px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">Mahesh Hari Shinde</h3>
            </div>
            <div className="flex justify-start w-[80%]">
              <div className="flex items-center">
                <label className="text-[16px] font-bold ml-5 mt-2 text-[#16163b]">Student ID:</label>
                <h3 className="text-[14px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">TBT221234</h3>
              </div>
              <div className="flex items-center">
                <label className="text-[16px] font-bold ml-5 mt-2 text-[#16163b]">Branch:</label>
                <h3 className="text-[14px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">CSE</h3>
              </div>
            </div>
            <div className="flex justify-start w-[80%]">
              <div className="flex items-center">
                <label className="text-[16px] font-bold ml-5 mt-2 text-[#16163b]">Year/Sem:</label>
                <h3 className="text-[14px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">4th / 8th</h3>
              </div>
              <div className="flex items-center">
                <label className="text-[16px] font-bold ml-5 mt-2 text-[#16163b]">Phone no.:</label>
                <h3 className="text-[14px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">+91 9123456780</h3>
              </div>
            </div>
            <div className="flex justify-start w-[80%]">
              <div className="flex items-center">
                <label className="text-[16px] font-bold ml-5 mt-2 text-[#16163b]">E-mail:</label>
                <h3 className="text-[14px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">StudentPersonalID@gmail.com</h3>
              </div>
              <div className="flex items-center">
                <label className="text-[16px] font-bold ml-5 mt-2 text-[#16163b]">DOB:</label>
                <h3 className="text-[14px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">01.01.2001</h3>
              </div>
            </div>
            <div className="flex items-center w-[95%]">
              <label className="text-[16px] font-bold ml-5 mt-2 text-[#16163b]">Address:</label>
              <h3 className="text-[14px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">ABC apt. 001-A wing, near Big bazaar, Buti Buri, Nagpur- 400708</h3>
            </div>
          </div>
        </div>
        <div className="w-full h-[1.5px] rounded-[30px] my-7 bg-[rgba(33,86,105,0.758)]" />
        <AcademicRecords />
        <JobInternContent />
        <UserStatus />
      </div>
    </div>
  );
};

export default PostsPage;
