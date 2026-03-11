import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"
import { useNavigate } from "react-router-dom"

export default function SignupPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            navigate("/login")
        } catch (error) {
            console.log(error.message)
        }
    }
    const toggleSignin = () => {
        navigate("/login")
    }

    return (
        <div className="auth-page">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <label>Email</label>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <label>Email</label>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <p className="auth-toggle">Already have an account? {' '}
                    <span onClick={toggleSignin}>Sign In</span>
                </p>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}