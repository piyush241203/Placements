// import React from "react";
// import { FiSearch, FiMapPin, FiSliders } from "react-icons/fi"; // Importing icons

// function Home() {
//   // Container styles
//   const containerStyle = {
//     display: "flex",
//     height: "100vh",
//     backgroundColor: "#b3bdc6", // Background color as per the image
//   };

//   // Left sidebar styles
//   const leftSideStyle = {
//     width: "30%",
//     height: "100%",
//     borderRadius: "0px",
//     backgroundColor: "darkblue",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingTop: "20px",
//   };

//   const logoStyle = {
//     width: "70%",
//     height: "auto",
//     marginBottom: "40px",
//   };

//   const uploadButtonStyle = {
//     width: "80px",
//     height: "80px",
//     borderRadius: "50%",
//     backgroundColor: "#4a5568",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "white",
//     fontSize: "30px",
//     cursor: "pointer",
//   };

//   // Vertical line separator
//   const lineStyle = {
//     width: "2px",
//     backgroundColor: "black",
//     height: "100%",
//   };

//   // Right section styles
//   const rightSectionStyle = {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     padding: "20px",
//     backgroundColor: "#b3bdc6", // Right section background
//   };

//   const searchBarContainer = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderRadius: "50px",
//     backgroundColor: "white",
//     padding: "10px 15px",
//     width: "90%",
//     margin: "0 auto", // Centering the search bar horizontally
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//   };

//   const inputStyle = {
//     display: "flex",
//     alignItems: "center",
//     border: "none",
//     outline: "none",
//     backgroundColor: "transparent",
//     fontSize: "16px",
//     marginRight: "10px",
//     flex: 1,
//   };

//   const searchButtonStyle = {
//     padding: "8px 15px",
//     borderRadius: "50px",
//     border: "none",
//     backgroundColor: "#fff",
//     color: "#333",
//     fontWeight: "bold",
//     cursor: "pointer",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//   };

//   const filterIconStyle = {
//     marginLeft: "10px",
//     fontSize: "20px",
//     cursor: "pointer",
//     color: "#333",
//   };

//   // Cards section styles
//   const cardsContainerStyle = {
//     display: "flex",
//     flexWrap: "wrap",
//     marginTop: "30px",
//     gap: "20px",
//     justifyContent: "center",
//   };

//   const cardStyle = {
//     backgroundColor: "#f9f9f9",
//     borderRadius: "10px",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
//     padding: "15px",
//     width: "250px",
//     textAlign: "center",
//     transition: "transform 0.3s ease",
//   };

//   const cardHoverStyle = {
//     transform: "scale(1.05)",
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Left Sidebar */}
//       <div style={leftSideStyle}>
//         <img src="/harit.png" alt="Logo" style={logoStyle} />
//         <label htmlFor="file-upload">
//           <div style={uploadButtonStyle}>
//             <span>+</span>
//           </div>
//           <input type="file" id="file-upload" style={{ display: "none" }} />
//         </label>
//       </div>

//       {/* Vertical Line */}
//       <div style={lineStyle}></div>

//       {/* Right Section */}
//       <div style={rightSectionStyle}>
//         {/* Search Bar */}
//         <div style={searchBarContainer}>
//           <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
//             <FiSearch style={{ marginRight: "10px", color: "#666" }} />
//             <input
//               type="text"
//               placeholder="Web Designer UI/UX"
//               style={inputStyle}
//             />
//             <span style={{ margin: "0 10px", color: "#ccc" }}>|</span>
//             <FiMapPin style={{ marginRight: "10px", color: "#666" }} />
//             <input type="text" placeholder="Nagpur" style={inputStyle} />
//           </div>
//           <button style={searchButtonStyle}>Search</button>
//           <FiSliders style={filterIconStyle} />
//         </div>

//         {/* Cards Section */}
//         <div style={cardsContainerStyle}>
//           <div
//             style={cardStyle}
//             onMouseOver={(e) =>
//               (e.currentTarget.style.transform = "scale(1.05)")
//             }
//             onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <h4>Card Title 1</h4>
//             <p>Card content placeholder</p>
//           </div>
//           <div
//             style={cardStyle}
//             onMouseOver={(e) =>
//               (e.currentTarget.style.transform = "scale(1.05)")
//             }
//             onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <h4>Card Title 2</h4>
//             <p>Another card content</p>
//           </div>
//           <div
//             style={cardStyle}
//             onMouseOver={(e) =>
//               (e.currentTarget.style.transform = "scale(1.05)")
//             }
//             onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <h4>Card Title 3</h4>
//             <p>More card content here</p>
//           </div>
//           <div
//             style={cardStyle}
//             onMouseOver={(e) =>
//               (e.currentTarget.style.transform = "scale(1.05)")
//             }
//             onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <h4>Card Title 4</h4>
//             <p>Additional card information</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React from "react";

