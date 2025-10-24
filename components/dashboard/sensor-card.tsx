import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SensorCardProps {
  title: string
  value: number | string
  unit: string
  status: "active" | "warning" | "critical"
  icon: string
}

export function SensorCard({ title, value, unit, status, icon }: SensorCardProps) {
  const statusColors = {
    active: "border-green-500/30 bg-green-500/5",
    warning: "border-yellow-500/30 bg-yellow-500/5",
    critical: "border-red-500/30 bg-red-500/5",
  }

  const statusIndicators = {
    active: "bg-green-500",
    warning: "bg-yellow-500",
    critical: "bg-red-500",
  }

  return (
    <Card className={cn("border", statusColors[status])}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{value}</span>
              <span className="text-xs text-muted-foreground">{unit}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-2xl">{icon}</span>
            <div className={cn("w-2 h-2 rounded-full", statusIndicators[status])} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
