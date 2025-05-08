"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function StartProjectPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    serviceType: "",
    budget: "",
    timeline: "",
    projectDetails: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Project request submitted!",
      description: "We'll review your request and get back to you within 48 hours.",
    })

    setFormData({
      name: "",
      email: "",
      organization: "",
      serviceType: "",
      budget: "",
      timeline: "",
      projectDetails: "",
    })

    setStep(1)
    setIsSubmitting(false)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Start a Project</h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your project and we'll get back to you with a plan to bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Project Form */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Project Request Form</CardTitle>
                <CardDescription>
                  {step === 1 && "Step 1 of 3: Tell us about yourself"}
                  {step === 2 && "Step 2 of 3: Project details"}
                  {step === 3 && "Step 3 of 3: Additional information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization/Business Name</Label>
                        <Input
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="Your company or organization"
                        />
                      </div>
                      <Button type="button" onClick={nextStep} className="w-full bg-accent hover:bg-accent/90">
                        Next Step
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="serviceType">Service Type</Label>
                        <Select
                          onValueChange={(value) => handleSelectChange("serviceType", value)}
                          value={formData.serviceType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="marketing">Marketing & Growth Strategy</SelectItem>
                            <SelectItem value="brand">Brand Identity & Visual Design</SelectItem>
                            <SelectItem value="web">Web & Digital Presence</SelectItem>
                            <SelectItem value="tech">Tech & Workflow Setup</SelectItem>
                            <SelectItem value="software">Software & System Support</SelectItem>
                            <SelectItem value="event">Event & Campaign Strategy</SelectItem>
                            <SelectItem value="other">Other (Please specify)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectDetails">Project Details</Label>
                        <Textarea
                          id="projectDetails"
                          name="projectDetails"
                          value={formData.projectDetails}
                          onChange={handleChange}
                          placeholder="Tell us about your project goals, challenges, and what you're looking to achieve..."
                          rows={6}
                          required
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                          Previous
                        </Button>
                        <Button type="button" onClick={nextStep} className="flex-1 bg-accent hover:bg-accent/90">
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>Budget Range</Label>
                        <RadioGroup
                          onValueChange={(value) => handleRadioChange("budget", value)}
                          value={formData.budget}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="under-500" id="under-500" />
                            <Label htmlFor="under-500">Under $500</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="500-1000" id="500-1000" />
                            <Label htmlFor="500-1000">$500 - $1,000</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1000-2500" id="1000-2500" />
                            <Label htmlFor="1000-2500">$1,000 - $2,500</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2500-plus" id="2500-plus" />
                            <Label htmlFor="2500-plus">$2,500+</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="not-sure" id="not-sure" />
                            <Label htmlFor="not-sure">Not sure yet</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Desired Timeline</Label>
                        <Select
                          onValueChange={(value) => handleSelectChange("timeline", value)}
                          value={formData.timeline}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">As soon as possible</SelectItem>
                            <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                            <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                            <SelectItem value="1-2-months">1-2 months</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-4">
                        <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                          Previous
                        </Button>
                        <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit Request"}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What to Expect</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-soft">
                <h3 className="text-xl font-bold mb-2">1. Initial Response</h3>
                <p className="text-muted-foreground">
                  We'll review your project request and get back to you within 48 hours to schedule a discovery call.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft">
                <h3 className="text-xl font-bold mb-2">2. Discovery Call</h3>
                <p className="text-muted-foreground">
                  We'll discuss your project in detail, understand your goals, and answer any questions you may have.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft">
                <h3 className="text-xl font-bold mb-2">3. Project Proposal</h3>
                <p className="text-muted-foreground">
                  Based on our discussion, we'll provide a detailed proposal outlining scope, timeline, and pricing.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-soft">
                <h3 className="text-xl font-bold mb-2">4. Project Kickoff</h3>
                <p className="text-muted-foreground">
                  Once approved, we'll assign your dedicated team and begin work on your project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
