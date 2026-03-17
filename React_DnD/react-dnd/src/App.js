import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateCharacter from "./components/CreateCharacter.js";
import GetAllCharacters from "./components/GetAllCharacters.js";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>D&D Character Manager</h1>
        <nav>
          <Link to="/create" style={{ marginRight: "20px" }}>
            Create Character
          </Link>
          <Link to="/list">View All Characters</Link>
        </nav>
        <Routes>
          <Route path="/create" element={<CreateCharacter />} />
          <Route path="/list" element={<GetAllCharacters />} />
          <Route path="/" element={<GetAllCharacters />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
