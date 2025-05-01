import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { debounce } from "lodash"
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"

interface ArticleEditorProps {
  onSubmit: (article: { title: string; content: string; author: string | null }) => void
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isMentor, setIsMentor] = useState(false)
  const [author, setAuthor] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem("role")
    setIsMentor(role === "mentor")
    setAuthor(localStorage.getItem("_id"))

    // Load draft from local storage
    const savedDraft = localStorage.getItem("articleDraft")
    if (savedDraft) {
      const { title: savedTitle, content: savedContent } = JSON.parse(savedDraft)
      setTitle(savedTitle)
      setContent(savedContent)
    }
  }, [])

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {}
    if (!title.trim()) {
      newErrors.title = "Title is required"
    }
    if (!content.trim()) {
      newErrors.content = "Content is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const checkAndAwardBadges = async (authorId: string | null) => {
    if (!authorId) return
    try {
      const response = await axios.post("/api/messages/award-badges", { authorId })
      console.log("Badges awarded:", response.data)
    } catch (error) {
      console.error("Error awarding badges:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsPublishing(true)
      try {
        // Simulate API call to publish the article
        await new Promise((resolve) => setTimeout(resolve, 1500))
        onSubmit({ title, content, author })
        await checkAndAwardBadges(author)
        // Clear the draft from local storage
        localStorage.removeItem("articleDraft")
        // Redirect to the articles list page after successful publication
        navigate("/articles", { state: { message: "Article published successfully!" } })
      } catch (error) {
        console.error("Error publishing article:", error)
      } finally {
        setIsPublishing(false)
      }
    }
  }

  const saveDraft = useCallback(
    debounce((title: string, content: string) => {
      localStorage.setItem("articleDraft", JSON.stringify({ title, content }))
    }, 1000),
    [],
  )

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    saveDraft(newTitle, content)
  }

  const handleContentChange = (value: string) => {
    setContent(value)
    saveDraft(title, value)
  }

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 py-8 dark:bg-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Write a New Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            required
            aria-invalid={errors.title ? "true" : "false"}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Content
          </label>
          <div className="relative">
            {isPreviewMode ? (
              <div
                className="prose max-w-none dark:prose-invert p-4 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleContentChange}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
                className={`bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.content ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
            <button
              type="button"
              onClick={togglePreviewMode}
              className="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-gray-600 rounded-full"
              aria-label={isPreviewMode ? "Edit mode" : "Preview mode"}
            >
              {isPreviewMode ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.content && (
            <p id="content-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.content}
            </p>
          )}
        </div>
        {isMentor && (
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
            disabled={isPublishing}
          >
            {isPublishing ? "Publishing..." : "Publish Article"}
          </motion.button>
        )}
      </form>
    </motion.div>
  )
}

export default ArticleEditor

