import { useEffect, useState } from "react"
import { useChatStore } from "../Pages/chat/store/useChatStore"
import { useAuthStore } from "../Pages/chat/store/useAuthStore"
import SidebarSkeleton from "./skeletons/SlidebarSkeleton"
import { Users, Menu, X } from "lucide-react"

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users

  if (isUsersLoading) return <SidebarSkeleton />

  const SidebarContent = () => (
    <>
      <div className="border-b border-gray-300 dark:border-gray-700 w-full p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="font-medium">Contacts</span>
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">({onlineUsers.length - 1} online)</span>
        </div>
      </div>
      <div className="overflow-y-auto flex-1 w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user)
              setIsMobileMenuOpen(false)
            }}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
              ${selectedUser?._id === user._id ? "bg-gray-200 dark:bg-gray-600" : ""}
            `}
          >
            <div className="relative">
              <img src={user.avatar || "/avatar.png"} alt={user.name} className="w-12 h-12 object-cover rounded-full" />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                  rounded-full ring-2 ring-white dark:ring-gray-800"
                />
              )}
            </div>
            <div className="text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 dark:text-zinc-400 py-4">No users found</div>
        )}
      </div>
    </>
  )

  return (
    <>
      <button
        className="absolute lg:hidden z-20 bg-white dark:bg-gray-800 p-2 shadow-md"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile sidebar */}
      <div
        className={`
          lg:hidden absolute inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-200
          ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <aside
          className={`mt-16
            h-full w-80 bg-white dark:bg-gray-800 text-black dark:text-white
            flex flex-col transition-transform duration-200 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent />
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-full w-72 border-r border-gray-300 dark:border-gray-700 flex-col transition-all duration-200 bg-white dark:bg-gray-800 text-black dark:text-white">
        <SidebarContent />
      </aside>
    </>
  )
}

export default Sidebar

