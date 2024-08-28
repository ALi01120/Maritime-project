import React from 'react';
import Nave from './Nave';
import './AdminDashboard.css';
import WhatsAppChat from '../supportPage';

const AdminDashboard = () => {
    return (
        <div>
            <Nave />
            <div className="main-content">
                <h2>Welcome to the Maritime Study & Job Portal Admin Dashboard</h2>
                <p>
                    As an administrator, you have full control over the Maritime Study & Job Portal. Use this dashboard to manage users, courses, and communications effectively. Below are quick access links to various functionalities that will help you streamline your administrative tasks.
                </p>
                <p>
                    Whether you need to update user profiles, create new courses, or view and manage student messages, everything you need is just a click away. Explore the sections below to get started.
                </p>
                <div className="quick-access">
                    <div className="quick-access-item">
                        <a href="/Admin/Adminpage1" className="quick-access-link">Profile Management</a>
                        <p>View and update user profiles, including personal details and roles.</p>
                    </div>
                    <div className="quick-access-item">
                        <a href="/Admin/Adminpage3" className="quick-access-link">Create Course</a>
                        <p>Design and create new courses for the maritime studies program.</p>
                    </div>
                    <div className="quick-access-item">
                        <a href="/Admin/Adminpage2" className="quick-access-link">View Courses</a>
                        <p>Browse and manage existing courses, including updates and deletions.</p>
                    </div>
                    
                    <div className="quick-access-item">
                        <a href="/Admin/Adminpage5" className="quick-access-link">Notifications</a>
                        <p>Send and manage notifications to keep users informed about important updates.</p>
                    </div>
                </div>
                <p>
                    For any additional support or inquiries, please contact our support team or refer to the help documentation available within the portal. We are here to assist you in ensuring a smooth and efficient management experience.
                </p>
            </div>
            <WhatsAppChat/>
        </div>
    );
}

export default AdminDashboard;
