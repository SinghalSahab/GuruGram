import ChatRoom from '../components/ChatRoom/ChatRoom'

export default function MentorChatPage() {
  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Mentor Chat</h1>
      </header>
      <div className="flex-grow overflow-hidden">
        <ChatRoom
          mentorName="Dr. Jane Smith"
          mentorAvatar="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-19%20132925-0LyNTc4JMPKffhgUBO45kAOcRjDOhv.png"
        />
      </div>
    </div>
  )
}
