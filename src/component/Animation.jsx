// AIAnimations.js
import React from 'react';
import '../component/AIAnimation.css'; // Import CSS for animations
import ai1 from '../assets/ai1.jpg';
import ai3 from '../assets/ai3.jfif';
import ai4 from '../assets/ai4.jfif';
import ai2 from '../assets/ai2.avif';
const images = [
  ai1, // Replace with your image paths
  ai2,
  ai3,
  ai4,
  // Add more images as needed
];

const AIAnimations = () => {
  return (
    <div className="animation-container">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={` `}
          className="animated-image"
        />
      ))}
    </div>
  );
};

export default AIAnimations;