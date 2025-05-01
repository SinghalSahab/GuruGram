import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCircleIcon } from '@heroicons/react/24/solid'

interface Comment {
  id: string
  author: string
  content: string
  date: string
}

interface CommentSectionProps {
  comments: Comment[]
  onAddComment: (content: string) => void
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      <AnimatePresence>
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 shadow-md"
          >
            <div className="flex items-center mb-2">
              <UserCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="font-medium">{comment.author}</span>
              <span className="text-sm text-gray-500 ml-2">{comment.date}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </motion.div>
        ))}
      </AnimatePresence>
      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 bg-gray-100"
          rows={3}
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Post Comment
        </motion.button>
      </form>
    </motion.div>
  )
}

export default CommentSection
