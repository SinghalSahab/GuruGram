import React from 'react'
import { motion } from 'framer-motion'
import ArticleCard from './ArticleCard'

interface Article {
  id: string
  title: string
  content: string
  author: string
  date: string
  commentCount: number
  likes: number
}

interface ArticleListProps {
  articles: Article[]
  onLike: (id: string) => void
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onLike }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 dark:bg-gray-900"
    >
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="dark:bg-gray-800 dark:text-white"
        >
          <ArticleCard {...article} onLike={onLike} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ArticleList
