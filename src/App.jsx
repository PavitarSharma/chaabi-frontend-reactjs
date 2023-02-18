import Stats from "./components/Stats/Stats";
import TypingBox from "./components/TypingBox/TypingBox";

function App() {
  return (
    <div className="container">
      <h1>Touch Typing Practice</h1>
      <TypingBox />
      <Stats />
    </div>
  );
}

export default App;
