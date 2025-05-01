import { Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'

import { AuthProvider } from './context/AuthContext'
import ProfileCompletion from './components/ProfileComponents/ProfileCompletion'

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Page Components
import Home from "./Pages/LandingPage/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import NotFound from "./Pages/NotFound";
import Call from "./components/Call/Call";
import MentorChatPage from "./Pages/MentorChat";

// Article Related Components
import Article from "./Pages/Articles/[id]";
import ArticlesPage from "./Pages/Articles";
import ArticleEditor from "./components/Articles/ArticleEditor";

// Profile Components
import CompleteProfile from './components/ProfileComponents/complete-profile'
import MenteeProfile from './components/ProfileComponents/mentee'
import MentorProfile from './components/ProfileComponents/mentor'
import ViewMenteeProfile from './components/ProfileComponents/ViewMenteeProfile'
import ViewMentorProfile from './components/ProfileComponents/ViewMentorProfile'
import axios from 'axios'
import AllMentors from './Pages/AllMentors'
import ChatPage from './Pages/chat/ChatPage'

interface ArticleType {
  _id?: string
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  commentCount: number;
  likes: number;
  comments: {
    id: string;
    author: string;
    content: string;
    date: string;
  }[];
}

export default function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [articles, setArticles] = useState<ArticleType[]>([]);

  // Theme handlers
  const darkTheme = () => setThemeMode("dark");
  const lightTheme = () => setThemeMode("light");


  useEffect(() => {
    document.querySelector("html")?.classList.remove("dark", "light");
    document.querySelector("html")?.classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/articles`);
        setArticles([...response.data]);
        console.log('Articles fetched:', response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);
  // Article handlers

  const handleNewArticle = async (article: { title: string; content: string, author: string | null }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/articles`, article);
      setArticles([...articles, response.data]);
      console.log('Article created:', response.data);
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const handleLike = async (id: string) => {
    try {
      console.log('Liking article:', id);
      const article = articles.find(article => article.id == id || article._id == id);
      if (article) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${id}`, { likes: article.likes + 1 });
        console.log('Article liked successfully');
      } else {
        console.error('Article not found');
      }
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === id ? { ...article, likes: article.likes + 1 } : article
        )
      );
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const location = useLocation();

  return (

    <AuthProvider>
      <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        <div className="min-h-screen flex flex-col dark:bg-gray-900 bg-white text-black dark:text-white">
          <Header />
          <main className="flex-grow pt-16">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/mentor-chat" element={<MentorChatPage />} />
              <Route path="/all/mentors" element={<AllMentors />} />

              {/* Profile Routes */}
              <Route path="/profile" element={<MenteeProfile />} />
              <Route path="/profile/mentor" element={<MentorProfile />} />
              <Route path="/profile/:id" element={<ViewMenteeProfile />} />
              <Route path="/profile/mentor/:id" element={<ViewMentorProfile />} />
              
              {/* Feature Routes */}
              <Route path="/call" element={<Call meetingNumber={'6943829690'} passWord={'4Yjz7F'} />} />

              {/* Article Routes */}
              <Route
                path="/articles/new"
                element={<ArticleEditor onSubmit={handleNewArticle} />}
              />
              {/* <Route
                path="/articles/:id"
                element={<Article articles={articles} />}
              /> */}
              <Route
                path="/articles"
                element={
                  <ArticlesPage articles={articles} onLike={handleLike} />
                }
              />
              <Route
                path="/articles/:id"
                element={
                  <Article />
                }
              />
              
              
              <Route path="/complete-profile" element={<CompleteProfile />} />
              <Route path="/profile-completion" element={<ProfileCompletion />} />
              <Route path='/chat' element={<ChatPage />} />
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {location.pathname === "/" && <Footer />}

        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
