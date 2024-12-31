import React from 'react'
// import './ProfilePage.css'

const ProfilePage = () => {
    return (
        <div className="relative flex flex-col flex-1 bg-[#A3B5C0] min-h-screen rounded-l-[35px]">
            <h2 className='text-[28px] font-bold p-2 mt-5 mb-3 ml-7 text-[rgb(22,22,59)]'>Admin Profile</h2>
            <div className="relative p-3 mt-2 ml-10 flex flex-col w-[92%] h-full gap-1.5">
                <div className=' flex '>
                    <img
                        src=""
                        alt={`Company Name logo`}
                        className="w-[150px] h-[150px] ml-10 mr-5 rounded-[20px] object-contain"
                    />
                    <div className=' text-center'>
                            <h3 className="text-[22px] font-bold ml-2  px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[8px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">Mahesh Harikant Shinde</h3>
                
                        <div className="flex items-center mt-4">
                            <label className="text-[18px] font-bold ml-5 text-[#16163b]">E-mail:</label>
                            <h3 className="text-[16px] font-medium ml-2  px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">StudentPersonalID@gmail.com</h3>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-10 w-[100%]">
                    <label className="text-[20px] font-bold ml-5 mt-2 text-[#16163b]">College Name:</label>
                    <h3 className="text-[18px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">ABC apt. 001-A wing, near Big bazaar, Buti Buri, Nagpur- 400708</h3>
                </div>
                <div className="flex items-center w-[100%]">
                    <label className="text-[18px] font-bold ml-5 mt-2 text-[#16163b]">Address:</label>
                    <h3 className="text-[16px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">ABC apt. 001-A wing, near Big bazaar, Buti Buri, Nagpur- 400708</h3>
                </div>
                <div className="flex items-center w-[100%]">
                    <label className="text-[18px] font-bold ml-5 mt-2 text-[#16163b]">Status:</label>
                    <h3 className="text-[16px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">Active</h3>
                </div>
                <div className="flex justify-start w-[80%]">
                    <div className="flex items-center">
                        <label className="text-[18px] font-bold ml-5 mt-2 text-[#16163b]">Start Date:</label>
                        <h3 className="text-[16px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">01.01.2025</h3>
                    </div>
                    <div className="flex items-center">
                        <label className="text-[18px] font-bold ml-5 mt-2 text-[#16163b]">End Date:</label>
                        <h3 className="text-[16px] font-medium ml-2 mt-2 px-6 py-1 border-b-[2px] border-[rgba(33,86,105,0.758)] rounded-[5px] bg-gradient-to-b from-transparent via-transparent to-[rgba(141,168,178,0.868)] text-[#16163b]">01.03.2025</h3>
                    </div>
                </div>
            </div>
            <div className='w-[92%] flex justify-around px-20 mt-14'>
                <button className=" bg-[#A6C0CF] text-[rgb(22,22,59)] font-medium border-2 border-[#668699] rounded-xl px-4 py-1 shadow-md hover:bg-[#84a7bb] ">Contact Us</button>
                <button className=" bg-[#A6C0CF] text-[rgb(22,22,59)] font-medium border-2 border-[#668699] rounded-xl px-4 py-1 shadow-md hover:bg-[#84a7bb] ">Renew</button>
            </div>

        </div>
    )
}

export default ProfilePage
