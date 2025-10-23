"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function VolunteerLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(email, "volunteer")) {
      setIsSubmitted(true)
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } else {
      alert("Email không tồn tại hoặc vai trò không khớp")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md p-8 border-emerald-200">
          <h1 className="text-3xl font-bold text-foreground mb-2">Đăng nhập</h1>
          <p className="text-muted-foreground mb-8">Đăng nhập vào tài khoản tình nguyện viên của bạn</p>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
              <p className="text-emerald-700 font-semibold mb-4">Đăng nhập thành công!</p>
              <p className="text-muted-foreground mb-6">Chào mừng bạn quay trở lại, {email}</p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/">Về trang chủ</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-background text-foreground"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Đăng nhập
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Chưa có tài khoản?{" "}
              <Link href="/auth/volunteer-signup" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Đăng ký ngay
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Đăng nhập với tư cách khác:</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/auth/organization">Tổ chức</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/auth/admin">Admin</Link>
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
