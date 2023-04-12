import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NotesState from "./context/notes/notesState";


function App() {
  return (
    <>
      <NotesState>
        <Router>
          <Navbar />
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
        </NotesState>
    </>
  );
}

export default App;
