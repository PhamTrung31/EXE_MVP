"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { mockPrograms } from "@/lib/mock-data"
import { Heart, Users, Award, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
 const { user } = useAuth()
 const [allPrograms, setAllPrograms] = useState(mockPrograms)

 useEffect(() => {
 const customPrograms = JSON.parse(localStorage.getItem("customPrograms") || "[]")
 setAllPrograms([...mockPrograms, ...customPrograms])
 }, [])

 const featuredPrograms = allPrograms.slice(0, 3)

 return (
 <div className="min-h-screen flex flex-col bg-background">
 <Header />

 <main className="flex-1">
 {/* Hero Section */}
 <section className="relative bg-gradient-to-br from-[#77E5C8]/10 via-white to-[#A7CBDC]/10 py-24 overflow-hidden">
 {/* Background decoration */}
 <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
 <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#6085F0]/10 to-transparent rounded-full blur-3xl"></div>
 <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#77E5C8]/10 to-transparent rounded-full blur-3xl"></div>
 
 <div className="container mx-auto px-4 relative">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="text-6xl md:text-7xl font-bold text-gradient-primary mb-8 text-balance leading-tight mt-8">
 Cùng nhau tạo nên sự thay đổi
 </h1>
 <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-balance max-w-3xl mx-auto leading-relaxed">
 Kết nối với các chương trình thiện nguyện và trở thành một phần của cộng đồng tình nguyện viên
 </p>
 <div className="flex flex-col sm:flex-row gap-6 justify-center">
 <Button size="lg" className="gradient-primary text-white shadow-xl hover:opacity-90 transition-all duration-300 text-lg px-8 py-4" asChild>
 <Link href="/programs">Khám phá chương trình</Link>
 </Button>
                {!user && (
                  <Button size="lg" variant="outline" className="border-2 border-[#77E5C8] hover:bg-[#77E5C8]/10 hover:border-[#6085F0] transition-all duration-300 text-lg px-8 py-4" asChild>
                    <Link href="/auth/signup">Đăng ký ngay</Link>
                  </Button>
                )}
 </div>
 </div>
 </div>
 </section>

 {/* Stats Section */}
 <section className="py-20 bg-gradient-to-b from-background to-[#A7CBDC]/5">
 <div className="container mx-auto px-4">
 <div className="text-center mb-16">
 <h2 className="text-4xl font-bold text-foreground mb-4">Tác động của chúng ta</h2>
 <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
 Những con số ấn tượng thể hiện sức mạnh của cộng đồng Together
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <Card className="p-8 text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
 <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
 <Users className="w-8 h-8 text-white" />
 </div>
 <h3 className="text-4xl font-bold text-gradient-primary mb-3">1,250+</h3>
 <p className="text-muted-foreground text-lg">Tình nguyện viên tham gia</p>
 </Card>
 <Card className="p-8 text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
 <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
 <Heart className="w-8 h-8 text-white" />
 </div>
 <h3 className="text-4xl font-bold text-gradient-primary mb-3">45+</h3>
 <p className="text-muted-foreground text-lg">Chương trình hoạt động</p>
 </Card>
 <Card className="p-8 text-center border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
 <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
 <Award className="w-8 h-8 text-white" />
 </div>
 <h3 className="text-4xl font-bold text-gradient-primary mb-3">8,500+</h3>
 <p className="text-muted-foreground text-lg">Giờ tình nguyện</p>
 </Card>
 </div>
 </div>
 </section>

 {/* Featured Programs */}
 <section className="py-20 bg-gradient-to-b from-[#A7CBDC]/5 to-background">
 <div className="container mx-auto px-4">
 <div className="text-center mb-16">
 <h2 className="text-5xl font-bold text-gradient-primary mb-6">Chương trình nổi bật</h2>
 <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
 Tham gia các chương trình thiện nguyện đang hoạt động và tạo nên sự khác biệt
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {featuredPrograms.map((program, index) => (
 <Card key={program.id} className="group overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col">
 <div className="aspect-video bg-muted overflow-hidden relative flex-shrink-0">
 <img
 src={program.image || "/placeholder.svg"}
 alt={program.name}
 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
 
 {/* International diagonal badge */}
 {program.isInternational && (
 <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
 <div className="absolute top-6 -left-8 w-32 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold py-1 text-center transform -rotate-45 shadow-lg">
 Quốc tế
 </div>
 </div>
 )}
 
 <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <span className="text-xs font-semibold text-white bg-[#6085F0] px-3 py-1 rounded-full shadow-lg">
 {program.category}
 </span>
 </div>
 </div>
 <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#6085F0] transition-colors duration-200 min-h-[3.5rem]">{program.name}</h3>
 <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{program.description}</p>
 <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
 <span className="flex items-center gap-1">📍 {program.location}</span>
 <span className="flex items-center gap-1">
 👥 {program.volunteersJoined}/{program.volunteersNeeded}
 </span>
 </div>
 <Button className="w-full gradient-primary text-white shadow-lg hover:opacity-90 transition-all duration-300" asChild>
 <Link href={`/programs/${program.id}`}>Xem chi tiết</Link>
 </Button>
 </div>
 </Card>
 ))}
 </div>
 <div className="text-center mt-16">
 <Button size="lg" variant="outline" className="border-2 border-[#77E5C8] hover:bg-[#77E5C8]/10 hover:border-[#6085F0] transition-all duration-300 px-8 py-4" asChild>
 <Link href="/programs">
 Xem tất cả chương trình <ArrowRight className="ml-2 w-5 h-5" />
 </Link>
 </Button>
 </div>
 </div>
 </section>

 {/* Partner Organizations Section */}
 <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
 <div className="container mx-auto px-4">
 <div className="text-center mb-16">
 <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
 Đối tác tin cậy
 </h2>
 <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
 Hợp tác cùng các tổ chức uy tín hàng đầu Việt Nam
 </p>
 </div>

 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
 {[
 { name: "Trung tâm Từ Tâm", logo: "TT" },
 { name: "Quỹ Hy Vọng", logo: "HV" },
 { name: "Trái Tim Xanh", logo: "TX" },
 { name: "Hội Bảo vệ Thiên nhiên", logo: "BT" },
 { name: "Chương trình Ánh Sáng", logo: "AS" },
 { name: "Trung tâm Nhân ái", logo: "NA" },
 ].map((org) => (
 <Card
 key={org.name}
 className="group p-6 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 cursor-pointer"
 >
 <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300">
 <span className="text-white font-bold text-2xl">{org.logo}</span>
 </div>
 <p className="text-sm font-semibold text-foreground text-center">{org.name}</p>
 </Card>
 ))}
 </div>
 </div>
 </section>

 {!user && (
 <section className="relative py-20 gradient-full overflow-hidden">
 <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
 <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
 <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
 
 <div className="container mx-auto px-4 text-center relative">
 <h2 className="text-5xl font-bold text-white mb-6">Sẵn sàng tham gia?</h2>
 <p className="text-white/90 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
 Đăng ký ngay để trở thành một phần của cộng đồng tình nguyện viên và bắt đầu tạo nên sự thay đổi
 </p>
                <Button size="lg" className="bg-white text-[#6085F0] hover:bg-white/90 shadow-2xl hover:shadow-white/25 transition-all duration-300 text-lg px-8 py-4" asChild>
                  <Link href="/auth/signup">Đăng ký tình nguyện viên</Link>
                </Button>
 </div>
 </section>
 )}
 </main>

 <Footer />
 </div>
 )
}
