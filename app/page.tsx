"use client"

import Link from "next/link"
import { Mail, Calendar, FileText, PiggyBank, BarChart3, Users } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

export default function LandingPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    useCase: "",
  })
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingEmail(true)

    try {
      const { error } = await supabase
        .from('email_signups')
        .insert([{ email }])

      if (error) throw error

      toast({
        title: "Success!",
        description: "Thank you for signing up. We'll be in touch soon.",
      })
      setEmail("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingEmail(false)
    }
  }

  const handleFullFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingForm(true)

    try {
      const { error } = await supabase
        .from('lead_forms')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          company_name: formData.companyName,
          use_case: formData.useCase,
        }])

      if (error) throw error

      toast({
        title: "Success!",
        description: "Thank you for your interest. We'll be in touch soon.",
      })
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        useCase: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingForm(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-black">
        <div className="container flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-3">
            <Mail className="h-6 w-6 text-[#E88C51]" />
            <span className="text-xl font-semibold">AskSymple.ai</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="#features" className="text-base hover:text-[#E88C51]">
              Features
            </Link>
            <Link href="#how-it-works" className="text-base hover:text-[#E88C51]">
              How It Works
            </Link>
            <Button 
              asChild
              className="bg-[#E88C51] hover:bg-[#E88C51]/90 text-white rounded-full px-6"
            >
              <Link href="#get-started">Try AskSymple</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            <h1 className="text-center">
              <div className="text-7xl font-bold tracking-tight mb-4">
                Your AI Assistant,
              </div>
              <div className="text-7xl font-bold tracking-tight text-[#E88C51]">
                Just an Email Away
              </div>
            </h1>
            <p className="text-center text-xl text-gray-400 max-w-3xl mx-auto">
              Transform your workday with an AI assistant that works where you do - 
              your inbox. No new apps to learn, just send an email and get things done.
            </p>
            <form onSubmit={handleEmailSignup} className="flex max-w-xl mx-auto gap-4 mt-8">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-[#1A1A1A] border-none text-white placeholder:text-gray-500 rounded-lg text-base"
                required
              />
              <Button 
                type="submit"
                disabled={isSubmittingEmail}
                className="h-12 px-6 bg-[#E88C51] hover:bg-[#E88C51]/90 text-white rounded-lg"
              >
                {isSubmittingEmail ? "Submitting..." : "Try our assistant now"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32">
        <div className="container px-4">
          <h2 className="text-6xl font-bold text-center">
            Everything You Need,<br />One Email Away
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
            {[
              {
                icon: Calendar,
                title: "Calendar Management",
                description: "Smart scheduling and meeting coordination across time zones",
              },
              {
                icon: Mail,
                title: "Email Assistance",
                description: "Draft composition and intelligent response suggestions",
              },
              {
                icon: FileText,
                title: "Content Processing",
                description: "Document summarization and format conversion",
              },
              {
                icon: PiggyBank,
                title: "Financial Tasks",
                description: "Expense tracking and receipt processing made simple",
              },
              {
                icon: BarChart3,
                title: "Data Analysis",
                description: "Quick spreadsheet analysis and visualization",
              },
              {
                icon: Users,
                title: "Lead Generation",
                description: "Profile search and contact information compilation",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#1A1A1A] p-6 hover:bg-[#242424] transition-colors"
              >
                <div className="mb-4 text-[#E88C51]">
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-[#1A1A1A]">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Get started in seconds, no training required</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Send an Email",
                description: "Email amy@asksymple.ai",
              },
              {
                step: "02",
                title: "Describe Your Task",
                description: "Use plain language to explain what you need",
              },
              {
                step: "03",
                title: "Answer Questions",
                description: "Provide any needed clarification",
              },
              {
                step: "04",
                title: "Get Results",
                description: "Receive your completed task",
              },
            ].map((step, index) => (
              <div key={index} className="relative p-6">
                <div className="mb-4 text-4xl font-bold text-[#E88C51]/50">{step.step}</div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="get-started" className="py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-xl rounded-xl border border-white/10 bg-[#1A1A1A] p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Get Started with AskSymple</h2>
            <form onSubmit={handleFullFormSubmit} className="space-y-6">
              <div className="space-y-2">
                <Input 
                  placeholder="Full Name" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required 
                  className="h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required 
                  className="h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Input 
                  placeholder="Company Name" 
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required 
                  className="h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Select
                  value={formData.useCase}
                  onValueChange={(value) => setFormData({ ...formData, useCase: value })}
                >
                  <SelectTrigger className="h-12 bg-black/30 border-white/10 text-white">
                    <SelectValue placeholder="Select your primary use case" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calendar">Calendar Management</SelectItem>
                    <SelectItem value="email">Email Assistance</SelectItem>
                    <SelectItem value="documents">Document Processing</SelectItem>
                    <SelectItem value="finance">Expense Management</SelectItem>
                    <SelectItem value="data">Data Analysis</SelectItem>
                    <SelectItem value="leads">Lead Generation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                type="submit" 
                disabled={isSubmittingForm}
                className="w-full h-12 bg-[#E88C51] hover:bg-[#E88C51]/90"
              >
                {isSubmittingForm ? "Submitting..." : "Get Early Access"}
              </Button>
              <p className="text-center text-sm text-gray-400">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-[#E88C51]">
                  Terms & Conditions
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <Mail className="h-6 w-6 text-[#E88C51]" />
              <span className="text-xl font-bold">AskSymple</span>
            </div>
            <p className="text-center text-sm text-gray-400">
              © {new Date().getFullYear()} AskSymple. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-[#E88C51]">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-[#E88C51]">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
