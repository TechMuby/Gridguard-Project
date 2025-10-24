"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Zap, MapPin, Phone } from "lucide-react"

export default function CommunityDashboard() {
  const [loginTime, setLoginTime] = useState<number | null>(null)
  const [showTheftAlert, setShowTheftAlert] = useState(false)
  const [gridStatus, setGridStatus] = useState("normal")

  useEffect(() => {
    // Record login time
    setLoginTime(Date.now())
  }, [])

  useEffect(() => {
    if (!loginTime) return

    // Trigger theft alert after 1 minute (60000ms)
    const timer = setTimeout(() => {
      setShowTheftAlert(true)
      setGridStatus("critical")
    }, 60000)

    return () => clearTimeout(timer)
  }, [loginTime])

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Community Grid Monitor</h1>
        <p className="text-muted-foreground mt-1">Local transformer and grid status for your area</p>
      </div>

      {showTheftAlert && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">CRITICAL: Theft Alert Detected!</AlertTitle>
          <AlertDescription className="text-destructive/90 mt-2">
            <p className="font-semibold mb-2">Transformer Tampering Detected at Local Substation</p>
            <p className="text-sm mb-3">
              Our sensors have detected unauthorized access and tampering at Transformer Unit T-047 in your area. This
              is a critical security incident.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Location:</strong> Lekki Substation, Transformer T-047
              </p>
              <p>
                <strong>Time Detected:</strong> {new Date().toLocaleTimeString()}
              </p>
              <p>
                <strong>Status:</strong> Active Tampering - Immediate Action Required
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="bg-destructive hover:bg-destructive/90">
                Report to DISCO
              </Button>
              <Button size="sm" variant="outline" className="border-destructive/50 bg-transparent">
                View Details
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Grid Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Grid Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${gridStatus === "critical" ? "bg-destructive animate-pulse" : "bg-green-500"}`}
              />
              <span className="text-lg font-semibold text-foreground capitalize">{gridStatus}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Voltage Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">230V</p>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{showTheftAlert ? "1" : "0"}</p>
            <p className="text-xs text-muted-foreground">{showTheftAlert ? "Critical" : "None"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Local Transformer Activity */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Local Transformer Activity</CardTitle>
          <CardDescription>Real-time status of transformers in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "T-045", location: "Lekki Main", voltage: "230V", current: "45A", status: "normal", tamper: false },
              {
                id: "T-046",
                location: "Lekki Secondary",
                voltage: "230V",
                current: "38A",
                status: "normal",
                tamper: false,
              },
              {
                id: "T-047",
                location: "Lekki Substation",
                voltage: "225V",
                current: "52A",
                status: showTheftAlert ? "critical" : "warning",
                tamper: showTheftAlert,
              },
              {
                id: "T-048",
                location: "Lekki Industrial",
                voltage: "230V",
                current: "41A",
                status: "normal",
                tamper: false,
              },
            ].map((transformer) => (
              <div
                key={transformer.id}
                className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      transformer.status === "critical"
                        ? "bg-destructive/20"
                        : transformer.status === "warning"
                          ? "bg-yellow-500/20"
                          : "bg-green-500/20"
                    }`}
                  >
                    <Zap
                      className={`w-4 h-4 ${
                        transformer.status === "critical"
                          ? "text-destructive"
                          : transformer.status === "warning"
                            ? "text-yellow-500"
                            : "text-green-500"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{transformer.id}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {transformer.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">
                    {transformer.voltage} / {transformer.current}
                  </p>
                  {transformer.tamper && (
                    <p className="text-xs text-destructive font-semibold flex items-center gap-1 justify-end">
                      <AlertTriangle className="w-3 h-3" />
                      Tampering!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Submission */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Report an Issue</CardTitle>
          <CardDescription>Help us keep the grid safe by reporting problems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Issue Type</label>
              <select className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground">
                <option>Unusual Noise</option>
                <option>Burning Smell</option>
                <option>Visible Damage</option>
                <option>Unauthorized Access</option>
                <option>Power Outage</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Location</label>
              <input
                type="text"
                placeholder="Nearest transformer or street"
                className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              placeholder="Describe the issue in detail..."
              className="w-full mt-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground"
              rows={3}
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Submit Report</Button>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="border-border/50 bg-gradient-to-br from-secondary/10 to-secondary/5">
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
          <CardDescription>For immediate grid emergencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/50 rounded-lg">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">DISCO Emergency Hotline</p>
              <p className="text-lg font-semibold text-foreground">+234 (0) 700-GRID-911</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
