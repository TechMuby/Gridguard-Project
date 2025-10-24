export function generateSensorData() {
  // Simulate 5 devices
  const devices = [
    {
      id: "feeder-1",
      name: "Feeder Line 1",
      type: "Feeder",
      voltage: 230 + Math.random() * 20 - 10,
      current: 50 + Math.random() * 30,
      tamper: Math.random() > 0.95,
      vibration: Math.random() * 5,
      status: Math.random() > 0.9 ? "Warning" : "Normal",
    },
    {
      id: "feeder-2",
      name: "Feeder Line 2",
      type: "Feeder",
      voltage: 230 + Math.random() * 20 - 10,
      current: 45 + Math.random() * 35,
      tamper: Math.random() > 0.97,
      vibration: Math.random() * 4,
      status: Math.random() > 0.85 ? "Warning" : "Normal",
    },
    {
      id: "transformer-1",
      name: "Transformer 3",
      type: "Transformer",
      voltage: 230 + Math.random() * 15 - 7,
      current: 60 + Math.random() * 40,
      tamper: Math.random() > 0.98,
      vibration: Math.random() * 6,
      status: Math.random() > 0.8 ? "Warning" : "Normal",
    },
    {
      id: "substation-1",
      name: "Substation A",
      type: "Substation",
      voltage: 230 + Math.random() * 18 - 9,
      current: 55 + Math.random() * 32,
      tamper: Math.random() > 0.96,
      vibration: Math.random() * 3,
      status: "Normal",
    },
    {
      id: "substation-2",
      name: "Substation B",
      type: "Substation",
      voltage: 230 + Math.random() * 18 - 9,
      current: 52 + Math.random() * 28,
      tamper: Math.random() > 0.99,
      vibration: Math.random() * 2,
      status: "Normal",
    },
  ]

  // Generate alerts based on conditions
  const alerts = []

  devices.forEach((device) => {
    if (device.tamper) {
      alerts.push({
        id: `tamper-${device.id}`,
        type: "critical",
        title: "Tamper Detected",
        message: `Tamper alert on ${device.name}. Possible theft or vandalism.`,
        timestamp: new Date().toLocaleTimeString(),
      })
    }

    if (device.status === "Warning") {
      alerts.push({
        id: `warning-${device.id}`,
        type: "warning",
        title: "Abnormal Reading",
        message: `${device.name} showing abnormal voltage/current readings.`,
        timestamp: new Date().toLocaleTimeString(),
      })
    }

    if (device.vibration > 4) {
      alerts.push({
        id: `vibration-${device.id}`,
        type: "warning",
        title: "High Vibration",
        message: `${device.name} experiencing elevated vibration levels.`,
        timestamp: new Date().toLocaleTimeString(),
      })
    }
  })

  const avgVoltage = devices.reduce((sum, d) => sum + d.voltage, 0) / devices.length
  const avgCurrent = devices.reduce((sum, d) => sum + d.current, 0) / devices.length
  const energyLoss = 12 + Math.random() * 8

  return {
    devices,
    alerts: alerts.slice(0, 5), // Limit to 5 most recent
    activeDevices: devices.length,
    avgVoltage: Math.round(avgVoltage * 10) / 10,
    avgCurrent: Math.round(avgCurrent * 10) / 10,
    energyLoss: Math.round(energyLoss * 10) / 10,
    systemStatus: alerts.length > 3 ? "Warning" : "Normal",
  }
}
