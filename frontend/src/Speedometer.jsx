import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Speedometer = ({ prompt }) => {
  const maxScore = 4;

  const [animatedScore, setAnimatedScore] = useState(0);
  useEffect(() => {
    const startAnimation = () => {
      const animationDuration = 200; // milliseconds
      const animationInterval = 40; // milliseconds
      const steps = Math.ceil(animationDuration / animationInterval);
      const stepValue = (prompt || 0) / steps; // Assuming a default prompt value of 2

      let step = 0;

      const animate = () => {
        if (step <= steps) {
          setAnimatedScore((prevScore) => prevScore + stepValue);
          step++;
          requestAnimationFrame(animate);
        } else {
          setAnimatedScore(prompt || 0);
        }
      };

      animate();
    };

    startAnimation();
  }, [prompt]);

  const calculateColor = (value) => {
    const normalizedValue = value / maxScore; // Normalize the value to the range [0, 1]
    const hue = 120 - normalizedValue * 120; // Start from red (hue 0) and end at green (hue 120)
    // const hue = 0 + normalizedValue * 120; // Start from red (hue 0) and end at green (hue 120)
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ height: '130px', width: '130px' }}>
        <CircularProgressbar
          value={animatedScore * 25} // Adjust the value scale to fit within 0 to 100
          text={`${animatedScore.toFixed(2)}`}
          
          maxValue={maxScore * 25}
          circleRatio={0.7}
          styles={{
            trail: {
              strokeLinecap: 'butt',
              transform: 'rotate(-125deg)',
              transformOrigin: 'center center',
            },
            path: {
              strokeLinecap: 'butt',
              transform: 'rotate(-125deg)',
              transformOrigin: 'center center',
              stroke: calculateColor(animatedScore),
            },
            text: {
              fill: '#000', // Change the text color to black
            },
          }}
          strokeWidth={10}
        />
      </div>
    </div>
  );
};

export default Speedometer;