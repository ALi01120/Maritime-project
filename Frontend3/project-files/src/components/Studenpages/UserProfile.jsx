import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../Auth';
import axios from 'axios';
import Nave from './Nave';
import '../userprofile.css';

const StudentProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [updateData, setUpdateData] = useState({
    username: '',
    email: '',
    gender: '',
    age: '',
  });
  const [image, setImage] = useState(null); // Separate state for the image
  const [successMessage, setSuccessMessage] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control update form visibility

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const profile = response.data.userProfile;
        setUserProfile(profile);
        setUpdateData({
          username: profile.username,
          email: profile.email,
          gender: profile.gender,
          age: profile.age,
        });
        if (profile.profile_image) {
          setImage(profile.profile_image); // Set image state if profile image exists
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (isAuthenticated()) {
      fetchProfile();
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('username', updateData.username);
      formData.append('email', updateData.email);
      formData.append('gender', updateData.gender);
      formData.append('age', updateData.age);

      // Only append the image if it's a File object
      if (image instanceof File) {
        formData.append('image', image);
      }

      const response = await axios.put('http://localhost:5000/api/auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Set content type for file upload
        }
      });
      console.log(response.data.message);
      setSuccessMessage('Profile updated successfully');
      window.location.reload(); // Reload the page after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files.length > 0) {
      setImage(files[0]); // Set image only if a file is selected
    } else {
      setUpdateData((prevData) => ({
        ...prevData,
        [name]: value, // Update other fields without resetting the image
      }));
    }
  };

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  return (
    <div>
      <Nave />
      <div className="user-profile-container">
        <div className="profile-info">
          <div className="profile-pic">
            {/* Display user profile picture */}
            {image && (
              <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="Profile" />
            )}
          </div>
          <div className="profile-details">
            {/* Display user information */}
            {userProfile && (
              <div>
                <p><strong>Username:</strong> {userProfile.username}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Gender:</strong> {userProfile.gender}</p>
                <p><strong>Age:</strong> {userProfile.age}</p>
              </div>
            )}
          </div>
        </div>
        <h3 className="update-heading">Update Profile</h3>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button className="update-button" onClick={toggleUpdateForm}>
          {showUpdateForm ? "Cancel Update" : "Update Profile"}
        </button>
        {showUpdateForm && (
          <div className="update-form-container">
            <form onSubmit={handleUpdate} className="update-form">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" value={updateData.username} onChange={handleChange} /><br />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={updateData.email} onChange={handleChange} /><br />
              <label htmlFor="gender">Gender:</label>
              <input type="text" id="gender" name="gender" value={updateData.gender} onChange={handleChange} /><br />
              <label htmlFor="age">Age:</label>
              <input type="text" id="age" name="age" value={updateData.age} onChange={handleChange} /><br />
              <label htmlFor="image">Profile Image:</label>
              <input type="file" id="image" name="image" onChange={handleChange} accept="image/*" /><br /> {/* Accept only image files */}
              <button type="submit">Update</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
