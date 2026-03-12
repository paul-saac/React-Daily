import { useState, useRef } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../services/firebase"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import * as pdfjsLib from "pdfjs-dist"
import "../Dashboard.css"

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString()

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef(null)

  const extractTextFromPdf = async (file) => {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ""

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      const pageText = content.items.map((item) => item.str).join(" ")
      fullText += pageText + "\n\n"
    }

    return fullText.trim()
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.")
      return
    }

    setFileName(file.name)
    try {
      const extractedText = await extractTextFromPdf(file)
      setText(extractedText)
    } catch (error) {
      console.error("Failed to extract PDF text:", error.message)
      alert("Failed to read the PDF. Please try another file.")
    }
  }

  const handleSummarize = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
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
    <div className="dashboard">
      <nav className="dashboard__nav">
        <span className="dashboard__brand">AI Summarizer</span>
        <div className="dashboard__account">
          <span className="dashboard__email">{user?.email}</span>
          <button className="dashboard__logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard__main">
        <h2>Summarize Text</h2>
        <p className="dashboard__hint">Paste your text below or upload a PDF file.</p>

        <div className="dashboard__upload">
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            onChange={handleFileUpload}
            hidden
          />
          <button
            className="dashboard__upload-btn"
            onClick={() => fileInputRef.current.click()}
          >
            Upload PDF
          </button>
          {fileName && <span className="dashboard__filename">{fileName}</span>}
        </div>

        <textarea
          rows="10"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="dashboard__summarize"
          onClick={handleSummarize}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {summary && (
          <div className="dashboard__result">
            <h3>Summary</h3>
            <p>{summary}</p>
          </div>
        )}
      </main>
    </div>
  )
}