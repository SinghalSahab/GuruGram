import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ArticleList from '../../components/Articles/ArticleList';

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  commentCount: number;
  likes: number;
}

interface ArticlesPageProps {
  articles: Article[];
  onLike: (id: string) => void;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ articles, onLike }) => {
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{message}</span>
        </motion.div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 dark:text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold mb-4 sm:mb-0"
        >
          Articles
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/articles/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
          >
            Write New Article
          </Link>
        </motion.div>
      </div>
      <ArticleList articles={articles} onLike={onLike} />
    </motion.div>
  );
};

export default ArticlesPage;
