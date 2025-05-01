// controllers/articleController.js
import Article from '../models/Article.model.js';
import Mentor from '../models/Mentor.model.js';

export const getArticles = async (req, res) => {
  try {
    console.log('Fetching all articles');
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    console.log(`Fetching article with id: ${req.params.id}`);
    const article = await Article.findById(req.params.id);
    if (!article) {
      console.log('Article not found');
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error.message);
    res.status(500).json({ message: error.message });
  }
};
export const createArticle = async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    console.log('Creating a new article');
    const newArticle = await article.save();

    // Update mentor's articles
    const mentor = await Mentor.findById(req.body.author);
    if (mentor) {
      mentor.articles.push(newArticle._id);
      await mentor.save();
      console.log('Mentor articles updated');
    }

    res.status(201).json(newArticle);
    console.log('New article created', newArticle);
  } catch (error) {
    console.error('Error creating article:', error.message);
    res.status(400).json({ message: error.message });
  }
};

export const updateArticle = async (req, res) => {

  try {
    console.log(`Updating article with id: ${req.params.id}`);
    const article = await Article.findById(req.params.id);
    if (!article) {
      console.log('Article not found');
      return res.status(404).json({ message: 'Article not found' });
    }

    Object.assign(article, req.body);
    const updatedArticle = await article.save();
    res.json(updatedArticle);
    console.log('Article updated');
  } catch (error) {
    console.error('Error updating article:', error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    console.log(`Deleting article with id: ${req.params.id}`);
    const article = await Article.findById(req.params.id);
    if (!article) {
      console.log('Article not found');
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.remove();
    console.log('Article deleted');
    res.json({ message: 'Article deleted' });
  } catch (error) {
    console.error('Error deleting article:', error.message);
    res.status(500).json({ message: error.message });
  }
};


export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, userId } = req.body;

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const newComment = {
      content,
      author: userId,
      date: new Date(),
    };

    article.comments.push(newComment);
    await article.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: error.message });
  }
};