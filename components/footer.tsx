import Link from "next/link"
import { Instagram, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">305 Collective</h3>
            <p className="text-sm text-white/80">Student-run. Client-focused. Based in Miami.</p>
            <div className="flex space-x-4">
              <Link href="mailto:305collectiveteam@gmail.com" className="text-white hover:text-accent transition-colors">
                305collectiveteam@gmail.com
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-white/80 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-sm text-white/80 hover:text-white transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-sm text-white/80 hover:text-white transition-colors">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services#marketing" className="text-sm text-white/80 hover:text-white transition-colors">
                  Marketing & Growth
                </Link>
              </li>
              <li>
                <Link href="/services#brand" className="text-sm text-white/80 hover:text-white transition-colors">
                  Brand Identity
                </Link>
              </li>
              <li>
                <Link href="/services#web" className="text-sm text-white/80 hover:text-white transition-colors">
                  Web & Digital
                </Link>
              </li>
              <li>
                <Link href="/services#tech" className="text-sm text-white/80 hover:text-white transition-colors">
                  Tech & Workflow
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-sm text-white/80 mb-2">305collectiveteam@gmail.com</p>
            <Link
              href="https://tally.so/r/3xo409"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} 305 Collective. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
