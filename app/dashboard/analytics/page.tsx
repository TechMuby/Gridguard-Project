"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { generateSensorData } from "@/lib/sensor-simulator"

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)
  const [sensorData, setSensorData] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    // Get initial data
    const data = generateSensorData()
    setSensorData(data)

    // Update every 3 seconds
    const interval = setInterval(() => {
      setSensorData(generateSensorData())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted || !sensorData) return null

  const voltageData = [
    { time: "00:00", voltage: 228, current: 45 },
    { time: "04:00", voltage: 232, current: 52 },
    { time: "08:00", voltage: 235, current: 68 },
    { time: "12:00", voltage: sensorData.avgVoltage, current: sensorData.avgCurrent },
    { time: "16:00", voltage: 228, current: 70 },
    { time: "20:00", voltage: 231, current: 58 },
    { time: "24:00", voltage: 229, current: 48 },
  ]

  const lossData = [
    { day: "Mon", loss: 14.2, theft: 3.1 },
    { day: "Tue", loss: 13.8, theft: 2.9 },
    { day: "Wed", loss: 15.1, theft: 3.5 },
    { day: "Thu", loss: 14.5, theft: 3.2 },
    { day: "Fri", loss: 16.2, theft: 4.1 },
    { day: "Sat", loss: 12.8, theft: 2.5 },
    { day: "Sun", loss: sensorData.energyLoss, theft: sensorData.energyLoss * 0.4 },
  ]

  const deviceStatusData = [
    { name: "Normal", value: sensorData.devices.filter((d: any) => d.status === "Normal").length },
    { name: "Warning", value: sensorData.devices.filter((d: any) => d.status === "Warning").length },
  ]

  const COLORS = ["#0ea5e9", "#f97316"]

  return (
    <div className="p-6 space-y-6 bg-background">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Historical trends and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg Daily Loss</p>
            <p className="text-2xl font-bold text-foreground mt-2">{sensorData.energyLoss.toFixed(1)}%</p>
            <p className="text-xs text-green-500 mt-1">↓ 2.1% from last week</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Theft Incidents</p>
            <p className="text-2xl font-bold text-foreground mt-2">
              {sensorData.alerts.filter((a: any) => a.type === "critical").length}
            </p>
            <p className="text-xs text-red-500 mt-1">↑ 5 this month</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Uptime</p>
            <p className="text-2xl font-bold text-foreground mt-2">99.8%</p>
            <p className="text-xs text-green-500 mt-1">Excellent</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Devices Monitored</p>
            <p className="text-2xl font-bold text-foreground mt-2">{sensorData.activeDevices}</p>
            <p className="text-xs text-blue-500 mt-1">All active</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>24-Hour Voltage & Current</CardTitle>
            <CardDescription>Real-time monitoring data</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={voltageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="voltage" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="current" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Weekly Energy Loss</CardTitle>
            <CardDescription>Technical vs. Theft losses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="loss" fill="#0ea5e9" />
                <Bar dataKey="theft" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Status */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Device Status Distribution</CardTitle>
          <CardDescription>Current system health overview</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
