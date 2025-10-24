"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Lightbulb, TrendingUp, AlertTriangle, Zap } from "lucide-react"

const dummySuggestions = [
  {
    id: 1,
    title: "Possible Overload Detected",
    description: "Transformer 3 is operating at 92% capacity. Consider load redistribution.",
    icon: AlertTriangle,
    severity: "warning",
  },
  {
    id: 2,
    title: "Energy Loss Optimization",
    description: "Feeder Line 2 shows 8.5% losses. Recommend voltage optimization.",
    icon: TrendingUp,
    severity: "info",
  },
  {
    id: 3,
    title: "Maintenance Alert",
    description: "Substation A vibration levels elevated. Schedule preventive maintenance.",
    icon: Zap,
    severity: "warning",
  },
  {
    id: 4,
    title: "Theft Prevention",
    description: "Unusual tamper activity detected at Transformer 1. Investigate immediately.",
    icon: AlertTriangle,
    severity: "critical",
  },
  {
    id: 5,
    title: "Performance Trend",
    description: "Device efficiency improved by 3.2% this week. Continue current settings.",
    icon: TrendingUp,
    severity: "success",
  },
]

export default function AIAssistantPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 border-red-500/30 text-red-600"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-600"
      case "success":
        return "bg-green-500/10 border-green-500/30 text-green-600"
      default:
        return "bg-blue-500/10 border-blue-500/30 text-blue-600"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
        </div>
        <p className="text-muted-foreground">Get intelligent insights and recommendations for your grid</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Suggestions */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Suggestions & Insights
              </CardTitle>
              <CardDescription>Real-time analysis of your grid performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {dummySuggestions.map((suggestion) => {
                const Icon = suggestion.icon
                return (
                  <div
                    key={suggestion.id}
                    className={`p-4 rounded-lg border ${getSeverityColor(suggestion.severity)} space-y-2`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{suggestion.title}</h3>
                        <p className="text-xs opacity-90 mt-1">{suggestion.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
              <div>
                <p className="text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
              <div>
                <p className="text-muted-foreground">Optimizations</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>✓ Real-time anomaly detection</p>
              <p>✓ Predictive maintenance</p>
              <p>✓ Theft pattern analysis</p>
              <p>✓ Load forecasting</p>
              <p>✓ Optimization recommendations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
