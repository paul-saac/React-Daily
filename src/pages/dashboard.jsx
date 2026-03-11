import { useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../services/firebase"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      // TODO: Replace with your AI summarization API call
      setSummary("Summary will appear here once you connect an AI API.")
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <div>
      <header>
        <h1>AI Summarizer</h1>
        <div>
          <p>Welcome, {user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>

      </header>

      <main>
        <textarea
          rows="10"
          cols="60"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button onClick={handleSummarize} disabled={loading}>
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {summary && (
          <div>
            <h3>Summary</h3>
            <p>{summary}</p>
          </div>
        )}
      </main>
    </div>
  )
}