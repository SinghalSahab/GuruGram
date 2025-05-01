import React, { useState, useRef, useEffect } from 'react'
import { Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Message {
  id: string
  sender: 'mentor' | 'mentee'
  content: string
  timestamp: Date
}

interface ChatRoomProps {
  mentorName: string
  mentorAvatar: string
}

export default function ChatRoom({ mentorName, mentorAvatar }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'mentor',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: '2',
      sender: 'mentee',
      content: 'Hi! I have a question about React hooks.',
      timestamp: new Date(Date.now() - 1000 * 60 * 4)
    },
    {
      id: '3',
      sender: 'mentor',
      content: 'Sure, I\'d be happy to help. What specifically about hooks are you struggling with?',
      timestamp: new Date(Date.now() - 1000 * 60 * 3)
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'mentee',
        content: newMessage.trim(),
        timestamp: new Date()
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900 p-4">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
            <img src={mentorAvatar || "/placeholder.svg"} alt={mentorName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{mentorName}</h2>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
            <Link to="/call">
              <Video className="h-5 w-5" />
            </Link>
          </button>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'mentee' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'mentee'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
                } shadow-md`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 text-gray-300 dark:text-gray-500">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="bg-white dark:bg-gray-800 p-4 flex items-center space-x-2 rounded-b-lg">
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Smile className="h-5 w-5" />
        </button>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}
