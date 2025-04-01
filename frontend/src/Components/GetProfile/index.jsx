import React, { useContext, useEffect, useState } from 'react';
import './get.css'; // Import CSS module
import { GovernomentContext } from '../Context/GovernorateContext';
import axios from 'axios';
import image from "../../images/no-profile-picture-icon.webp"

export default function GetProfile() {
  let {getProfile, notify, GOVERNORATE_REGIONS, 
    governorate, setGovernorate, 
    region, setRegion} = useContext(GovernomentContext);
  const storedProfileData = localStorage.getItem('ProfileData');
  const parsedProfileData = storedProfileData ? JSON.parse(storedProfileData) : null;
  const [errormsg, setErrormsg] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    governorate: "",
    region: "",
    phoneNumber: "",
  });
  const handleGovernorateChange = (e) => {
    setGovernorate(e.target.value);
    setRegion(""); // Reset region when governorate changes
  }
  // Update state when input changes
  function getData(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
   // Call getProfile only once when the component mounts
   const initProfile = async () => {
    setLoading(true);
    try {
      await getProfile();
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    initProfile(); // Ensure it only runs once when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  // Handle profile update
  async function updateProfile(e) {
    e.preventDefault();
    setIsEditing(true);
    setLoading(true);
    try {
      const res = await axios.put("http://localhost:5000/api/profile", user);
      notify(res.data.message);
      setIsEditing(false);
      await getProfile(); // Refresh profile data after update
    } catch (err) {
      console.error(err);
      setErrormsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="profile-page">
        <main className="main-content">
          <div className="profile-grid">
            <div className="profile-info">
              <div className="card fade-in">
                <div className="card-header">
                  <h2><i class="fa-solid fa-user me-3"></i>Profile Information</h2>
                  {isEditing === false ? (
                    <button 
                    className="edit-button" 
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  ): <button 
                  className="cancel-button fw-bold" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel Editing <i class="ms-2 fa-regular fa-circle-xmark"></i>
                </button>}
                </div>
                <div className="card-body">
                  <form onSubmit={updateProfile}>
                    <div className="form-group">
                      <label htmlFor="id">ID</label>
                      <input
                        readOnly
                        value={parsedProfileData?._id}
                        id="id"
                        name="id"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        disabled={!isEditing}
                        value={user.firstName || parsedProfileData?.firstName}
                        onChange={getData}
                        type="text"
                        id="firstName"
                        name="firstName"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        disabled={!isEditing}
                        value={user.lastName || parsedProfileData?.lastName}
                        onChange={getData}
                        type="text"
                        id="lastName"
                        name="lastName"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        disabled
                        value={user.email || parsedProfileData?.email}
                        onChange={getData}
                        type="email"
                        id="email"
                        name="email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <input
                        disabled
                        value={user.role || parsedProfileData?.role}
                        onChange={getData}
                        type="text"
                        id="role"
                        name="role"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        disabled
                        value={user.phoneNumber || parsedProfileData?.phoneNumber}
                        onChange={getData}
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="governorate">Governorate</label>
                      {!isEditing ? (
                        <input
                        disabled
                        value={parsedProfileData?.governorate}
                        type="text"
                        id="governorate"
                        name="governorate"
                      />
                      ): <select
                      id="governorate"
                      className="form-select"
                      value={governorate}
                      name='governorate'
                      onChange={(e) => {
                        handleGovernorateChange(e) 
                        getData(e)}}
                    >
                      <option value="">-- Select Governorate --</option>
                      {Object.keys(GOVERNORATE_REGIONS).map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="region">Region</label>
                      {!isEditing ? (
                      <input
                      disabled
                      value={parsedProfileData?.region}
                      type="text"
                      id="region"
                      name="region"
                      />             
                      ): <select
                      id="region"
                      className="form-select"
                      value={region}
                      name='region'
                      onChange={(e) => {
                        setRegion(e.target.value)
                        getData(e)
                      }}
                      disabled={!governorate} // Disable if no governorate is selected
                    >
                      <option value="">-- Select Region --</option>
                      {governorate &&
                        GOVERNORATE_REGIONS[governorate].map((reg) => (
                          <option key={reg} value={reg}>
                            {reg}
                          </option>
                        ))}
                    </select>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        disabled
                        value="56 Abu Bakr Al-Kabeer, Madinet Nasr, Cairo"
                        type="text"
                        id="address"
                        name="address"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="servicesOffered">Services Offered</label>
                      <input
                        disabled
                        value="Plumbing"
                        type="text"
                        id="servicesOffered"
                        name="servicesOffered"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="experienceAndSkills">Experience and Skills</label>
                      <textarea
                        disabled
                        value="Professional Plumber with 5 years of experience"
                        id="experienceAndSkills"
                        name="experienceAndSkills"
                      ></textarea>
                    </div>
                    {loading ? (
                      <div className="spinner-border text-white" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ): <button 
                    type="submit" 
                    className="save-button"
                    onClick={() => setIsEditing(false)} // Disable inputs on save
                  >
                    Save Changes
                  </button>}
                  </form>
                </div>
              </div>
            </div>

            <div className="reviews">
              <div className="card fade-in">
                <div className="card-header">
                  <h3>Reviews</h3>
                </div>
                <div className="card-body">
                  <div className="review fade-in">
                    <div className="review-header">
                      <div className="rating">
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                      </div>
                      <img src={image} alt="Review" className="review-image" />
                    </div>
                    <p>This is a sample review text.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}