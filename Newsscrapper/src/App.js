import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
// import NotesPage from "./pages/NotesPage"
import NotesPage from "./pages/NotesPage"
import Tech from "./pages/Technology"
import World from "./pages/Worldnews"

// import Dashboard from "./pages/Dashboard"
import { useEffect, useState } from 'react'


function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  

  return (
    <div>
      <Navbar />

      <Routes>

        <Route path="/" element= {<Home/>} />
        <Route path="/login" element = {<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/notes" element={<NotesPage/>} />
        <Route path="/tech" element={<Tech/>} />
        <Route path="/world" element={<World/>} />
        {/* <Route path="/dashboard" element = {<Dashboard/>} /> */}

      </Routes>

    </div>
    )
}

export default App;
