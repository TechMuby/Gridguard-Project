"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "blue" | "green" | "white-yellow" | "white-green"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved theme from localStorage
    const saved = localStorage.getItem("gridguard_theme") as Theme | null
    if (saved) {
      setThemeState(saved)
      applyTheme(saved)
    } else {
      applyTheme("dark")
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    // Remove all theme classes
    root.classList.remove(
      "theme-light",
      "theme-dark",
      "theme-blue",
      "theme-green",
      "theme-white-yellow",
      "theme-white-green",
    )

    // Add new theme class
    root.classList.add(`theme-${newTheme}`)

    // Save to localStorage
    localStorage.setItem("gridguard_theme", newTheme)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
