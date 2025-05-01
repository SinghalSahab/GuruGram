import React from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import CommentSection from './CommentSection'
import MentorName from '../ui/MentorName'

interface ArticlePageProps {
  title: string
  content: string
  author: string
  date: string
  comments: { id: string; author: string; content: string; date: string }[]
  onAddComment: (content: string) => void
}

const ArticlePage: React.FC<ArticlePageProps> = ({ title, content, author, date, comments, onAddComment }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 py-8 dark:bg-gray-900"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold mb-4 text-black dark:text-white"
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center text-gray-600 mb-6 dark:text-gray-400"
      >
        <UserCircleIcon className="w-5 h-5 mr-2 text-black dark:text-gray-400" />
        <span className="mr-4 text-black dark:text-gray-400"><MentorName id={author} /></span>
        <CalendarIcon className="w-5 h-5 mr-2 text-black dark:text-gray-400" />
        <span className="text-black dark:text-gray-400">{date}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="prose max-w-none mb-8 text-black dark:prose-dark dark:text-white"
        dangerouslySetInnerHTML={{ __html: content }}
      ></motion.div>
      <CommentSection comments={comments} onAddComment={onAddComment} />
    </motion.div>
  )
}

export default ArticlePage
