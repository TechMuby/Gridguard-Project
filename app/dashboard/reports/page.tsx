"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Plus, Activity } from "lucide-react"
import { generateReport, type ReportData } from "@/lib/report-generator"

const activityLogs = [
  {
    id: 1,
    timestamp: new Date(Date.now() - 5 * 60000),
    action: "Voltage spike detected",
    device: "Transformer 2",
    status: "resolved",
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 15 * 60000),
    action: "Tamper alert",
    device: "Feeder Line 1",
    status: "investigating",
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 45 * 60000),
    action: "Load optimization applied",
    device: "Substation A",
    status: "completed",
  },
  {
    id: 4,
    timestamp: new Date(Date.now() - 2 * 3600000),
    action: "Maintenance scheduled",
    device: "Transformer 3",
    status: "pending",
  },
  {
    id: 5,
    timestamp: new Date(Date.now() - 4 * 3600000),
    action: "Energy loss reduced",
    device: "Feeder Line 2",
    status: "completed",
  },
  {
    id: 6,
    timestamp: new Date(Date.now() - 6 * 3600000),
    action: "Vibration alert",
    device: "Substation B",
    status: "resolved",
  },
  {
    id: 7,
    timestamp: new Date(Date.now() - 24 * 3600000),
    action: "System backup completed",
    device: "Central Hub",
    status: "completed",
  },
  {
    id: 8,
    timestamp: new Date(Date.now() - 48 * 3600000),
    action: "Performance report generated",
    device: "All Devices",
    status: "completed",
  },
]

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false)
  const [reports, setReports] = useState<ReportData[]>([])
  const [selectedType, setSelectedType] = useState<"energy-loss" | "theft" | "performance" | "audit">("energy-loss")
  const [selectedRange, setSelectedRange] = useState<"7days" | "30days" | "90days" | "custom">("30days")
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load initial reports from localStorage
    const saved = localStorage.getItem("gridguard_reports")
    if (saved) {
      setReports(JSON.parse(saved))
    } else {
      const sampleReports = [
        generateReport("energy-loss", "30days"),
        generateReport("theft", "30days"),
        generateReport("performance", "7days"),
      ]
      setReports(sampleReports)
      localStorage.setItem("gridguard_reports", JSON.stringify(sampleReports))
    }
  }, [])

  const handleGenerateReport = () => {
    setGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      const newReport = generateReport(selectedType, selectedRange)
      const updated = [newReport, ...reports]
      setReports(updated)
      localStorage.setItem("gridguard_reports", JSON.stringify(updated))
      setGenerating(false)
    }, 1000)
  }

  const handleDownload = (report: ReportData) => {
    // Simulate download
    const content = JSON.stringify(report, null, 2)
    const blob = new Blob([content], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${report.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!mounted) return null

  const totalReports = reports.length
  const thisMonth = reports.filter((r) => {
    const reportDate = new Date(r.generatedAt)
    const now = new Date()
    return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear()
  }).length

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/30"
      case "investigating":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
      case "pending":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30"
      case "resolved":
        return "bg-cyan-500/10 text-cyan-600 border-cyan-500/30"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-1">Generate and download system reports</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-bold text-foreground mt-2">{totalReports}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold text-foreground mt-2">{thisMonth}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Storage Used</p>
            <p className="text-2xl font-bold text-foreground mt-2">{(totalReports * 2.4).toFixed(1)} MB</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Download and view your generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-border/30"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{report.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.generatedAt.toLocaleDateString()} • {report.dateRange}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                      onClick={() => handleDownload(report)}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activity Log
              </CardTitle>
              <CardDescription>Recent system activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {activityLogs.map((log) => (
                <div key={log.id} className="text-xs space-y-1 pb-2 border-b border-border/20 last:border-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{log.action}</p>
                    <span className={`px-2 py-0.5 rounded text-xs border ${getActivityStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{log.device}</p>
                  <p className="text-muted-foreground/70">
                    {log.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Generate New Report */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create a custom report for your analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Report Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground"
              >
                <option value="energy-loss">Energy Loss Analysis</option>
                <option value="theft">Theft & Vandalism</option>
                <option value="performance">Device Performance</option>
                <option value="audit">System Audit</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Date Range</label>
              <select
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value as any)}
                className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
          <Button
            onClick={handleGenerateReport}
            disabled={generating}
            className="w-full bg-primary hover:bg-primary/90 gap-2"
          >
            <Plus className="w-4 h-4" />
            {generating ? "Generating..." : "Generate Report"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
