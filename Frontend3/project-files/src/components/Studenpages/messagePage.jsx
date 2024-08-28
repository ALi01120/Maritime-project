import React from 'react';
import './messagetPage.css'; // Import the CSS file for styling

const CustomChatButton = () => {
    const phoneNumber = "+923046947163"; // Replace with your WhatsApp number (including country code)
    const message = "Hello, I need some help!"; // Replace with your custom message

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="custom-chat-float" onClick={handleClick}>
            <div className="custom-sliding-text">Ask Qustion!</div>
            <button className="custom-chat-button">Start Chat with Teacher</button>
        </div>
    );
};

export default CustomChatButton;
