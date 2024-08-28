import React from 'react';
import './supportPage.css'; // Import the CSS file for styling

const WhatsAppChat = () => {
    const phoneNumber = "+923046947163"; // Replace with your WhatsApp number (including country code)
    const message = "Hello, I need some help!"; // Replace with your custom message

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="whatsapp-float" onClick={handleClick}>
            <div className="sliding-text">Chat with us!</div>
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                alt="WhatsApp" 
                className="whatsapp-icon" 
            />
        </div>
    );
};

export default WhatsAppChat;
