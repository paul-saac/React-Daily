import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import './App.css'

function App() {
    return (
        <div>
            <nav style={{ display: "flex", gap: "20px" }}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <NavLink to="/contact" style={({ isActive }) => ({color: isActive ? "red" : "blue"})}> Contact</NavLink>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    )
}

export default App;