import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/dashboard")
        } catch (error) {
            console.log(error.message)
        }
    }
    const toggleSignup = () => {
        navigate("/signup")
    }

    return (
        <div className="auth-page">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <p className="auth-toggle"> Don't have an account? {' '}
                    <span onClick={toggleSignup}>Sign Up</span>
                </p>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}