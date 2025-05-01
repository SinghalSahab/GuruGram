import { create } from "zustand";
// import { axiosInstance } from "../axios.ts";
// import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

const BASE_URL =  `${import.meta.env.VITE_BACKEND_URL}`;

interface AuthUser {
  avatar: string;
  _id: string;
  email: string;
  profilePic: string;
  // Add other user properties as needed
}

interface AuthStore {
  authUser: AuthUser | null;
  onlineUsers: string[];
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  onlineUsers: [],
  socket: null,

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket && socket.connected) socket.disconnect();
  },
}));