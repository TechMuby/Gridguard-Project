import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { messages, gridData } = await request.json()

    // Create a system prompt with current grid context
    const systemPrompt = `You are GridGuard AI Assistant, an expert in electricity grid monitoring and loss prevention for DISCO (Distribution Company) operations in Africa. 

Current Grid Status:
- Active Devices: ${gridData.activeDevices}
- System Status: ${gridData.systemStatus}
- Average Voltage: ${gridData.avgVoltage}V
- Average Current: ${gridData.avgCurrent}A
- Energy Loss: ${gridData.energyLoss}%

Device Details:
${gridData.devices
  .map(
    (d: any) =>
      `- ${d.name}: Voltage ${d.voltage.toFixed(1)}V, Current ${d.current.toFixed(1)}A, Status: ${d.status}${d.tamper ? " [TAMPER ALERT]" : ""}${d.vibration > 4 ? " [HIGH VIBRATION]" : ""}`,
  )
  .join("\n")}

Active Alerts: ${gridData.alerts.length}
${gridData.alerts.map((a: any) => `- [${a.type.toUpperCase()}] ${a.title}: ${a.message}`).join("\n")}

Your role is to:
1. Analyze grid data and identify anomalies
2. Provide actionable recommendations for DISCO operations
3. Help detect and prevent electricity theft
4. Predict maintenance needs
5. Optimize grid performance
6. Explain technical issues in clear terms

Be concise, professional, and focus on practical solutions. Always prioritize safety and loss prevention.`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    })

    return Response.json({ content: text })
  } catch (error) {
    console.error("AI API error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
