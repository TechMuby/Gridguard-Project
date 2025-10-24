"use client"

import { useState, useEffect } from "react"
import { SensorCard } from "./sensor-card"
import { SystemOverview } from "./system-overview"
import { AlertsPanel } from "./alerts-panel"
import { AIInsights } from "./ai-insights"
import { generateSensorData } from "@/lib/sensor-simulator"

export function DashboardContent() {
  const [sensorData, setSensorData] = useState<any>(null)
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    // Initial data
    const initialData = generateSensorData()
    setSensorData(initialData)
    setAlerts(initialData.alerts)

    // Update every 3 seconds
    const interval = setInterval(() => {
      const newData = generateSensorData()
      setSensorData(newData)
      setAlerts(newData.alerts)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (!sensorData) return null

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SensorCard title="Active Feeders" value={sensorData.activeDevices} unit="units" status="active" icon="⚡" />
        <SensorCard
          title="System Status"
          value={sensorData.systemStatus}
          unit=""
          status={sensorData.systemStatus === "Normal" ? "active" : "warning"}
          icon="🔍"
        />
        <SensorCard
          title="Avg Voltage"
          value={sensorData.avgVoltage}
          unit="V"
          status={sensorData.avgVoltage > 220 && sensorData.avgVoltage < 240 ? "active" : "warning"}
          icon="⚙️"
        />
        <SensorCard
          title="Energy Loss"
          value={sensorData.energyLoss}
          unit="%"
          status={sensorData.energyLoss < 15 ? "active" : "critical"}
          icon="📊"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - System Overview */}
        <div className="lg:col-span-2 space-y-6">
          <SystemOverview devices={sensorData.devices} />
        </div>

        {/* Right Column - Alerts */}
        <div>
          <AlertsPanel alerts={alerts} />
        </div>
      </div>

      {/* AI Insights */}
      <AIInsights data={sensorData} />
    </div>
  )
}
