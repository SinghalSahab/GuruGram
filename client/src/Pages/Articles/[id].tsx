import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticlePage from '../../components/Articles/ArticlePage';

interface ArticleType {
  id: string;
  title: string;
  content: string;
  comments: { id: string; author: string; content: string; date: string; userId: string }[];
}

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <p>Loading...</p>;

  const handleAddComment = async (content: string) => {
    const userId = localStorage.getItem('email');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${id}/comments`, { content, userId });
      setArticle({ ...article, comments: [...article.comments, response.data] });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return <ArticlePage author={''} date={''} {...article} onAddComment={handleAddComment} />;
};

export default Article;
