import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
// import Content from "../../Components/Content";
import "./PostsPage.css";
import { MdLibraryAdd } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { createJob } from "../../../redux/jobSlice";
import ReactQuill from "react-quill"; // Import react-quill
import "react-quill/dist/quill.snow.css"; // Import quill styles

const PostsPage = () => {
  const [activeForm, setActiveForm] = useState("job");
  const [step, setStep] = useState(1); // Step 1: Form, Step 2: Filters

  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "", 
    location: "",
    type: "", // Default to job
    jobDate: "",
    eligibilityCriteria: {
      branch: [],
      gender: "",
      cgpa: "",
      session: "",
      tenthPercentage: "",
      twelfthPercentage: "",
      polyPercentage: "",
      currentBacklogs: 0,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.jobs);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFormData((prev) => ({
      ...prev,
      eligibilityCriteria: {
        branch: [],
        gender: "",
        cgpa: "",
        session: "",
        tenthPercentage: "",
        twelfthPercentage: "",
        polyPercentage: "",
        currentBacklogs: 0,
      },
    }));
    toast.info("Filters cleared!");
  };

  // const handleFormChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => {
      const values = new Set(prev.eligibilityCriteria[name]);
      if (values.has(value)) {
        values.delete(value);
      } else {
        values.add(value);
      }
      return {
        ...prev,
        eligibilityCriteria: {
          ...prev.eligibilityCriteria,
          [name]: Array.from(values),
        },
      };
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleNext = () => {
    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.jobDate
    ) {
      toast.error("Please fill all required fields!");
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    console.log("Sending data to backend:", formData); // Log the data being sent
    dispatch(createJob(formData))
      .unwrap()
      .then(() => {
        toast.success("Post created successfully!");
        navigate("/tadmin/status", { state: { jobCreated: true } });
      })
      .catch((error) => {
        toast.error(`Error: ${error.message || "Failed to create post"}`);
      });
  };

  return (
    <div className="posts">
      <h1 className="heading-main">Internship/Job Posting</h1>
      {/* <Content /> */}
      <div className="outer-main">
        <div className="job-intern-main">
          {/* <NavLink
            to="#"
            className={`nav-post ${activeForm === "job" ? "active-nav" : ""}`}
            onClick={() => setActiveForm("job")}
          > */}
            {/* <MdLibraryAdd className="icon" /> */}
            <h2><MdLibraryAdd className="icon" /> Add Post's</h2>
          {/* </NavLink> */}
        </div>

        {/* {activeForm === "job" && ( */}
          <div className="job-main">
            <div className="job-info">
              {/* <div className="job-logo-wrapper">
                {formData.jobLogo ? (
                  <img
                    src={URL.createObjectURL(formData.jobLogo)}
                    alt="Job Logo"
                    className="job-logo"
                  />
                ) : (
                  <label htmlFor="job-logo-input" className="add-logo-icon">
                    <MdOutlineAddPhotoAlternate />
                  </label>
                )}
                <input
                  type="file"
                  id="job-logo-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  className='job-logo-input'
                />
              </div> */}
              <div className="job-name-role">
                <div className="company-name">
                  <label>Company Name:</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter Company Name"
                  />
                </div>
                <div className="job-name">
                  <label>Job Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter Job Title"
                  />
                </div>
                <div className="job-des-loc">
                  <label>Type:</label>
                   <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="flex-1 py-1 px-2 border-b-2 border-[#215669C1] rounded-md bg-transparent text-[rgb(22,22,59)] focus:outline-none placeholder-[#215669C1] focus:border-[rgb(22,22,59)]"
                  >
                    <option value="">Select Type</option>
                    <option value="job">Job</option>
                    <option value="Internship">Internship</option>
                  </select>
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter Job Location"
                  />

                  {/* <div className="form-group"> */}
                  <label>Date:</label>
                  <input
                    type="date"
                    name="jobDate"
                    value={formData.jobDate}
                    onChange={handleInputChange}
                  />
                  {/* </div> */}

                </div>
                {/* <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="jobDate"
                    value={formData.jobDate}
                    onChange={handleInputChange}
                  />
                </div> */}
              </div>
            </div>
            <div className="job-desc">
              <label>Job Description:</label>
              <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Enter Job Description"
                className="job-description"
                theme="snow"
              />
            </div>

            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        {/* )} */}


        {step === 2 && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-btn z-50" onClick={() => setShowPopup(false)}>×</button>
              <div className="popup-header">
                {/* <button className="close-btn" onClick={() => setShowPopup(false)}>×</button> */}
                <h2>Filtration</h2>
              </div>

              {/* Filtration form here */}
              <div className="filter-group">
                <label>Branches:</label>
                {["CSE", "IT", "Aero", "Bio", "Mech", "EE", "ECE"].map(
                  (branch) => (
                    <button
                      key={branch}
                      className={
                        formData.eligibilityCriteria.branch.includes(branch)
                          ? "selected"
                          : ""
                      }
                      onClick={() => handleMultiSelect("branch", branch)}
                    >
                      {branch}
                    </button>
                  )
                )}
              </div>

              <div className="filter-group">
                <label>Gender:</label>
                {["Male", "Female"].map((gender) => (
                  <button
                    key={gender}
                    className={
                      formData.eligibilityCriteria.gender.includes(gender)
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleMultiSelect("gender", gender)}
                  >
                    {gender}
                  </button>
                ))}
              </div>

              <div className="filter-group">
                <label>Session:</label>
                {["2023-2024", "2024-2025", "2025-2026"].map((sem) => (
                  <button
                    key={sem}
                    className={
                      formData.eligibilityCriteria.session.includes(sem)
                        ? "selected"
                        : ""
                    }
                    onClick={() => handleMultiSelect("session", sem)}
                  >
                    {sem}
                  </button>
                ))}
              </div>

              <div className="filter-group">
                <label>CGPA:</label>
                <input
                  type="number"
                  name="cgpa"
                  value={formData.eligibilityCriteria.cgpa}
                  onChange={handleInputChange}
                  placeholder="Enter Min CGPA needed"
                  min="1"
                  max="10"
                  step="0.1"
                  onInput={(e) => {
                    if (e.target.value > 10) e.target.value = 10;
                    if (e.target.value < 0) e.target.value = 0;
                  }}
                />
              </div>

              <div className="filter-group">
                <label>10th %:</label>
                <input
                  type="number"
                  name="tenthPercentage"
                  value={formData.eligibilityCriteria.tenthPercentage}
                  onChange={handleInputChange}
                  placeholder="Enter Min 10th % needed"
                  min="1"
                  max="100"
                  onInput={(e) => {
                    if (e.target.value > 100) e.target.value = 100;
                    if (e.target.value < 0) e.target.value = 0;
                  }}
                />
              </div>

              <div className="filter-group">
                <label>12th %:</label>
                <input
                  type="number"
                  name="twelfthPercentage"
                  value={formData.eligibilityCriteria.twelfthPercentage}
                  onChange={handleInputChange}
                  placeholder="Enter Min 12th % needed"
                  min="1"
                  max="100"
                  onInput={(e) => {
                    if (e.target.value > 100) e.target.value = 100;
                    if (e.target.value < 0) e.target.value = 0;
                  }}
                />
              </div>

              <div className="filter-group">
                <label>Poly %:</label>
                <input
                  type="number"
                  name="polyPercentage"
                  value={formData.eligibilityCriteria.polyPercentage}
                  onChange={handleInputChange}
                  placeholder="Enter Min Poly % needed"
                  min="1"
                  max="100"
                  onInput={(e) => {
                    if (e.target.value > 100) e.target.value = 100;
                    if (e.target.value < 0) e.target.value = 0;
                  }}
                />
              </div>

              <div className="filter-group">
                <label>Previous Backlogs:</label>
                <input
                  type="number"
                  name="currentBacklogs"
                  value={formData.eligibilityCriteria.currentBacklogs}
                  onChange={handleInputChange}
                  placeholder="Enter Previous Backlogs"
                  onInput={(e) => {
                    if (e.target.value > 100) e.target.value = 100;
                    if (e.target.value < 0) e.target.value = 0;
                  }}
                />
              </div>

              <div className="filter-group">
                <label>Current Backlogs:</label>
                <input
                  type="number"
                  name="currBacklogs"
                  value={formData.eligibilityCriteria.currentBacklogs}
                  onChange={handleInputChange}
                  placeholder="Enter Current Backlogs"
                  onInput={(e) => {
                    if (e.target.value > 100) e.target.value = 100;
                    if (e.target.value < 0) e.target.value = 0;
                  }}
                />
              </div>
              {/* 
              <div className="filter-group">
                <label>Required Skills:</label>
                <input
                  type="text"
                  name="skills"
                  value={filters.skills}
                  onChange={handleInputChange}
                  placeholder="Enter Skills need"
                />
              </div> */}

              <div className="filter-actions">
                <button onClick={clearFilters}>Clear</button>
                <button onClick={handleSubmit} disabled={loading}>
                  {" "}
                  {loading ? "Creating..." : "Apply"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
