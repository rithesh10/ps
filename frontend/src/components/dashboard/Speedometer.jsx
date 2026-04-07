import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Speedometer = ({ prompt }) => {
  const maxScore = 4;
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 300;
    const interval = 16;
    const steps = Math.ceil(duration / interval);
    const target = prompt || 0;
    const stepValue = target / steps;
    let step = 0;

    const animate = () => {
      if (step <= steps) {
        setAnimatedScore(Math.min(stepValue * step, target));
        step++;
        frame = requestAnimationFrame(animate);
      } else {
        setAnimatedScore(target);
      }
    };

    setAnimatedScore(0);
    animate();

    return () => cancelAnimationFrame(frame);
  }, [prompt]);

  const calculateColor = (value) => {
    const normalizedValue = value / maxScore;
    const hue = 120 - normalizedValue * 120;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="h-[120px] w-[120px]">
        <CircularProgressbar
          value={animatedScore * 25}
          text={`${animatedScore.toFixed(1)}`}
          maxValue={maxScore * 25}
          circleRatio={0.7}
          styles={{
            trail: {
              strokeLinecap: "round",
              transform: "rotate(-125deg)",
              transformOrigin: "center center",
              stroke: "#e2e8f0",
            },
            path: {
              strokeLinecap: "round",
              transform: "rotate(-125deg)",
              transformOrigin: "center center",
              stroke: calculateColor(animatedScore),
              transition: "stroke 0.3s ease",
            },
            text: {
              fill: "currentColor",
              fontSize: "1.4rem",
              fontWeight: "700",
            },
          }}
          strokeWidth={10}
        />
      </div>
    </div>
  );
};

export default Speedometer;
