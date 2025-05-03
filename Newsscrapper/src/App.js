import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Business from "./pages/Business";
import Tech from "./pages/Technology";
import World from "./pages/Worldnews";
import NotesPage from "./pages/NotesPage";
import Sports from "./pages/Sports";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business" element={<Business />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/world" element={<World />} />
        <Route path="/sports" element={<Sports />} />
      </Routes>
    </div>
  );
}

export default App;