import { Heart, LayoutDashboard, LogOut, Briefcase, Bell } from "lucide-react";

const HomePage = () => {
  const jobCards = [
    {
      company: "Amazon",
      logo: "/amazon-logo.png",
      position: "Web Designer",
      postedTime: "6 h ago",
      tags: ["CSE/IT", "Full-Time", "Senior"],
      location: "Nagpur, Sita Burdi",
      workType: "Remote/Office",
      seatsRemaining: 20,
    },
    {
      company: "BeReal",
      logo: "/bereal-logo.png",
      position: "UI/UX Designer",
      postedTime: "2 d ago",
      tags: ["CSE", "Full-Time/Part-Time", "Middle"],
      location: "Nagpur, Mohagaon",
      workType: "Office",
      seatsRemaining: 2,
    },
    {
      company: "BeReal",
      logo: "/bereal-logo.png",
      position: "UI/UX Designer",
      postedTime: "5 d ago",
      tags: ["CSE", "Full-Time/Part-Time", "Middle"],
      location: "Nagpur, Mohagaon",
      workType: "Office",
      seatsRemaining: 0,
    },
    {
      company: "Amazon",
      logo: "/amazon-logo.png",
      position: "Web Designer",
      postedTime: "6 h ago",
      tags: ["CSE/IT", "Full-Time", "Senior"],
      location: "Nagpur, Sita Burdi",
      workType: "Remote/Office",
      seatsRemaining: 20,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-200">
      {/* Sidebar */}
      <div className="flex w-84 flex-col bg-[#0B1829] text-white">
        <div className="p-4">
          <img
            src="/harit.png"
            alt="College logo"
            width={300}
            height={80}
            className="mb-8"
          />
          <div className="mb-8 text-center">
            <div className="mb-4 inline-block overflow-hidden rounded-full bg-white">
              <img
                src="/placeholder.svg"
                alt="Profile picture"
                width={120}
                height={120}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-2xl">Hii, Mahesh!</h2>
            <p className="text-sm text-gray-400">
              Your job is waiting for you!...
            </p>
            <div className="mt-4 text-sm">
              <p>Student ID: TBT221234</p>
              <p>Branch: CSE</p>
              <p>
                Year / Sem: 4<sup>th</sup> year / 8<sup>th</sup> sem
              </p>
            </div>
          </div>
          <nav className="space-y-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/10"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/10"
            >
              <Briefcase className="h-5 w-5" />
              Internship
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg border-b-2 border-white px-4 py-2 hover:bg-white/10"
            >
              <Briefcase className="h-5 w-5" />
              Job&apos;s
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/10"
            >
              <Bell className="h-5 w-5" />
              Notification
            </a>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="mb-4">
            <div className="relative mx-auto h-40 w-40">
              <div className="absolute inset-0 rounded-full border-8 border-gray-700" />
              <div
                className="absolute inset-0 rounded-full border-8 border-blue-500"
                style={{
                  clipPath: "polygon(0 0, 60% 0, 60% 100%, 0% 100%)",
                  transform: "rotate(-90deg)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">60%</span>
                <span className="text-xs">Profile Completed</span>
              </div>
            </div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-8 flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
          <div className="h-5 w-5 text-gray-400">🔍</div>
          <input
            className="flex-1 border-0"
            placeholder="Search jobs..."
            type="search"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {jobCards.map((job) => (
            <div
              className="relative p-4 bg-white shadow-sm rounded-lg"
              key={job.company}
            >
              <button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
              >
                <Heart className="h-5 w-5" />
              </button>
              <div className="mb-4 flex items-start gap-4">
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{job.position}</h3>
                  <p className="text-sm text-gray-600">
                    in {job.company} • {job.postedTime}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-200 px-3 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
                  {job.location}
                </span>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
                  {job.workType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">• 3.5LPA- 5LPA</p>
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
                        clipPath: `polygon(0 0, ${
                          (job.seatsRemaining / 100) * 100
                        }% 0, ${
                          (job.seatsRemaining / 100) * 100
                        }% 100%, 0% 100%)`,
                        transform: "rotate(-90deg)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs">
                      {job.seatsRemaining}%
                    </div>
                  </div>
                  <button className="font-semibold text-blue-600">
                    Read more...
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
