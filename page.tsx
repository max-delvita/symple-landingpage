import Link from "next/link"
import { Mail, Calendar, FileText, PiggyBank, BarChart3, Users, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-black">
        <div className="container flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-3">
            <Mail className="h-6 w-6 text-[#E88C51]" />
            <span className="text-xl font-semibold">AskSymple</span>
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
            <div className="flex max-w-xl mx-auto gap-4 mt-8">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-[#1A1A1A] border-none text-white placeholder:text-gray-500 rounded-lg text-base"
              />
              <Button 
                className="h-12 px-6 bg-[#E88C51] hover:bg-[#E88C51]/90 text-white rounded-lg"
              >
                Try our assistant now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32">
        <div className="container px-4">
          <h2 className="text-6xl font-bold text-center">
            Everything You Need,<br />One Email Away
          </h2>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Get started in seconds, no training required</p>
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
                <div className="mb-4 text-4xl font-bold text-primary/50">{step.step}</div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="get-started" className="py-24 bg-gradient-to-b from-background to-black">
        <div className="container px-4">
          <div className="mx-auto max-w-xl rounded-xl border bg-card p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Get Started with AskSymple</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <Input placeholder="Full Name" required />
              </div>
              <div className="space-y-2">
                <Input type="email" placeholder="Email Address" required />
              </div>
              <div className="space-y-2">
                <Input placeholder="Company Name" required />
              </div>
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
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
              <Button type="submit" className="w-full">
                Get Early Access
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
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
              <Mail className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AskSymple</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} AskSymple. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

