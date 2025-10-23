"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from "lucide-react"
import Link from "next/link"

const defaultTags = ["Giáo dục", "Môi trường", "Y tế", "Cộng đồng", "Bảo vệ động vật"]

export default function AdminTagsPage() {
  const { user } = useAuth()
  const [tags, setTags] = useState(defaultTags)
  const [newTag, setNewTag] = useState("")
  const [editingTag, setEditingTag] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("adminTags")
    if (stored) {
      setTags(JSON.parse(stored))
    }
  }, [])

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()]
      setTags(updatedTags)
      localStorage.setItem("adminTags", JSON.stringify(updatedTags))
      setNewTag("")
    }
  }

  const handleEditTag = (tag: string) => {
    setEditingTag(tag)
    setEditValue(tag)
  }

  const handleSaveEdit = () => {
    if (editValue.trim() && !tags.includes(editValue.trim())) {
      const updatedTags = tags.map(tag => tag === editingTag ? editValue.trim() : tag)
      setTags(updatedTags)
      localStorage.setItem("adminTags", JSON.stringify(updatedTags))
      setEditingTag(null)
      setEditValue("")
    }
  }

  const handleCancelEdit = () => {
    setEditingTag(null)
    setEditValue("")
  }

  const handleDeleteTag = (tagToDelete: string) => {
    if (confirm(`Bạn có chắc muốn xóa tag "${tagToDelete}"?`)) {
      const updatedTags = tags.filter(tag => tag !== tagToDelete)
      setTags(updatedTags)
      localStorage.setItem("adminTags", JSON.stringify(updatedTags))
    }
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <p className="text-muted-foreground">Chỉ admin mới có thể truy cập trang này</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/admin/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại Dashboard
            </Link>
          </Button>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Quản lý Tags</h1>

            <Card className="p-8 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Thêm tag mới</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="newTag">Tên tag</Label>
                  <Input
                    id="newTag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nhập tên tag mới"
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddTag} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Danh sách tags</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tags.map((tag) => (
                  <div key={tag} className="p-4 border border-border rounded-lg hover:bg-muted transition">
                    {editingTag === tag ? (
                      <div className="space-y-3">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSaveEdit()}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSaveEdit} className="bg-emerald-600 hover:bg-emerald-700">
                            <Save className="w-3 h-3 mr-1" />
                            Lưu
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                            <X className="w-3 h-3 mr-1" />
                            Hủy
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{tag}</span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditTag(tag)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteTag(tag)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
