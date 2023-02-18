import React from "react";
import { useSelector } from "react-redux";
import "./Stats.css"
const Stats = () => {
    const { keyCount, correctCount, incorrectCount, startTime } = useSelector(
        (state) => state.typing
      );
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const wpm = Math.floor(((keyCount / 5) * 60) / 5);
  return (
    <div className="statics">
      <p>
        Time elapsed: <span>{elapsedTime}</span> seconds
      </p>
      <p>
        WPM: <span>{wpm}</span>
      </p>
      <p>
        Key count: <span>{keyCount}</span>
      </p>
      <p>
        Correct count: <span>{correctCount}</span>
      </p>
      <p>
        Incorrect count: <span>{incorrectCount}</span>
      </p>
    </div>
  );
};

export default Stats;
