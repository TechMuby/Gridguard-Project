"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, LayoutDashboard, BarChart3, FileText, Sparkles, Settings, Info, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: Sparkles, label: "AI Assistant", href: "/dashboard/ai-assistant" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: Info, label: "About", href: "/dashboard/about" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside
      className={`${isOpen ? "w-64" : "w-20"} bg-card border-r border-border flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        {isOpen && (
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-1">
            <div className="p-2 bg-primary rounded-lg">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-foreground text-sm">GridGuard</h2>
              <p className="text-xs text-muted-foreground">Monitoring</p>
            </div>
          </Link>
        )}
        {!isOpen && (
          <Link href="/dashboard" className="flex items-center justify-center hover:opacity-80 transition-opacity">
            <div className="p-2 bg-primary rounded-lg">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
          </Link>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-secondary/50 rounded transition-colors">
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-0" : "-rotate-90"}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <div key={item.href}>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-secondary/10 transition-all",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/20",
                    !isOpen && "justify-center px-2",
                  )}
                  title={!isOpen ? item.label : ""}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {isOpen && <span>{item.label}</span>}
                </Button>
              </Link>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start text-muted-foreground hover:text-foreground transition-all",
            !isOpen && "justify-center px-2",
          )}
          onClick={() => {
            localStorage.removeItem("gridguard_session")
            window.location.href = "/"
          }}
          title={!isOpen ? "Logout" : ""}
        >
          {isOpen ? "Logout" : "←"}
        </Button>
      </div>
    </aside>
  )
}
