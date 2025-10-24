"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface CommunityReport {
  id: string
  title: string
  issueType: string
  location: string
  description: string
  status: "submitted" | "investigating" | "resolved"
  submittedAt: Date
  lastUpdated: Date
}

const sampleReports: CommunityReport[] = [
  {
    id: "CR-001",
    title: "Unusual Noise from Transformer",
    issueType: "Unusual Noise",
    location: "Lekki Main Street",
    description: "Loud humming sound coming from the transformer near the market",
    status: "investigating",
    submittedAt: new Date(Date.now() - 2 * 3600000),
    lastUpdated: new Date(Date.now() - 30 * 60000),
  },
  {
    id: "CR-002",
    title: "Burning Smell Detected",
    issueType: "Burning Smell",
    location: "Lekki Secondary Substation",
    description: "Strong burning smell detected near the substation, possible electrical fire",
    status: "investigating",
    submittedAt: new Date(Date.now() - 4 * 3600000),
    lastUpdated: new Date(Date.now() - 1 * 3600000),
  },
  {
    id: "CR-003",
    title: "Visible Damage to Transformer",
    issueType: "Visible Damage",
    location: "Lekki Industrial Zone",
    description: "Rust and corrosion visible on transformer casing, potential safety hazard",
    status: "resolved",
    submittedAt: new Date(Date.now() - 24 * 3600000),
    lastUpdated: new Date(Date.now() - 12 * 3600000),
  },
  {
    id: "CR-004",
    title: "Unauthorized Access Attempt",
    issueType: "Unauthorized Access",
    location: "Lekki Substation T-047",
    description: "Suspicious individuals seen tampering with transformer enclosure",
    status: "resolved",
    submittedAt: new Date(Date.now() - 48 * 3600000),
    lastUpdated: new Date(Date.now() - 36 * 3600000),
  },
  {
    id: "CR-005",
    title: "Power Outage in Area",
    issueType: "Power Outage",
    location: "Lekki Residential Area",
    description: "Complete power loss affecting entire neighborhood for 2 hours",
    status: "resolved",
    submittedAt: new Date(Date.now() - 72 * 3600000),
    lastUpdated: new Date(Date.now() - 60 * 3600000),
  },
  {
    id: "CR-006",
    title: "Loose Cable Connection",
    issueType: "Other",
    location: "Lekki Main Feeder Line",
    description: "Noticed loose cable connection on the main feeder line, could cause outage",
    status: "investigating",
    submittedAt: new Date(Date.now() - 6 * 3600000),
    lastUpdated: new Date(Date.now() - 2 * 3600000),
  },
]

export default function CommunityReportsPage() {
  const [mounted, setMounted] = useState(false)
  const [reports, setReports] = useState<CommunityReport[]>([])
  const [filterStatus, setFilterStatus] = useState<"all" | "submitted" | "investigating" | "resolved">("all")

  useEffect(() => {
    setMounted(true)
    setReports(sampleReports)
  }, [])

  if (!mounted) return null

  const filteredReports = filterStatus === "all" ? reports : reports.filter((r) => r.status === filterStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "investigating":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30"
      case "investigating":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
      case "resolved":
        return "bg-green-500/10 text-green-600 border-green-500/30"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
    }
  }

  const stats = {
    total: reports.length,
    submitted: reports.filter((r) => r.status === "submitted").length,
    investigating: reports.filter((r) => r.status === "investigating").length,
    resolved: reports.filter((r) => r.status === "resolved").length,
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Reports</h1>
        <p className="text-muted-foreground mt-1">Track your submitted issues and their status</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-bold text-foreground mt-2">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Submitted</p>
            <p className="text-2xl font-bold text-blue-500 mt-2">{stats.submitted}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Investigating</p>
            <p className="text-2xl font-bold text-yellow-500 mt-2">{stats.investigating}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Resolved</p>
            <p className="text-2xl font-bold text-green-500 mt-2">{stats.resolved}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "submitted", "investigating", "resolved"] as const).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? "default" : "outline"}
            onClick={() => setFilterStatus(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Reports List */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Report History</CardTitle>
          <CardDescription>All your submitted reports and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-start justify-between p-4 bg-secondary/5 rounded-lg border border-border/30 hover:border-border/50 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <FileText className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{report.title}</p>
                        <span
                          className={`px-2 py-1 rounded text-xs border flex items-center gap-1 ${getStatusColor(report.status)}`}
                        >
                          {getStatusIcon(report.status)}
                          {report.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span>📍 {report.location}</span>
                        <span>🏷️ {report.issueType}</span>
                        <span>📅 {report.submittedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="ml-4 flex-shrink-0 bg-transparent">
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No reports found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates on your reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.slice(0, 5).map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg border border-border/20"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{report.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {report.lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
