"use client";

import Image from "next/image"

const team = [
  {
    name: "Brandon Belian",
    role: "Strategy + Technical Lead",
    image: "/placeholder.svg?height=400&width=300",
    bio: "Expertise in accounting, finance, events, and web development. Brandon leads our strategic initiatives and technical implementations."
  },
  {
    name: "Parker Adam",
    role: "Tech & Systems Lead",
    image: "/placeholder.svg?height=400&width=300",
    bio: "Specializes in automation, CRM implementation, dashboards, and personal tech consulting. Parker ensures our technical solutions are efficient and effective."
  },
  {
    name: "Jadyn Wayne",
    role: "Marketing & Brand Strategy Lead",
    image: "/placeholder.svg?height=400&width=300",
    bio: "Expertise in PR, campaign building, and content creation. Jadyn develops compelling marketing strategies that drive results."
  },
  {
    name: "Dakota Gordon",
    role: "Creative & Experience Design Lead",
    image: "/placeholder.svg?height=400&width=300",
    bio: "Focuses on storytelling and student-facing brand development. Dakota creates engaging experiences that resonate with audiences."
  },
]

export default function TeamPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#F8F8F8] via-[#F5F5F5] to-[#E9F7F1] border-b-4 border-[#D96F32]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-5 py-2 rounded-full bg-[#004B2D]/10 text-[#004B2D] text-sm font-semibold mb-6">Meet the Team</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#004B2D]">The People Behind 305 Collective</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Our diverse, student-led team brings expertise across business, design, tech, and marketing—plus a lot of Miami spirit.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map(({ name, role, image, bio }, i) => (
              <div key={i} className="group bg-white rounded-2xl border-2 border-[#E9F7F1] hover:border-[#D96F32] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center p-8 text-center">
                <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-[#004B2D]/20 group-hover:border-[#D96F32] transition-all">
                  <Image src={image} alt={name} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-1 text-[#004B2D] group-hover:text-[#D96F32] transition-colors">{name}</h3>
                <div className="inline-block px-3 py-1 rounded-full bg-[#D96F32]/10 text-[#D96F32] text-xs font-semibold mb-3">{role}</div>
                <p className="text-gray-600 text-base">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#004B2D]">Want to Work With Us?</h2>
          <p className="text-xl text-gray-600 mb-8">Let's create something amazing together.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://tally.so/r/3xo409" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#D96F32] text-white font-semibold px-8 py-4 rounded-lg text-lg shadow hover:bg-[#004B2D] transition-colors">Start a Project</a>
            <a href="/contact" className="inline-block border-2 border-[#004B2D] text-[#004B2D] font-semibold px-8 py-4 rounded-lg text-lg hover:bg-[#004B2D] hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
