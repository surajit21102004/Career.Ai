import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const Type = () => {
  return (
    <h1 className="text-5xl  font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 text-center">
      <TypeAnimation
        sequence={[
          'Career.AI',   // Types "Career.AI"
          2000,          // Waits for 2 seconds after typing
          '',            // Clears text
          500            // Waits for 0.5 second before restarting
        ]}
        wrapper="span"
        speed={300}      // Slowest typing speed
        repeat={Infinity} // Infinite loop
      />
      
    </h1>
  );
};

export default Type;
