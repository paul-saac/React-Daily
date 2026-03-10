import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./auth/LoginPage"
import SignupPage from "./auth/SignupPage"
import Dashboard from "./pages/dashboard.jsx"


function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default App