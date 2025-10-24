import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Device {
  id: string
  name: string
  type: string
  voltage: number
  current: number
  tamper: boolean
  vibration: number
  status: string
}

interface SystemOverviewProps {
  devices: Device[]
}

export function SystemOverview({ devices }: SystemOverviewProps) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>System Overview</CardTitle>
        <CardDescription>Real-time device monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {devices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg border border-border/30"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{device.name}</p>
                <p className="text-xs text-muted-foreground">
                  {device.voltage.toFixed(1)}V • {device.current.toFixed(1)}A • Vibration: {device.vibration.toFixed(1)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {device.tamper && (
                  <Badge variant="destructive" className="text-xs">
                    Tamper
                  </Badge>
                )}
                <Badge variant={device.status === "Normal" ? "default" : "secondary"} className="text-xs">
                  {device.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
