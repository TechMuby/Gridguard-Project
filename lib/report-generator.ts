export interface ReportData {
  id: string
  title: string
  type: "energy-loss" | "theft" | "performance" | "audit"
  dateRange: string
  generatedAt: Date
  data: any
}

export function generateReport(
  type: "energy-loss" | "theft" | "performance" | "audit",
  dateRange: "7days" | "30days" | "90days" | "custom",
): ReportData {
  const now = new Date()
  const reportId = `report-${Date.now()}`

  // Generate sample data based on report type
  let data: any = {}

  switch (type) {
    case "energy-loss":
      data = {
        totalLoss: 14.2,
        technicalLoss: 8.5,
        theftLoss: 5.7,
        trend: "↓ 2.1% from last period",
        topDevices: [
          { name: "Feeder Line 1", loss: 3.2 },
          { name: "Transformer 3", loss: 2.8 },
          { name: "Substation A", loss: 2.1 },
        ],
      }
      break
    case "theft":
      data = {
        incidents: 23,
        thisMonth: 5,
        trend: "↑ 5 incidents",
        locations: [
          { area: "Zone A", incidents: 8 },
          { area: "Zone B", incidents: 7 },
          { area: "Zone C", incidents: 8 },
        ],
      }
      break
    case "performance":
      data = {
        uptime: 99.8,
        avgVoltage: 230.5,
        avgCurrent: 58.3,
        devicesMonitored: 1247,
        alerts: 12,
      }
      break
    case "audit":
      data = {
        systemHealth: "Excellent",
        compliance: 98.5,
        issues: 3,
        recommendations: 5,
      }
      break
  }

  const dateRangeText = {
    "7days": "Last 7 Days",
    "30days": "Last 30 Days",
    "90days": "Last 90 Days",
    custom: "Custom Range",
  }

  return {
    id: reportId,
    title: `${type.replace("-", " ").toUpperCase()} Report`,
    type,
    dateRange: dateRangeText[dateRange],
    generatedAt: now,
    data,
  }
}
