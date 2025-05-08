"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#F8F8F8] via-[#F5F5F5] to-[#E9F7F1] border-b-4 border-[#D96F32]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-5 py-2 rounded-full bg-[#004B2D]/10 text-[#004B2D] text-sm font-semibold mb-6">Contact Us</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#004B2D]">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            We'd love to hear from you! Reach out to us directly at:
          </p>
          <a
            href="mailto:305collectiveteam@gmail.com"
            className="inline-block text-2xl md:text-3xl font-bold text-[#D96F32] hover:underline bg-white px-6 py-4 rounded-xl shadow-md border-2 border-[#D96F32] transition-all"
          >
            305collectiveteam@gmail.com
          </a>
        </div>
      </section>
    </main>
  )
}
