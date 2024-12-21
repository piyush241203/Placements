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

const HomePage = () => {
  // const jobCards = [
  //   {
  //     company: "Amazon",
  //     logo: "/amazon-logo.png",
  //     position: "Web Designer",
  //     postedTime: "6 h ago",
  //     tags: ["CSE/IT", "Full-Time", "Senior"],
  //     location: "Nagpur, Sita Burdi",
  //     workType: "Remote/Office",
  //     seatsRemaining: 20,
  //   },
  //   {
  //     company: "BeReal",
  //     logo: "/bereal-logo.png",
  //     position: "UI/UX Designer",
  //     postedTime: "2 d ago",
  //     tags: ["CSE", "Full-Time/Part-Time", "Middle"],
  //     location: "Nagpur, Mohagaon",
  //     workType: "Office",
  //     seatsRemaining: 2,
  //   },
  //   {
  //     company: "BeReal",
  //     logo: "/bereal-logo.png",
  //     position: "UI/UX Designer",
  //     postedTime: "5 d ago",
  //     tags: ["CSE", "Full-Time/Part-Time", "Middle"],
  //     location: "Nagpur, Mohagaon",
  //     workType: "Office",
  //     seatsRemaining: 0,
  //   },
  //   {
  //     company: "Amazon",
  //     logo: "/amazon-logo.png",
  //     position: "Web Designer",
  //     postedTime: "6 h ago",
  //     tags: ["CSE/IT", "Full-Time", "Senior"],
  //     location: "Nagpur, Sita Burdi",
  //     workType: "Remote/Office",
  //     seatsRemaining: 20,
  //   },
  // ];

  return <div>Home</div>;
};

export default HomePage;
