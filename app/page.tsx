"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Zap } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"disco" | "community" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleDemoLogin = () => {
    localStorage.setItem("gridguard_session", "demo_user")
    localStorage.setItem("gridguard_user_type", "disco")
    router.push("/dashboard")
  }

  const handleCommunityDemo = () => {
    localStorage.setItem("gridguard_session", "community_user")
    localStorage.setItem("gridguard_user_type", "community")
    router.push("/community/dashboard")
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem("gridguard_session", "demo_user")
      localStorage.setItem("gridguard_user_type", userType || "disco")
      if (userType === "community") {
        router.push("/community/dashboard")
      } else {
        router.push("/dashboard")
      }
    }, 500)
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">GridGuard</h1>
            </div>
            <p className="text-muted-foreground">Electricity Grid Monitoring & Loss Prevention</p>
          </div>

          {/* User Type Selection */}
          <div className="space-y-4">
            <Card
              className="border-border/50 shadow-lg cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setUserType("disco")}
            >
              <CardHeader>
                <CardTitle>DISCO Admin</CardTitle>
                <CardDescription>For electricity distribution company operators</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">
                  Access comprehensive monitoring, analytics, and management tools for your entire grid infrastructure.
                </p>
              </CardContent>
            </Card>

            <Card
              className="border-border/50 shadow-lg cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setUserType("community")}
            >
              <CardHeader>
                <CardTitle>Community User</CardTitle>
                <CardDescription>For community members and local stakeholders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">
                  View local grid status, transformer activity, and submit reports about issues in your community.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            GridGuard © 2025 • Reducing Energy Losses in African Grids
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-primary rounded-lg">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">GridGuard</h1>
          </div>
          <p className="text-muted-foreground">{userType === "disco" ? "DISCO Admin Portal" : "Community Portal"}</p>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle>{userType === "disco" ? "Welcome to GridGuard" : "Community Access"}</CardTitle>
            <CardDescription>
              {userType === "disco"
                ? "Monitor your DISCO's feeder lines, transformers, and substations in real-time"
                : "View local grid status and report issues in your community"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Email or Username</label>
                <Input
                  type="text"
                  placeholder={userType === "disco" ? "admin@disco.com" : "community@example.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 bg-secondary/50 border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 bg-secondary/50 border-border"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              onClick={userType === "disco" ? handleDemoLogin : handleCommunityDemo}
              variant="outline"
              size="lg"
              className="w-full border-border/50 text-foreground hover:bg-secondary/50 bg-transparent"
            >
              Demo Account
            </Button>

            <Button
              onClick={() => setUserType(null)}
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Back to User Type Selection
            </Button>

            <p className="text-xs text-center text-muted-foreground pt-2">
              This is a demo environment with simulated sensor data
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          GridGuard © 2025 • Reducing Energy Losses in African Grids
        </p>
      </div>
    </div>
  )
}
