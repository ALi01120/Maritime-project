import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Nave.css'; // Import CSS file

const Nave = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleLogout = () => {
        // Clear token from local storage
        localStorage.removeItem('token');
        // Redirect to index page
        navigate('/');
    };

    return (
        <nav id="vertical-navbar">
            <div className="navbar-content">
                <h1 className="navbar-title1">Maritime</h1>
                <ul id="navbar-links">
                    <li><a href="/Admin" className="nav-item">Home</a></li>
                    <li><a href="/Admin/Adminpage1" className="nav-item">Profile Management</a></li>
                    <li><a href="/Admin/Adminpage2" className="nav-item">Course Management</a></li>
                    <li><a href="/Admin/Adminpage3" className="nav-item">Create Course</a></li>
                    <li><a href="/Admin/Adminpage5" className="nav-item">Notification</a></li>
                </ul>
                <button id="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default Nave;
