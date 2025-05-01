import { X } from "lucide-react";
import { useAuthStore } from "../Pages/chat/store/useAuthStore";
import { useChatStore } from "../Pages/chat/store/useChatStore";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";

// const RatingStars = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
//   return (
//     <ReactStars
//       count={5}
//       onChange={(newRating: number) => setRating(newRating)}
//       size={24}
//       activeColor="#ffd700"
//       value={rating}
//     />
//   );
//};
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  // const [] = useState(0);


  const role = localStorage.getItem("role");

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={selectedUser.avatar || "/avatar.png"} alt={selectedUser.name} className="object-cover w-full h-full" />
            </div>
          </div>

          {/* User info */}
          <div>
            <Link 
              to={role === "mentee" ? `/profile/mentor/${selectedUser._id}` : `/profile/${selectedUser._id}`} 
              className="font-semibold text-gray-900 dark:text-white"
            >
              {selectedUser.name}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* {role === "mentee" && (
            <div className="flex items-center gap-2">
              <RatingStars rating={rating} setRating={setRating} />
              <button
                onClick={handleRatingSubmit}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                <Star className="w-4 h-4 mr-1" />
                Rate
              </button>
            </div>
          )} */}
          {/* Video call button */}
          <Link
            to="/call"
            title="Start video call"
            className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Video Call
          </Link>

          {/* Close button */}
          <button
            onClick={() => setSelectedUser(null)}
            title="Close chat"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;