import { useChatStore } from "./store/useChatStore";

import Sidebar from "../../components/Sidebar";
import NoChatSelected from "../../components/NoChatSelected";
import ChatContainer from "../../components/ChatContainer";
const ChatPage = () => {

  const { selectedUser } = useChatStore();
  return (
    <div className="min-h-screen bg-zinc-400 dark:bg-zinc-700">
      <div className="flex items-center justify-center md:pt-20 md:px-4 ">
        <div className="bg-gray-100 rounded-lg shadow-cl w-full max-w-6xl md:h-[calc(100vh-8rem)] h-screen">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage