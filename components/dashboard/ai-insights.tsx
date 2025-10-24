import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface AIInsightsProps {
  data: any
}

export function AIInsights({ data }: AIInsightsProps) {
  const insights = [
    {
      id: 1,
      title: "Possible Overload Detected",
      description: `Transformer 3 is operating at ${data.devices[2]?.current.toFixed(1) || "N/A"}A, approaching maximum capacity.`,
      severity: "warning",
    },
    {
      id: 2,
      title: "Voltage Fluctuation",
      description: `Feeder Line 2 showing voltage variance of ${Math.abs(data.devices[1]?.voltage - 230).toFixed(1)}V from nominal.`,
      severity: "info",
    },
    {
      id: 3,
      title: "Energy Loss Trend",
      description: `Current energy loss at ${data.energyLoss}% - monitor for potential theft or technical losses.`,
      severity: data.energyLoss > 20 ? "critical" : "warning",
    },
  ]

  return (
    <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <div>
            <CardTitle>AI Assistant Insights</CardTitle>
            <CardDescription>Real-time analysis and recommendations</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${
                insight.severity === "critical"
                  ? "border-red-500/30 bg-red-500/5"
                  : insight.severity === "warning"
                    ? "border-yellow-500/30 bg-yellow-500/5"
                    : "border-blue-500/30 bg-blue-500/5"
              }`}
            >
              <p className="font-medium text-foreground text-sm">{insight.title}</p>
              <p className="text-xs text-muted-foreground mt-2">{insight.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
