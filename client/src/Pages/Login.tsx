import React, { useState, useContext } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext.tsx";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "./chat/store/useAuthStore.ts"; // Import useAuthStore

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"mentee" | "mentor">("mentee");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { connectSocket } = useAuthStore(); // Destructure connectSocket and disconnectSocket

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "mentee"
          ? `${import.meta.env.VITE_BACKEND_URL}/api/mentee/login`
          : `${import.meta.env.VITE_BACKEND_URL}/api/mentor/login`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      if (response.ok) {
        toast.success("Login successful!");

        const { token, mentee } = await response.json();
        console.log(token);
        console.log(mentee);
        
        login(token, mentee._id, mentee.email, role);
        connectSocket(); // Connect socket after successful login

        console.log(role);
        if (role == "mentor") {
          navigate("/profile/mentor");
        } else {
          navigate("/profile");
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = async (response: any) => {
    try {
      const endpoint =
        role === "mentee"
          ? `${import.meta.env.VITE_BACKEND_URL}/api/mentee/google-login`
          : `${import.meta.env.VITE_BACKEND_URL}/api/mentor/google-login`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });
      if (res.ok) {
        const { token, ...rest } = await res.json();
        console.log(rest);
        console.log(role);
        if (role === "mentee") {
          login(token, rest.mentee._id, rest.mentee.email, role);
        } else {
          login(token, rest.mentor._id, rest.mentor.email, role);
        }
        connectSocket(); // Connect socket after successful Google login
        toast.success("Google login successful!", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.error(
          `Google login failed. Please try again.${await res.text()}`,
          {
            position: "top-right",
            autoClose: 4000,
          }
        );
      }
    } catch (error) {
        console.error("Google login error:", error);
      toast.error("An error occurred during Google login.", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Sign in to GuruGram
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-900"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-900"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 border-gray-300 dark:border-gray-700 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              I am a:
            </label>
            <div className="mt-2">
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className={`${
                    role === "mentee"
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  } px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 text-sm font-medium focus:outline-none`}
                  onClick={() => setRole("mentee")}
                >
                  Mentee
                </button>
                <button
                  type="button"
                  className={`${
                    role === "mentor"
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  } px-3 py-2 rounded-r-md border border-gray-300 dark:border-gray-700 text-sm font-medium focus:outline-none`}
                  onClick={() => setRole("mentor")}
                >
                  Mentor
                </button>
              </div>
            </div>
          </div>

          <div>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() =>
                toast.error("Google login failed. Please try again.", {
                  position: "top-right",
                  autoClose: 4000,
                })
              }
              type="standard"
              theme="filled_black"
              size="large"
              text="signin_with"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
