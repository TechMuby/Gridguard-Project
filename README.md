# GridGuard - Electricity Grid Monitoring & Loss Prevention

A real-time monitoring dashboard for DISCO (Distribution Company) operations in Africa, featuring AI-powered insights, real-time sensor data visualization, and comprehensive analytics.

## Features

- **Real-Time Dashboard**: Live monitoring of feeder lines, transformers, and substations
- **AI Assistant**: Intelligent insights and recommendations powered by OpenAI
- **Analytics**: Historical trends, performance metrics, and device status visualization
- **Reports**: Generate and download comprehensive system reports
- **Alerts**: Real-time detection of tamper, theft, and anomalies
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS v4
- **Charts**: Recharts for data visualization
- **AI**: Vercel AI SDK with OpenAI integration
- **Styling**: Dark mode optimized with custom design tokens

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd gridguard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your OpenAI API key to `.env.local`:
\`\`\`
OPENAI_API_KEY=your_api_key_here
\`\`\`

### Development

Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
vercel
\`\`\`

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in the Vercel dashboard
5. Deploy

### Environment Variables

Set these in your Vercel project settings:

- `OPENAI_API_KEY`: Your OpenAI API key for AI Assistant functionality

## Project Structure

\`\`\`
gridguard/
├── app/
│   ├── page.tsx                 # Login page
│   ├── dashboard/
│   │   ├── page.tsx            # Main dashboard
│   │   ├── analytics/          # Analytics page
│   │   ├── reports/            # Reports page
│   │   ├── ai-assistant/       # AI Assistant page
│   │   └── settings/           # Settings page
│   ├── api/
│   │   └── ai/chat/            # AI chat API route
│   └── layout.tsx              # Root layout
├── components/
│   ├── dashboard/              # Dashboard components
│   ├── ui/                     # shadcn/ui components
│   ├── sidebar.tsx             # Navigation sidebar
│   └── header.tsx              # Header component
├── lib/
│   ├── sensor-simulator.ts     # Mock sensor data
│   ├── report-generator.ts     # Report generation
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
\`\`\`

## Features Overview

### Dashboard
- Real-time sensor data from 5 devices (feeders, transformers, substations)
- System status overview with key metrics
- Active alerts panel with tamper and anomaly detection
- AI-powered insights card

### Analytics
- 24-hour voltage and current trends
- Weekly energy loss breakdown (technical vs. theft)
- Device status distribution
- Key performance metrics

### Reports
- Generate custom reports by type and date range
- Download reports as JSON files
- Track report history and storage usage
- Support for multiple report types:
  - Energy Loss Analysis
  - Theft & Vandalism
  - Device Performance
  - System Audit

### AI Assistant
- Real-time chat interface with context-aware responses
- Access to current grid data for intelligent analysis
- Quick insight suggestions
- Conversation history

## Authentication

The app uses localStorage-based demo authentication. For production, integrate with:
- Supabase Auth
- Auth0
- NextAuth.js
- Your custom authentication system

## Performance Optimization

- Server-side rendering for fast initial load
- Real-time data updates every 3 seconds
- Optimized chart rendering with Recharts
- Responsive design with Tailwind CSS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For issues and feature requests, please open an issue on GitHub.
