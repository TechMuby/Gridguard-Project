"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, LayoutDashboard, AlertTriangle, FileText, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/community/dashboard" },
  { icon: AlertTriangle, label: "Report Issue", href: "/community/report" },
  { icon: FileText, label: "My Reports", href: "/community/reports" },
  { icon: Settings, label: "Settings", href: "/community/settings" },
]

export function CommunitySidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/community/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="p-2 bg-primary rounded-lg">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">GridGuard</h2>
            <p className="text-xs text-muted-foreground">Community</p>
          </div>
        </Link>
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
                    "w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-secondary/10",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/20",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
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
          className="w-full justify-start text-muted-foreground hover:text-foreground gap-2"
          onClick={() => {
            localStorage.removeItem("gridguard_session")
            localStorage.removeItem("gridguard_user_type")
            window.location.href = "/"
          }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
