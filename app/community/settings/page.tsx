"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Lock, User, Palette } from "lucide-react"
import { useTheme } from "@/lib/theme-context"

const themeColors = [
  { id: "light", name: "Light", preview: "bg-white text-black border-2 border-gray-300" },
  { id: "dark", name: "Dark", preview: "bg-slate-900 text-white border-2 border-slate-700" },
  { id: "blue", name: "Blue", preview: "bg-blue-950 text-blue-100 border-2 border-blue-700" },
  { id: "green", name: "Green", preview: "bg-green-950 text-green-100 border-2 border-green-700" },
  { id: "white-yellow", name: "White & Yellow", preview: "bg-white text-yellow-900 border-2 border-yellow-400" },
  { id: "white-green", name: "White & Green", preview: "bg-white text-green-900 border-2 border-green-400" },
]

function CommunitySettingsContent() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("account")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your community account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Menu */}
        <div className="space-y-2">
          <Button
            variant={activeTab === "account" ? "default" : "ghost"}
            className="w-full justify-start gap-2 text-foreground hover:bg-secondary/50"
            onClick={() => setActiveTab("account")}
          >
            <User className="w-4 h-4" />
            Account
          </Button>
          <Button
            variant={activeTab === "notifications" ? "default" : "ghost"}
            className="w-full justify-start gap-2 text-foreground hover:bg-secondary/50"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="w-4 h-4" />
            Notifications
          </Button>
          <Button
            variant={activeTab === "theme" ? "default" : "ghost"}
            className="w-full justify-start gap-2 text-foreground hover:bg-secondary/50"
            onClick={() => setActiveTab("theme")}
          >
            <Palette className="w-4 h-4" />
            Theme
          </Button>
          <Button
            variant={activeTab === "security" ? "default" : "ghost"}
            className="w-full justify-start gap-2 text-foreground hover:bg-secondary/50"
            onClick={() => setActiveTab("security")}
          >
            <Lock className="w-4 h-4" />
            Security
          </Button>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Settings */}
          {activeTab === "account" && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your community account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+234 XXX XXX XXXX"
                    className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Control how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Critical Alerts</p>
                    <p className="text-sm text-muted-foreground">Theft and tampering detection</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Power Outage Alerts</p>
                    <p className="text-sm text-muted-foreground">Notifications about power disruptions</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Report Updates</p>
                    <p className="text-sm text-muted-foreground">Updates on your submitted reports</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Theme Settings */}
          {activeTab === "theme" && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Theme Colors</CardTitle>
                <CardDescription>Choose your preferred color theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {themeColors.map((themeOption) => (
                    <button
                      key={themeOption.id}
                      onClick={() => setTheme(themeOption.id as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === themeOption.id
                          ? "border-primary bg-primary/10"
                          : "border-border/30 hover:border-border/50"
                      }`}
                    >
                      <div className={`w-full h-20 rounded-md mb-2 ${themeOption.preview}`} />
                      <p className="font-medium text-foreground text-sm">{themeOption.name}</p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Theme changes are applied immediately and saved to your preferences.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90">Update Password</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CommunitySettingsPage() {
  return <CommunitySettingsContent />
}
