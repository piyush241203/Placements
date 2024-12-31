import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import Content from '../../Components/Content';
import './PostsPage.css';
import { MdLibraryAdd } from "react-icons/md";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const PostsPage = () => {
  const [activeForm, setActiveForm] = useState('job');
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState({
    branches: [],
    gender: [],
    semester: [],
    cgpa: '',
    min10th: '',
    min12th: '',
    minPoly: '',
    prevBacklogs: '',
    currBacklogs: '',
    skills: ''
  });

  const [formData, setFormData] = useState({
    companyName: '',
    jobName: '',
    jobDesignation: '',
    jobLocation: '',
    jobDescription: '',
    internshipName: '',
    jobLogo: null, // To store the uploaded image file
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, jobLogo: file });
    }
  };

  const handleNextClick = (classifier) => {
    const data = {
      classifier,
      ...formData,
    };
    console.log('Next button clicked with data:', data);

    setShowPopup(true);
  };

  const handleMultiSelect = (name, value) => {
    setFilters((prevState) => {
      const values = new Set(prevState[name]);
      if (values.has(value)) values.delete(value);
      else values.add(value);
      return { ...prevState, [name]: Array.from(values) };
    });
  };

  const applyFilters = () => {
    console.log('Filters applied:', filters);
  };

  const clearFilters = () => {
    setFilters({
      branches: [],
      gender: [],
      semester: [],
      cgpa: '',
      min10th: '',
      min12th: '',
      minPoly: '',
      prevBacklogs: '',
      currBacklogs: '',
      skills: ''
    });
  };

  return (
    <div className='posts'>
      <h1 className='heading-main'>Internship/Job Posting</h1>
      <Content />
      <div className="outer-main">
        <div className="job-intern-main">
          <NavLink
            to="#"
            className={`nav-post ${activeForm === 'job' ? "active-nav" : ""}`}
            onClick={() => setActiveForm('job')}
          >
            <MdLibraryAdd className="icon" />
            <h2>Add Job's</h2>
          </NavLink>
          <span></span>
          <NavLink
            to="#"
            className={`nav-post ${activeForm === 'internship' ? "active-nav" : ""}`}
            onClick={() => setActiveForm('internship')}
          >
            <MdLibraryAdd className="icon" />
            <h2>Add Internship</h2>
          </NavLink>
        </div>

        {activeForm === 'job' && (
          <div className="job-main">
            <div className="job-info">
              <div className="job-logo-wrapper">
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
              </div>
              <div className="job-name-role">
                <div className="company-name">
                  <label>Company Name:</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleFormChange}
                    placeholder="Enter Company Name"
                  />
                </div>
                <div className="job-name">
                  <label>Job Title:</label>
                  <input
                    type="text"
                    name="jobName"
                    value={formData.jobName}
                    onChange={handleFormChange}
                    placeholder="Enter Job Title"
                  />
                </div>
                <div className="job-des-loc">
                  <label>Designation:</label>
                  <input
                    type="text"
                    name="jobDesignation"
                    value={formData.jobDesignation}
                    onChange={handleFormChange}
                    placeholder="Enter Job Designation"
                  />
                  <label>Location:</label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleFormChange}
                    placeholder="Enter Job Location"
                  />
                </div>
              </div>
            </div>
            <div className="job-desc">
              <label>Job Description:</label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleFormChange}
                placeholder="Enter Job Description"
                className="job-description"
              ></textarea>
            </div>
            <button className='next-button' onClick={() => handleNextClick('job')}>Next</button>
          </div>
        )}

        {activeForm === 'internship' && (
          <div className="job-main">
            <div className="job-info">
              <div className="job-logo-wrapper">
                {formData.jobLogo ? (
                  <img
                    src={URL.createObjectURL(formData.jobLogo)}
                    alt="Internship Logo"
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
                />
              </div>
              <div className="job-name-role">
                <div className="company-name">
                  <label>Company Name:</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleFormChange}
                    placeholder="Enter Company Name"
                  />
                </div>
                <div className="job-name">
                  <label>Internship Title:</label>
                  <input
                    type="text"
                    name="internshipName"
                    value={formData.internshipName}
                    onChange={handleFormChange}
                    placeholder="Enter Internship Title"
                    className='internship-name'
                  />
                </div>
                <div className="job-des-loc">
                  <label>Designation:</label>
                  <input
                    type="text"
                    name="jobDesignation"
                    value={formData.jobDesignation}
                    onChange={handleFormChange}
                    placeholder="Enter Internship Designation"
                  />
                  <label>Location:</label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleFormChange}
                    placeholder="Enter Internship Location"
                  />
                </div>
              </div>
            </div>
            <div className="job-desc">
              <label>Internship Description:</label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleFormChange}
                placeholder="Enter Internship Description"
                className="job-description"
              ></textarea>
            </div>
            <button className="next-button" onClick={() => handleNextClick('internship')}>Next</button>
          </div>
        )}

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
                <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
                <div className='popup-header'>
                    {/* <button className="close-btn" onClick={() => setShowPopup(false)}>×</button> */}
                    <h2>Filtration</h2>
                </div>
              
              {/* Filtration form here */}
              <div className="filter-group">
                <label>Branches:</label>
                {['CSE', 'IT', 'Aero', 'Bio', 'Mech', 'EE', 'ECE'].map((branch) => (
                  <button
                    key={branch}
                    className={filters.branches.includes(branch) ? 'selected' : ''}
                    onClick={() => handleMultiSelect('branches', branch)}
                  >
                    {branch}
                  </button>
                ))}
              </div>

              <div className="filter-group">
                <label>Gender:</label>
                {['Male', 'Female'].map((gender) => (
                  <button
                    key={gender}
                    className={filters.gender.includes(gender) ? 'selected' : ''}
                    onClick={() => handleMultiSelect('gender', gender)}
                  >
                    {gender}
                  </button>
                ))}
              </div>

              <div className="filter-group">
                <label>Semester:</label>
                {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map((sem) => (
                  <button
                    key={sem}
                    className={filters.semester.includes(sem) ? 'selected' : ''}
                    onClick={() => handleMultiSelect('semester', sem)}
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
                  value={filters.cgpa}
                  onChange={handleInputChange}
                  placeholder='Enter Min CGPA needed'
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
                  name="min10th"
                  value={filters.min10th}
                  onChange={handleInputChange}
                  placeholder='Enter Min 10th % needed'
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
                  name="min12th"
                  value={filters.min12th}
                  onChange={handleInputChange}
                  placeholder='Enter Min 12th % needed'
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
                  name="minPoly"
                  value={filters.minPoly}
                  onChange={handleInputChange}
                  placeholder='Enter Min Poly % needed'
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
                  name="prevBacklogs"
                  value={filters.prevBacklogs}
                  onChange={handleInputChange}
                  placeholder='Enter Previous Backlogs'
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
                  value={filters.currBacklogs}
                  onChange={handleInputChange}
                  placeholder='Enter Current Backlogs'
                  onInput={(e) => {
                    if (e.target.value > 100) e.target.value = 100; 
                    if (e.target.value < 0) e.target.value = 0;    
                  }}
                />
              </div>

              <div className="filter-group">
                <label>Required Skills:</label>
                <input
                  type="text"
                  name="skills"
                  value={filters.skills}
                  onChange={handleInputChange}
                  placeholder="Enter Skills need"
                />
              </div>

              <div className="filter-actions">
                <button onClick={clearFilters}>Clear</button>
                <button onClick={applyFilters}>Apply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;


