"use client"

import type React from "react"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { mockPrograms, mockChatMessages, mockRegistrations } from "@/lib/mock-data"
import { useState } from "react"
import { ArrowLeft, Send, Lock } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function ProgramChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const program = mockPrograms.find((p) => p.id === id)
  const messages = mockChatMessages.filter((m) => m.programId === id)
  const [newMessage, setNewMessage] = useState("")
  const [allMessages, setAllMessages] = useState(messages)
  const { user, isLoading } = useAuth()

  const userRegistration = user
    ? mockRegistrations.find((r) => r.volunteerId === user.id && r.programId === id)
    : null

  const isVolunteerWithAccess = user?.role === "volunteer" && userRegistration?.status === "approved"
  const isOrganizationOwner = user?.role === "organization" && program?.organizationId === user.id
  const canSendMessage = isOrganizationOwner
  const hasAccess = isVolunteerWithAccess || isOrganizationOwner

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && canSendMessage && user) {
      const message = {
        id: `msg-${Date.now()}`,
        programId: id,
        userId: user.id,
        userName: user.name,
        userRole: user.role as "volunteer" | "organization" | "admin",
        message: newMessage,
        timestamp: new Date().toISOString(),
      }
      setAllMessages([...allMessages, message])
      setNewMessage("")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <p className="text-muted-foreground">Đang tải...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <p className="text-muted-foreground">Chương trình không tìm thấy</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user || !hasAccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" asChild className="mb-6">
              <Link href={`/programs/${program.id}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Link>
            </Button>

            <Card className="border-emerald-200 p-8 text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Không có quyền truy cập</h2>
              <p className="text-muted-foreground mb-6">
                {!user
                  ? "Vui lòng đăng nhập để xem chat chương trình"
                  : user.role === "volunteer"
                    ? "Bạn cần tham gia chương trình này để xem chat"
                    : "Bạn không có quyền truy cập chat này"}
              </p>
              {!user && (
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/auth/volunteer">Đăng nhập</Link>
                </Button>
              )}
              {user?.role === "volunteer" && !userRegistration && (
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href={`/programs/${program.id}/register`}>Đăng ký tham gia</Link>
                </Button>
              )}
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  const backUrl = user?.role === "organization" 
    ? "/organization/dashboard" 
    : user?.role === "admin"
    ? "/admin/dashboard"
    : `/programs/${id}`

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href={backUrl}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại {user?.role === "organization" || user?.role === "admin" ? "Dashboard" : ""}
            </Link>
          </Button>

          <Card className="border-emerald-200 overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            <div className="bg-emerald-50 border-b border-emerald-200 p-6">
              <h1 className="text-2xl font-bold text-foreground">{program.name}</h1>
              <p className="text-muted-foreground">
                Kênh thảo luận chương trình
                {isVolunteerWithAccess && " (Chỉ xem)"}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {allMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.userId === user?.id ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md ${
                      msg.userId === user?.id ? "bg-emerald-600 text-white" : "bg-muted text-foreground"
                    } rounded-lg p-4`}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {msg.userName}
                      {msg.userRole === "organization" && " (Tổ chức)"}
                    </p>
                    <p className="text-sm mb-2">{msg.message}</p>
                    <p className={`text-xs ${msg.userId === user?.id ? "text-emerald-100" : "text-muted-foreground"}`}>
                      {new Date(msg.timestamp).toLocaleTimeString("vi-VN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input - Only show input for organization, show message for volunteers */}
            <div className="border-t border-border p-4 bg-background">
              {canSendMessage ? (
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-background text-foreground"
                  />
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <div className="text-center text-muted-foreground text-sm py-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Chỉ tổ chức được gửi tin nhắn
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
