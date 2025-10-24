import type React from "react"
import { CommunitySidebar } from "@/components/community-sidebar"

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <CommunitySidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
