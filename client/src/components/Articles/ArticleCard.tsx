import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarIcon, ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import MentorName from '../ui/MentorName'

interface ArticleCardProps {
  id?: string
  _id?: string
  title: string
  content: string
  author: string
  date: string
  commentCount: number
  likes: number
  onLike: (id: string) => void
}

const ArticleCard: React.FC<ArticleCardProps> = ({ id, _id, title, content, author, date, commentCount, likes, onLike }) => {
  const articleId = id || _id
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    const newIsLiked = !isLiked
    setIsLiked(newIsLiked)
    console.log(articleId)
    setLikeCount(likeCount + (newIsLiked ? 1 : -1))
    if (articleId) {
      onLike(articleId)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          <Link to={`/articles/${articleId}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 transition duration-300">
            {title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{content.slice(0, 200)}{content.length > 200 ? '...' : ''}</p>
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="mb-2 sm:mb-0"><MentorName id={author} /></span>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {date}
            </span>
            <span className="flex items-center">
              <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
              {commentCount}
            </span>
            <button
              onClick={handleLike}
              className="flex items-center text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 transition duration-300"
            >
              {isLiked ? (
                <HeartIconSolid className="w-5 h-5 mr-1" />
              ) : (
                <HeartIcon className="w-5 h-5 mr-1" />
              )}
              {likeCount}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ArticleCard
