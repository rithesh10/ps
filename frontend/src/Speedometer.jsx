// // import React from 'react';
// // import { CircularProgressbar } from 'react-circular-progressbar';
// // import 'react-circular-progressbar/dist/styles.css';

// // const Speedometer = ({ prompt }) => {
// //   const score = prompt || 22; // Use the provided prompt or a default value

// //   const calculateColor = (percent, start, end) => {
// //     const a = percent / 100;
// //     const b = (end - start) * a;
// //     const c = b + start;
// //     return `hsl(${c}, 100%, 50%)`;
// //   };

// //   return (
// //     <div style={{ height: '200px', width: 'fit-content' }}>
// //       <CircularProgressbar
// //         value={score}
// //         text={`${score}%`}
// //         circleRatio={0.7}
// //         styles={{
// //           trail: {
// //             strokeLinecap: 'butt',
// //             transform: 'rotate(-125deg)',
// //             transformOrigin: 'center center',
// //           },
// //           path: {
// //             strokeLinecap: 'butt',
// //             transform: 'rotate(-125deg)',
// //             transformOrigin: 'center center',
// //             stroke: calculateColor(score, 0, 120),
// //           },
// //           text: {
// //             fill: '#ddd',
// //           },
// //         }}
// //         strokeWidth={10}
// //       />
// //     </div>
// //   );
// // };

// // export default Speedometer;
// import React from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// const Speedometer = ({ prompt }) => {
//   const score = prompt || 22; // Use the provided prompt or a default value

//   const calculateColor = (percent, start, end) => {
//     const a = percent / 100;
//     const b = (end - start) * a;
//     const c = b + start;
//     return `hsl(${120 - c}, 100%, 50%)`; // Adjusted to start from green (120) and end at red (0)
//   };

//   return (
//     <div style={{ height: '200px', width: 'fit-content' }}>
//       <CircularProgressbar
//         value={score}
//         text={`${score}%`}
//         circleRatio={0.7}
//         styles={{
//           trail: {
//             strokeLinecap: 'butt',
//             transform: 'rotate(-125deg)',
//             transformOrigin: 'center center',
//           },
//           path: {
//             strokeLinecap: 'butt',
//             transform: 'rotate(-125deg)',
//             transformOrigin: 'center center',
//             stroke: calculateColor(score, 0, 120),
//           },
//           text: {
//             fill: '#ddd',
//           },
//         }}
//         strokeWidth={10}
//       />
//     </div>
//   );
// };

// export default Speedometer;
// import React from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// const Speedometer = ({ prompt }) => {
//   const maxScore = 10;
//   const minScore = 0;

//   const score = Math.max(minScore, Math.min(prompt || 22, maxScore)); // Clamp the value between minScore and maxScore

//   const calculateColor = (value) => {
//     const normalizedValue = (value - minScore) / (maxScore - minScore);
//     const hue = 120 - normalizedValue * 120; // Inverted to start from green (hue 120) and end at red (hue 0)
//     return `hsl(${hue}, 100%, 50%)`;
//   };

//   return (
//     <div style={{ height: '130px', width: '130px' }}>
//       <CircularProgressbar
//         value={score * 10} // Adjust the value scale to fit within 0 to 100
//         text={`${score}`}
//         maxValue={maxScore * 10}
//         minValue={minScore * 10}
//         circleRatio={0.7}
//         styles={{
//           trail: {
//             strokeLinecap: 'butt',
//             transform: 'rotate(-125deg)',
//             transformOrigin: 'center center',
//           },
//           path: {
//             strokeLinecap: 'butt',
//             transform: 'rotate(-125deg)',
//             transformOrigin: 'center center',
//             stroke: calculateColor(score),
//           },
//           text: {
//             fill: '#ddd',
//           },
//         }}
//         strokeWidth={10}
//       />
//     </div>
//   );
// };

// export default Speedometer;





import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Speedometer = ({ prompt }) => {
  const maxScore = 4;

  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const startAnimation = () => {
      const animationDuration = 150; // Adjust the duration of the animation in milliseconds
      const animationInterval = 40; // Adjust the interval between animation steps in milliseconds
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
    const hue = 0 + normalizedValue * 120; // Start from red (hue 0) and end at green (hue 120)
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