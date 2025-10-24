"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Github, Linkedin, Twitter, Instagram, Users } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Mubarak Erinfolami",
    role: "Embedded Systems and IoT Engineer",
    bio: "Specializes in sensor integration and real-time data acquisition for grid monitoring systems.",
    socials: {
      linkedin: "https://linkedin.com/in/mubarak-erinfolami",
      twitter: "https://twitter.com/mubarak_iot",
      github: "https://github.com/mubarak-iot",
    },
  },
  {
    id: 2,
    name: "Ajibade Ifeoluwa",
    role: "AI and Software Engineer",
    bio: "Develops AI algorithms for anomaly detection and predictive maintenance in power systems.",
    socials: {
      linkedin: "https://linkedin.com/in/ajibade-ifeoluwa",
      twitter: "https://twitter.com/ajibade_ai",
      github: "https://github.com/ajibade-ai",
    },
  },
  {
    id: 3,
    name: "Faizat Olubori",
    role: "Research and Partnership Lead",
    bio: "Leads research initiatives and partnerships with African DISCO companies for real-world implementation.",
    socials: {
      linkedin: "https://linkedin.com/in/faizat-olubori",
      twitter: "https://twitter.com/faizat_research",
      instagram: "https://instagram.com/faizat_gridguard",
    },
  },
]

export default function AboutPage() {
  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">About GridGuard</h1>
        </div>
        <p className="text-muted-foreground mt-1">Learn about our mission and team</p>
      </div>

      {/* Mission Section */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground">
          <p>
            GridGuard is dedicated to solving the critical challenge of energy losses in African electricity grids. With
            30-40% of energy being lost due to faults, overloads, theft, and vandalism, we're building intelligent
            monitoring solutions that empower DISCO companies to protect their infrastructure and reduce losses.
          </p>
          <p>
            Our platform combines real-time sensor data, AI-powered analytics, and predictive maintenance to help
            African utilities operate more efficiently, reliably, and sustainably.
          </p>
        </CardContent>
      </Card>

      {/* Team Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Our Team</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="border-border/50">
              <CardHeader>
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg text-center">{member.name}</CardTitle>
                <CardDescription className="text-center">{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">{member.bio}</p>
                <div className="flex gap-2 justify-center">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
                      title="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Info */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground">
          <div>
            <h3 className="font-semibold mb-2">Technology Stack</h3>
            <p className="text-sm text-muted-foreground">
              Built with Next.js, React, TypeScript, Tailwind CSS, and powered by AI for intelligent grid analysis.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Real-time voltage and current monitoring</li>
              <li>• Tamper and vibration detection</li>
              <li>• AI-powered anomaly detection and insights</li>
              <li>• Predictive maintenance recommendations</li>
              <li>• Comprehensive reporting and analytics</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Acknowledgments</h3>
            <p className="text-sm text-muted-foreground">
              GridGuard is built in partnership with African DISCO companies and energy sector experts to address
              real-world challenges in electricity distribution.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Section */}
      <Card className="border-border/50 bg-gradient-to-br from-secondary/10 to-secondary/5">
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
          <CardDescription>Follow GridGuard on social media</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3 justify-center">
            <a
              href="https://linkedin.com/company/gridguard"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/gridguard_io"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
              title="Twitter/X"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/gridguard"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/gridguard_io"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Email: <span className="font-semibold">info@gridguard.io</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
