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

            navigate("/dashboard")

        } catch (error) {

            console.log(error.message)

        }
    }

    return (
        <div>

            <h2>Signup</h2>

            <form onSubmit={handleSignup}>

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Create Account</button>

            </form>

        </div>
    )
}