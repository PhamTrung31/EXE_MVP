"use client"

import { useState, useEffect } from "react"
import { mockAccounts } from "@/lib/mock-data"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: "volunteer" | "organization" | "admin"
  avatar?: string
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("currentUser")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, role: "volunteer" | "organization" | "admin") => {
    // Find user from mock data
    const account = mockAccounts.find((acc) => acc.email === email && acc.role === role)

    if (account) {
      const authUser: AuthUser = {
        id: account.id,
        name: account.name,
        email: account.email,
        role: account.role as "volunteer" | "organization" | "admin",
        avatar: account.avatar,
      }
      setUser(authUser)
      localStorage.setItem("currentUser", JSON.stringify(authUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  return { user, isLoading, login, logout }
}
