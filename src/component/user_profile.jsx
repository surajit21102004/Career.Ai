// UserProfile.js
import '../../src/index.css';
import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react'; // Import the User icon

const randomNames = [
  "Suman Mondal",
  "Aisha Khan",
  "Rajesh Sharma",
  "Priya Das",
  "Anil Gupta",
  "Sofia Malik",
  "Vikram Singh",
  "Nisha Patel",
  "Karan Yadav",
  "Riya Verma",
  "Arjun Mehta",
  "Deepika Rao",
  "Mohammed Ali",
  "Sneha Iyer",
  "Kajal Joshi",
  "Tanvi Bhatia",
  "Rahul Kumar",
  "Aarav Malhotra",
  "Pooja Nair",
  "Rohan Desai"
];

const RandomNameDisplay = () => {
  const [currentName, setCurrentName] = useState(randomNames[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % randomNames.length);
      setCurrentName(randomNames[index]);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="flex justify-center items-center text-white mt-10">
      <div className={`transition-opacity duration-700 ${currentName ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-2xl font-semibold flex items-center">
          <User className="mr-2" size={24} /> {/* User icon with margin */}
          {currentName} just explored their Career.Ai !
        </p>
        <p className="text-lg">Book a slot for personalized guidance!</p>
      </div>
    </div>
  );
};

export default RandomNameDisplay;
