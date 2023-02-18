// TypingBox.js

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startTyping,
  stopTyping,
  setText,
  setNextKey,
  incrementKeyCount,
  incrementCorrectCount,
  incrementIncorrectCount,
  reset,
} from "../../redux/slice/typingSlice";

import "./TypingBox.css";
import typingSound from "../../assets/typing.mp3";

const TypingBox = () => {
  const dispatch = useDispatch();
  const { text, nextKey, keyCount, correctCount, isRunning, startTime } =
    useSelector((state) => state.typing);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef();
  const audioRef = useRef(new Audio(typingSound));

  useEffect(() => {
    inputRef.current.focus();
    dispatch(startTyping());
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === nextKey) {
        dispatch(setText(text + event.key));
        dispatch(setNextKey(getNextKey(text)));
        dispatch(incrementCorrectCount());
      } else {
        dispatch(incrementIncorrectCount());
      }
      dispatch(incrementKeyCount());
      audioRef.current.play();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      dispatch(stopTyping());
    };
  }, [text, nextKey]);

  useEffect(() => {
    if (isRunning && keyCount === 0) {
      const timer = setTimeout(() => {
        dispatch(stopTyping());
      }, 5 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [isRunning, keyCount]);

  const getNextKey = () => {
    const remainingKeys = "asdfjkl;"
      .split("")
      .filter((key) => !text.includes(key));
    return remainingKeys[Math.floor(Math.random() * remainingKeys.length)];
  };

  const handleReset = () => {
    dispatch(reset());
    setInputText("");
  };

  const calculateAccuracy = () => {
    if (keyCount === 0) {
      return 0;
    }
    return Math.floor((correctCount / keyCount) * 100);
  };

  const calculateSpeed = () => {
    const timeElapsedInSeconds = (Date.now() - startTime) / 1000;
    return Math.floor(keyCount / (timeElapsedInSeconds / 60));
  };

  return (
    <div className="typing-box">
      <div className="text">
        <span>{text}</span>
        <span className="next-key">{nextKey}</span>
      </div>
      <input
        ref={inputRef}
        type="text"
        className="input"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        onKeyDown={(event) => event.preventDefault()}
        onKeyUp={(event) => {
          setInputText(event.target.value);
          event.preventDefault();
        }}
      />
      <div className="stats">
        <div className="stats-item">
          <span>Keys:</span>
          <span>{keyCount}</span>
        </div>
        <div className="stats-item">
          <span>Accuracy:</span>
          <span>{calculateAccuracy()}%</span>
        </div>
        <div className="stats-item">
          <span>Speed:</span>
          <span>{calculateSpeed()} wpm</span>
        </div>
      </div>
      <div className="reset-btn">
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default TypingBox;
