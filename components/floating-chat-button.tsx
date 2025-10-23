"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { mockRegistrations } from "@/lib/mock-data"
import { ChatModal } from "./chat-modal"

export function FloatingChatButton() {
  const { user } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Only show for volunteers with approved programs
  if (!user || user.role !== "volunteer") {
    return null
  }

  const approvedPrograms = mockRegistrations.filter(
    (r) => r.volunteerId === user.id && r.status === "approved"
  )

  if (approvedPrograms.length === 0) {
    return null
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="group relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          
          {/* Unread badge */}
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-lg">
            3
          </span>

          {/* Tooltip */}
          {isExpanded && (
            <div className="absolute right-full mr-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-xl whitespace-nowrap animate-in slide-in-from-right-2 duration-200">
              Tin nhắn ({approvedPrograms.length} chương trình)
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900"></div>
            </div>
          )}
        </button>

        {/* Ripple effect */}
        <div className="absolute inset-0 w-16 h-16 bg-emerald-500 rounded-full opacity-20 animate-ping pointer-events-none"></div>
      </div>

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}

