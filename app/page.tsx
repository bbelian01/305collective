import Link from "next/link"
import Image from "next/image"
import { BarChart, Briefcase, Lightbulb, Megaphone, Palette, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ServiceCard from "@/components/service-card"
import CTASection from "@/components/cta-section"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#F8F8F8] via-[#F5F5F5] to-[#E9F7F1] border-b-4 border-[#D96F32]">
        <div className="container mx-auto px-4 py-20 relative">
          <div className="absolute top-4 right-4">
            <Button asChild variant="outline" className="border-2 border-[#D96F32] text-[#D96F32] hover:bg-[#D96F32] hover:text-white">
              <Link href="/login">Login</Link>
            </Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-2 rounded-full bg-[#D96F32]/10 text-[#D96F32] text-sm font-medium mb-6">
                Student-Led Consulting
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#D96F32]">
                Elevate Your Business with Expert Consulting
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                305 Collective delivers professional consulting services to startups, small businesses, and student organizations.
                Our student-led team combines academic excellence with practical expertise to drive measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" className="bg-[#D96F32] text-white hover:bg-[#b35426] h-14 px-8 text-lg">
                  <Link href="https://tally.so/r/3xo409" target="_blank" rel="noopener noreferrer">Start a Project</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-[#D96F32] text-[#D96F32] hover:bg-[#D96F32] hover:text-white h-14 px-8 text-lg">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] w-[350px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#004B2D]/20 to-transparent" />
              <Image
                src="/buildings.jpg"
                alt="Miami Cityscape"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-col items-center mb-6">
              <Image src="/305collective.jpg" alt="305 Collective Logo" height={130} width={0} className="mb-4" />
              <p className="text-lg text-gray-600">Empowering businesses with innovative solutions and expert guidance.</p>
            </div>
            <div className="inline-block px-4 py-2 rounded-full bg-[#D96F32]/10 text-[#D96F32] text-sm font-medium mb-6">
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[#D96F32]">
              Why Choose 305 Collective
            </h2>
            <div className="space-y-10">
              {[
                { icon: Lightbulb, title: "Academic Excellence", desc: "Cutting-edge knowledge and research-backed methodology." },
                { icon: Briefcase, title: "Practical Implementation", desc: "Actionable solutions that drive real results." },
                { icon: Megaphone, title: "Cost-Effective Services", desc: "Affordable services for growing businesses." }
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                  <div className="w-14 h-14 rounded-xl bg-[#D96F32]/10 flex items-center justify-center mb-2 group-hover:bg-[#004B2D] transition-colors duration-300">
                    <Icon className="h-7 w-7 text-[#D96F32] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-[#D96F32]">{title}</h3>
                  <p className="text-lg text-gray-600 max-w-xl">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      {/*
      <section className="py-32 bg-gradient-to-b from-white to-[#004B2D]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-[#D96F32]/10 text-[#D96F32] text-sm font-medium mb-6">
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#D96F32]">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results for real businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "TechStart",
                description: "Market reach grew 150% through strategic brand positioning.",
                category: "Brand Strategy"
              },
              {
                title: "DesignHub",
                description: "Streamlined operations with custom digital solutions.",
                category: "Digital Transformation"
              },
              {
                title: "Student Union",
                description: "Boosted engagement through targeted campaigns.",
                category: "Marketing Strategy"
              }
            ].map((caseStudy, i) => (
              <Card key={i} className="border-2 border-[#D96F32]/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#D96F32]/30">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-[#D96F32] bg-[#D96F32]/10 px-3 py-1 rounded-full">
                      {caseStudy.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-[#D96F32]">{caseStudy.title}</h3>
                  <p className="text-lg text-gray-600">{caseStudy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Business?"
        description="Let's discuss how we can help you achieve your goals."
        primaryButtonText="Start a Project"
        primaryButtonLink="https://tally.so/r/3xo409"
        secondaryButtonText="Contact Us"
        secondaryButtonLink="/contact"
        className="bg-gradient-to-br from-[#E9F7F1] via-[#CDEFE3] to-[#F8F8F8] text-[#004B2D]"
      />
    </main>
  )
}
