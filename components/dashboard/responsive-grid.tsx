"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface ResponsiveGridProps {
  children: React.ReactNode
  columns?: {
    mobile: number
    tablet: number
    desktop: number
  }
}

export function ResponsiveGrid({ children, columns = { mobile: 1, tablet: 2, desktop: 3 } }: ResponsiveGridProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{children}</div>
}
