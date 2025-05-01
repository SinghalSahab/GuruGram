import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  token: string;
  _id: string;
  profileCompleted?: boolean;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string, _id: string, email: string, role: string) => void;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const _id = localStorage.getItem("_id");
        const email = localStorage.getItem("email");
        const profileCompleted = localStorage.getItem("profileCompleted");
        const role = localStorage.getItem("role");

        if (token && _id && email && role) {
        setUser({ 
          token, 
          _id, 
          email, 
          role,
          profileCompleted: profileCompleted ? JSON.parse(profileCompleted) : false 
        });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (token: string, _id: string, email: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("_id", _id);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
            
    setUser({ token, _id, email, role, profileCompleted: false });
    if(role === "mentor") navigate("/complete-profile");
    else    navigate("/profile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    localStorage.removeItem("email");
    localStorage.removeItem("profileCompleted");
    setUser(null);
    navigate("/login");
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('profileCompleted', JSON.stringify(updatedUser.profileCompleted));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, AuthProvider};

