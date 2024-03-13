import React, { useState, useEffect } from 'react';

const RandomCircle = () => {
  // Define the number of circles
  const numCircles = 60; // Adjust the number of circles as needed to fill the available space

  // Define the number of unique colors in the palette
  const paletteSize = 60; // Set the palette size to match the number of circles

  // Function to generate a random color in RGB format
  const getRandomColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    return randomColor;
  };

  // Function to generate a random color palette with unique colors
  const generateRandomPalette = () => {
    const palette = [];
    while (palette.length < paletteSize) {
      const color = getRandomColor();
      if (!palette.includes(color)) {
        palette.push(color);
      }
    }
    return palette;
  };

  // State variable to keep track of the color palette
  const [palette, setPalette] = useState(generateRandomPalette());

  // State variable to keep track of the rectangle color
  const [rectangleColorIndex, setRectangleColorIndex] = useState(0); // Initialize with the index of the first color in the palette

  // State variable to keep track of the counter
  const [counter, setCounter] = useState(0); // Initialize points to 0

  // State variable to keep track of the remaining time
  const [timeRemaining, setTimeRemaining] = useState(60); // Adjust the initial time as needed (in seconds)

  // State variable to keep track of the difficulty level
  const [difficultyLevel, setDifficultyLevel] = useState(1); // Default to Level 1

  // Function to handle circle click
  const handleCircleClick = (clickedColor) => {
    // Refresh the palette
    setPalette(generateRandomPalette());

    // If difficulty level is 2, always refresh the rectangle color after every click
    if (difficultyLevel === 2) {
      setRectangleColorIndex((prevIndex) => (prevIndex + 1) % paletteSize);
    }

    // Compare the clicked color with the color of the rectangle
    if (clickedColor === palette[rectangleColorIndex]) {
      // If colors match, increment the counter
      setCounter(counter + 1);

      // If difficulty level is 1, refresh the rectangle color only on match
      if (difficultyLevel === 1) {
        setRectangleColorIndex((prevIndex) => (prevIndex + 1) % paletteSize);
      }
    } else {
      // If colors don't match, decrement the counter
      setCounter(counter - 1);
    }
  };

  // Function to handle difficulty level change
  const handleDifficultyChange = () => {
    // Toggle between difficulty levels (1 and 2)
    setDifficultyLevel((prevLevel) => (prevLevel === 1 ? 2 : 1));
  };

  // Effect to update the timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the timer when the component unmounts or when time is up
    if (timeRemaining === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // End the game when time is up
  useEffect(() => {
    if (timeRemaining === 0) {
      alert('Time is up! Game over.');
    }
  }, [timeRemaining]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Render the rectangle */}
      <div
        style={{
          backgroundColor: palette[rectangleColorIndex],
          width: '100%',
          height: '50px', // Adjust the height of the rectangle as needed
          margin: '20px 0',
        }}
      ></div>

      {/* Render the circles */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {[...Array(numCircles)].map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: palette[index % paletteSize], // Use colors from the palette in a cyclic manner
              width: '50px',
              height: '50px',
              margin: '5px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
            onClick={() => handleCircleClick(palette[index % paletteSize])} // Pass the clicked color to the event handler
          ></div>
        ))}
      </div>

      {/* Display the counter, remaining time, and difficulty level */}
      <p>Counter: {counter}</p>
      <p>Time Remaining: {timeRemaining} seconds</p>
      <div>
        <label>
          <input type="checkbox" checked={difficultyLevel === 2} onChange={handleDifficultyChange} /> Level 2 (Hard)
        </label>
      </div>
    </div>
  );
};

export default RandomCircle;
