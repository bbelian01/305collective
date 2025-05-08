"use client";

import { useState } from "react"
import { BarChart, Briefcase, Lightbulb, Megaphone, Palette, Rocket, Monitor, Settings, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Megaphone,
    title: "Marketing & Growth Strategy",
    desc: "How to get more customers and build visibility",
    bullets: [
      "Social media strategy and content calendars",
      "Brand positioning and messaging",
      "Email campaign design and setup",
      "Advertising strategy (Facebook/Instagram/Google Ads)",
    ],
  },
  {
    icon: Monitor,
    title: "Website & Digital Presence",
    desc: "Creating or improving your online home",
    bullets: [
      "Website builds",
      "Landing pages optimized for conversions",
      "SEO basics",
      "Google Analytics setup and training",
    ],
  },
  {
    icon: Palette,
    title: "Brand Identity & Visual Design",
    desc: "Making your brand look legit and consistent",
    bullets: [
      "Logo design or refinement",
      "Brand kits (fonts, colors, tone, usage)",
      "Canva post templates for Instagram & LinkedIn",
      "Pitch decks and presentations",
    ],
  },
  {
    icon: BarChart,
    title: "Tech Setup & Workflow Optimization",
    desc: "Building smarter systems to save time",
    bullets: [
      "CRM setup and organization (Notion, Airtable, HubSpot)",
      "Workflow automation (e.g., Google Forms → Sheets → Email)",
      "Dashboard creation (KPI tracking, content calendars, CRM pipelines)",
      "Tool recommendations and onboarding (task managers, file systems, etc.)",
    ],
  },
  {
    icon: Settings,
    title: "Tech Support & System Setup",
    desc: "Helping non-technical users upgrade and manage their tech",
    bullets: [
      "Computer upgrade recommendations (RAM, SSD, hardware)",
      "System setup (PC/Mac, new device configuration)",
      "Data transfer and backup setup",
      "Software troubleshooting and installation (QuickBooks, Outlook, Zoom, etc.)",
      "Personalized tech training (email syncing, cloud storage, video calls, etc.)",
    ],
  },
  {
    icon: Users,
    title: "Brand Activation & Community Engagement",
    desc: "Helping brands connect through events and campaigns",
    bullets: [
      "Launch/event branding (logos, names, social graphics, promo content)",
      "Experience planning (run-of-show docs, engagement strategy)",
      "Promotional content (Instagram Reels, flyers, recap videos)",
      "Audience interaction tactics (from live events to digital launches)",
      "Post-event campaign content (recaps, testimonials, social proof assets)",
    ],
  },
]

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const handleToggle = (i: number) => setExpanded(expanded === i ? null : i)

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#F8F8F8] via-[#F5F5F5] to-[#E9F7F1] border-b-4 border-[#D96F32]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-5 py-2 rounded-full bg-[#004B2D]/10 text-[#004B2D] text-sm font-semibold mb-6">Most Common Solution Areas</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#004B2D]">How We Help</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            We help startups, small businesses, and student-led ventures solve real problems across strategy, tech, branding, and execution — with modern, flexible solutions rooted in real experience.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map(({ icon: Icon, title, desc, bullets }, i) => (
              <Card
                key={i}
                className={`group p-0 border-2 border-[#E9F7F1] hover:border-[#D96F32] shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white cursor-pointer relative overflow-hidden ${expanded === i ? "ring-2 ring-[#D96F32]" : ""}`}
                onMouseEnter={() => setExpanded(i)}
                onMouseLeave={() => setExpanded(null)}
                onClick={() => handleToggle(i)}
                tabIndex={0}
                aria-expanded={expanded === i}
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#004B2D]/10 mb-6 group-hover:bg-[#D96F32]/10 transition-colors">
                    <Icon className="h-8 w-8 text-[#004B2D] group-hover:text-[#D96F32] transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-[#004B2D] group-hover:text-[#D96F32] transition-colors">{title}</h3>
                  <p className="text-gray-600 text-lg mb-2">{desc}</p>
                  <ul
                    className={`transition-all duration-300 ease-in-out text-sm text-gray-700 mt-2 space-y-2 text-left ${expanded === i ? "max-h-60 opacity-100 py-2" : "max-h-0 opacity-0 py-0 pointer-events-none"}`}
                    style={{ minHeight: expanded === i ? 40 : 0 }}
                  >
                    {bullets.map((b, j) => (
                      <li key={j} className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#D96F32] before:font-bold">{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <div className="w-full h-2 bg-gradient-to-r from-[#004B2D] via-[#D96F32] to-[#E9F7F1] my-12 rounded-full opacity-70" />

      {/* Call to Action */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#004B2D]">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Let's work together to achieve your business goals.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://tally.so/r/3xo409" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#D96F32] text-white font-semibold px-8 py-4 rounded-lg text-lg shadow hover:bg-[#004B2D] transition-colors">Start a Project</a>
            <a href="/contact" className="inline-block border-2 border-[#004B2D] text-[#004B2D] font-semibold px-8 py-4 rounded-lg text-lg hover:bg-[#004B2D] hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
