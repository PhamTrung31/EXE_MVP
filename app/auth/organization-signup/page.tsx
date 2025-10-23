"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function OrganizationSignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    bio: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password === formData.confirmPassword) {
      const registrations = JSON.parse(localStorage.getItem("orgRegistrations") || "[]")
      const newRegistration = {
        id: `org-reg-${Date.now()}`,
        organizationName: formData.name,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        status: "pending",
        appliedDate: new Date().toISOString().split("T")[0],
      }
      registrations.push(newRegistration)
      localStorage.setItem("orgRegistrations", JSON.stringify(registrations))
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md p-8 border-emerald-200">
          <h1 className="text-3xl font-bold text-foreground mb-2">Đăng ký Tổ chức</h1>
          <p className="text-muted-foreground mb-8">Tạo tài khoản tổ chức để quản lý chương trình</p>

          {isSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
              <p className="text-emerald-700 font-semibold mb-4">Đăng ký thành công!</p>
              <p className="text-muted-foreground mb-2">Chào mừng {formData.name}!</p>
              <p className="text-muted-foreground mb-6">
                Đơn đăng ký của bạn đang chờ duyệt từ Admin. Chúng tôi sẽ liên hệ với bạn sớm.
              </p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mb-3" asChild>
                <Link href="/">Về trang chủ</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tên tổ chức</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tên tổ chức"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="org@email.com"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0288888888"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mô tả tổ chức</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Chia sẻ về tổ chức và sứ mệnh của bạn"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-background text-foreground resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-background text-foreground"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Đăng ký
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link href="/auth/organization" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Đăng nhập
              </Link>
            </p>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
