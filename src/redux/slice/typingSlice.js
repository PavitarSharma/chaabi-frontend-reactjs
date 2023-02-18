import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  nextKey: "",
  keyCount: 0,
  correctCount: 0,
  incorrectCount: 0,
  startTime: null,
  isRunning: false,
};

const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setNextKey: (state, action) => {
      state.nextKey = action.payload;
    },
    incrementKeyCount: (state) => {
      state.keyCount += 1;
    },
    incrementCorrectCount: (state) => {
      state.correctCount += 1;
    },
    incrementIncorrectCount: (state) => {
      state.incorrectCount += 1;
    },
    startTyping: (state) => {
      state.startTime = new Date();
      state.isRunning = true;
      state.nextKey = getNextKey(state.text);
    },
    stopTyping: (state) => {
      state.isRunning = false;
    },
    reset: () => initialState,
  },
});

const getNextKey = (text) => {
  const remainingKeys = "asdfjkl;"
    .split("")
    .filter((key) => !text.includes(key));
  return remainingKeys[Math.floor(Math.random() * remainingKeys.length)];
};

export const {
  setText,
  setNextKey,
  incrementKeyCount,
  incrementCorrectCount,
  incrementIncorrectCount,
  startTyping,
  stopTyping,
  reset,
} = typingSlice.actions;

export default typingSlice.reducer;
