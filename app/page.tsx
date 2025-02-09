"use client"

import Link from "next/link"
import { Mail, Calendar, FileText, PiggyBank, BarChart3, Users } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

export default function LandingPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address (e.g., name@example.com)",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingEmail(true)

    try {
      const { error: supabaseError } = await supabase
        .from('email_signups')
        .insert([{ email }])

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        throw supabaseError
      }

      toast({
        title: "Success!",
        description: "Thank you for signing up. Our agent will be in touch soon.",
      })
      setEmail("")
    } catch (err) {
      console.error('Error submitting email:', err)
      
      const error = err as { code?: string }
      if (error?.code === '23505') {
        toast({
          title: "Uh-oh",
          description: "It seems you have already sent your email. You should have received a response from us. If not reach out to support@alphagamma.ai.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmittingEmail(false)
    }
  }

  return (
    <div className="min-h-screen bg-background gradient-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="custom-screen flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover-lift">
            <img src="/logo.svg" alt="AskSymple Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold">AskSymple.ai</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="#features" className="text-base hover:text-primary custom-transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-base hover:text-primary custom-transition">
              How It Works
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 animate-fade-in">
        <div className="custom-screen">
          <div className="mx-auto max-w-4xl space-y-8">
            <h1 className="text-center">
              <div className="text-7xl font-bold tracking-tight mb-4">
              Ask Symple AI: 
              </div>
              <div className="text-7xl font-bold tracking-tight gradient-text">
              Your AI Assistant Accessible via Email
              </div>
            </h1>
            <p className="text-center text-xl text-muted-foreground max-w-3xl mx-auto">
            Simplify your workflow with AskSymple. <br/>No new apps or interfaces—just send an email, and we’ll handle the rest.
            </p>
            <form onSubmit={handleEmailSignup} className="flex max-w-xl mx-auto gap-4 mt-8">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-secondary border-none text-white placeholder:text-muted-foreground rounded-lg text-base shadow-glow"
                required
              />
              <Button 
                type="submit"
                disabled={isSubmittingEmail}
                className="h-12 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-glow hover-lift"
              >
                {isSubmittingEmail ? "Submitting..." : "Try our assistant now"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 animate-fade-in">
        <div className="custom-screen">
          <h2 className="text-6xl font-bold text-center gradient-text-white">
          What AskSymple Can Do for You
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
            {[
              {
                icon: Calendar,
                title: "Calendar Management",
                description: "Effortlessly schedule and coordinate meetings across time zones",
              },
              {
                icon: Mail,
                title: "Email Assistance",
                description: "Compose drafts and receive intelligent response suggestions",
              },
              {
                icon: FileText,
                title: "Content Processing",
                description: "Summarize documents and convert formats seamlessly",
              },
              {
                icon: PiggyBank,
                title: "Financial Tasks",
                description: "Simplify expense tracking and receipt processing",
              },
              {
                icon: BarChart3,
                title: "Data Analysis",
                description: "Perform rapid spreadsheet analyses and generate visualizations",
              },
              {
                icon: Users,
                title: "Lead Generation",
                description: "Search profiles and compile contact information efficiently",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-border feature-card-gradient p-6 hover:bg-secondary/80 custom-transition hover-lift shadow-glow"
              >
                <div className="mb-4 text-primary">
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Power of AI Section */}
      <div className="relative">
        <div 
          className="absolute m-auto blur-[160px] max-w-3xl h-[250px] top-12 inset-0 sm:h-[300px] lg:h-[650px]" 
          style={{background: "linear-gradient(180deg, rgba(232, 140, 81, 1) 0%, rgba(232, 140, 81, 0.6) 30%, rgba(232, 140, 81, 0.3) 70%, rgba(232, 140, 81, 0.1) 100%)"}}
        />
        <img 
          alt="Background pattern" 
          src="https://mailgo-rho.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg-pattern.5aa07776.webp&w=3840&q=75"
          className="absolute inset-0 w-full h-full object-cover opacity-5"
        />
        <div className="custom-screen py-28 relative">
          <div className="relative z-10 duration-1000 delay-300 opacity-1">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl md:text-4xl font-bold mb-6 text-white">
              Get Started: Email us at
              </h3>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                <a href="mailto:bot@alphagamma.ai" className="underline">amy@asksymple.ai</a>
              </h2>

            </div>
            <div className="mt-8 flex justify-center font-medium">
              <Button 
                asChild
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg shadow-glow hover-lift flex items-center gap-2"
              >
                <Link href="mailto:amy@asksymple.ai">
                  Start now
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-secondary animate-fade-in">
        <div className="custom-screen">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 gradient-text">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in seconds, no training required</p>
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
              <div key={index} className="relative p-6 hover-lift">
                <div className="mb-4 text-4xl font-bold text-primary/50">{step.step}</div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="custom-screen">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} AskSymple.ai. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary custom-transition">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary custom-transition">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
