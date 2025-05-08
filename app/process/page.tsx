"use client";

import { Workflow } from "lucide-react"

const steps = [
  {
    title: "1. Intake & Discovery",
    bullets: [
      "Client fills out a short form to tell us what they need",
      "We review it and schedule a 15–30-minute call",
      "This helps us understand their goals, problems, and priorities",
    ],
    color: "#004B2D"
  },
  {
    title: "2. Project Assignment",
    bullets: [
      "We assign a Project Lead from our team based on the client's needs",
      "That person becomes the main point of contact and manages the timeline",
      "Other team members support where needed",
    ],
    color: "#D96F32"
  },
  {
    title: "3. Strategy & Execution",
    bullets: [
      "We help create a solution that fits the client's goals and budget",
      "The team creates a reasonable timeline and expectation for the client",
      "The team builds out the deliverables (e.g. brand kit, website, content plan)",
      "We maintain regular check-ins to show progress and get feedback",
    ],
    color: "#004B2D"
  },
  {
    title: "4. Delivery & Handoff",
    bullets: [
      "Final deliverables are presented with a short walk-through",
      "The team provides necessary steps and directions to help the client use the deliverable on their own",
    ],
    color: "#D96F32"
  },
  {
    title: "5. Feedback & Follow-Up",
    bullets: [
      "We ask for feedback, testimonials, and optional reviews",
      "We check in after 30 days to see how the solution is working",
      "If needed, we offer tweaks or additional support",
    ],
    color: "#004B2D"
  },
]

export default function ProcessPage() {
  return (
    <main className="bg-gradient-to-br from-[#E9F7F1] via-white to-[#F8F8F8] min-h-screen">
      {/* Hero Section */}
      <section className="py-24 border-b-4 border-[#D96F32]">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-[#D96F32]/10 text-[#D96F32] text-lg font-bold tracking-wide shadow-md">
              <Workflow className="w-7 h-7 mr-3 text-[#D96F32]" /> Our Process
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#004B2D]">How We Work</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Our process is designed to be collaborative, transparent, and results-driven—ensuring you get real value at every step.
          </p>
        </div>
      </section>

      {/* Timeline Steps */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="relative w-full max-w-4xl">
            {/* Softer, lighter vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B6E2D3] via-[#F7C6A3] to-[#F8F8F8] rounded-full -translate-x-1/2 z-0" />
            <div className="flex flex-col gap-32 relative z-10">
              {steps.map(({ title, bullets, color }, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-center md:items-stretch min-h-[140px]`}> 
                  {/* Step for desktop: alternate left/right */}
                  {i % 2 === 0 ? (
                    <>
                      {/* Content left, circle center, empty right */}
                      <div className="w-full md:w-1/2 flex flex-col items-end pr-8 md:pr-16 text-right">
                        <div className="flex flex-col items-end">
                          <div className="h-8 w-2 rounded-full mb-4" style={{ backgroundColor: color, opacity: 0.15 }} />
                          <h3 className="text-3xl font-extrabold mb-4" style={{ color }}>{title}</h3>
                        </div>
                        <ul className="text-lg text-gray-700 space-y-3">
                          {bullets.map((b, j) => (
                            <li key={j} className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-[#D96F32] before:opacity-70">{b}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col items-center z-20 justify-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-2" style={{ backgroundColor: color }}>
                          <span className="text-white text-3xl font-extrabold">{i + 1}</span>
                        </div>
                      </div>
                      <div className="hidden md:block w-1/2" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block w-1/2" />
                      <div className="flex flex-col items-center z-20 justify-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-2" style={{ backgroundColor: color }}>
                          <span className="text-white text-3xl font-extrabold">{i + 1}</span>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col items-start pl-8 md:pl-16 text-left">
                        <div className="flex flex-col items-start">
                          <div className="h-8 w-2 rounded-full mb-4" style={{ backgroundColor: color, opacity: 0.15 }} />
                          <h3 className="text-3xl font-extrabold mb-4" style={{ color }}>{title}</h3>
                        </div>
                        <ul className="text-lg text-gray-700 space-y-3">
                          {bullets.map((b, j) => (
                            <li key={j} className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-[#D96F32] before:opacity-70">{b}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
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

