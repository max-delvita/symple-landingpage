"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Calendar, FileText, PiggyBank, BarChart3, Users, Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { trackEvent } from "@/lib/utils"

export default function LandingPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      trackEvent('email_validation_failed', { email })
      return
    }

    setIsSubmittingEmail(true)

    try {
      const { error: supabaseError } = await supabase
        .from('email_signups')
        .insert([{ email }])

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        trackEvent('email_signup_error', { error: supabaseError.message })
        throw supabaseError
      }

      trackEvent('email_signup_success', { email })
      toast({
        title: "Success!",
        description: "Thank you for signing up. Our agent will be in touch soon.",
      })
      setEmail("")
    } catch (err) {
      console.error('Error submitting email:', err)
      
      const error = err as { code?: string }
      if (error?.code === '23505') {
        trackEvent('email_signup_duplicate', { email })
        toast({
          title: "Uh-oh",
          description: "It seems you have already sent your email. You should have received a response from us. If not reach out to support@alphagamma.ai.",
          variant: "destructive",
        })
      } else {
        trackEvent('email_signup_error', { error: JSON.stringify(err) })
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
            <Image src="/logo.svg" alt="AskSymple Logo" width={32} height={32} />
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-semibold">AskSymple.ai</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full border border-primary/20">Beta</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm md:text-base hover:text-primary custom-transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm md:text-base hover:text-primary custom-transition">
              How It Works
            </Link>
            <Link href="/team" className="text-sm md:text-base hover:text-primary custom-transition">
              Team
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border">
            <div className="custom-screen py-4 flex flex-col space-y-4">
              <Link 
                href="#features" 
                className="text-base hover:text-primary custom-transition px-4 py-2 hover:bg-secondary/50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-base hover:text-primary custom-transition px-4 py-2 hover:bg-secondary/50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="/team" 
                className="text-base hover:text-primary custom-transition px-4 py-2 hover:bg-secondary/50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-16 md:pb-32 animate-fade-in">
        <div className="custom-screen">
          <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
            <h1 className="text-center">
              <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 md:mb-4">
                Ask Symple AI:
              </div>
              <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text">
                Your AI Assistant Accessible via Email
              </div>
            </h1>
            <p className="text-center text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Simplify your workflow with AskSymple. <br className="hidden md:block"/>No new apps or interfaces&mdash;just send an email, and we&apos;ll handle the rest.
            </p>
            <form onSubmit={handleEmailSignup} className="flex flex-col md:flex-row max-w-xl mx-auto gap-4 mt-8 px-4 md:px-0">
              <Input
                type="email"
                placeholder="Enter your company email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-secondary border-none text-white placeholder:text-muted-foreground rounded-lg text-base shadow-glow"
                required
              />
              <Button 
                type="submit"
                disabled={isSubmittingEmail}
                className="h-12 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-glow hover-lift whitespace-nowrap"
              >
                {isSubmittingEmail ? "Submitting..." : "Try our assistant now"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-32 animate-fade-in">
        <div className="custom-screen">
          <div className="text-center mx-auto max-w-4xl mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold gradient-text-white tracking-tight">
              What AskSymple Can Do for You
            </h2>
          </div>
          
          <div className="mt-16 md:mt-24">
            {/* Calendar Management */}
            <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 mb-16 md:mb-32">
              <div className="w-full md:w-1/2 order-1 md:order-1">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <h3 className="text-2xl md:text-3xl font-bold">Calendar Management</h3>
                    </div>
                    <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-500 rounded-full border border-emerald-500/20">Beta</span>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Effortlessly schedule and coordinate meetings across time zones. Our AI assistant handles all the back-and-forth, finds the perfect time slots, and sends out invitations—all through email.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-2 md:order-2">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <h4 className="text-base md:text-lg font-semibold text-primary mb-4">Try it yourself:</h4>
                  <ol className="space-y-3 text-muted-foreground text-sm md:text-base">
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">1.</span>
                      Email the person you want to ivite to a meeting and Cc amy@asksymple.ai"
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">2.</span>
                      Include your preferred meeting times.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">3.</span>
                      Our AI will coordinate with all participants and find the best time
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">4.</span>
                      Receive a calendar invite with all details arranged
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Email Assistance */}
            <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 mb-16 md:mb-32">
              <div className="w-full md:w-1/2 order-1 md:order-1">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <h3 className="text-2xl md:text-3xl font-bold">Email Assistance</h3>
                    </div>
                    <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-500 rounded-full border border-emerald-500/20">Beta</span>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Get help composing professional emails and intelligent response suggestions. Our AI analyzes context and tone to help you communicate effectively and maintain relationships.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-2 md:order-2">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <h4 className="text-base md:text-lg font-semibold text-primary mb-4">Try it yourself:</h4>
                  <ol className="space-y-3 text-muted-foreground text-sm md:text-base">
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">1.</span>
                      Forward any email to amy@asksymple.ai
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">2.</span>
                      Add your instructions for the response
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">3.</span>
                      Our AI will draft a contextual response
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">4.</span>
                      Review, edit, and send the response
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Content Processing */}
            <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 mb-16 md:mb-32">
              <div className="w-full md:w-1/2 order-1 md:order-1">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <h3 className="text-2xl md:text-3xl font-bold">Content Processing</h3>
                    </div>
                    <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-500 rounded-full border border-emerald-500/20">Beta</span>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Summarize documents and convert formats seamlessly. Send any document to your AI assistant and get back concise summaries, format conversions, or extracted insights.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-2 md:order-2">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <h4 className="text-base md:text-lg font-semibold text-primary mb-4">Try it yourself:</h4>
                  <ol className="space-y-3 text-muted-foreground text-sm md:text-base">
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">1.</span>
                      Email any document to amy@asksymple.ai
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">2.</span>
                      Specify what you need (summary, conversion, analysis)
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">3.</span>
                      Our AI will process the document
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">4.</span>
                      Receive the processed content in your preferred format
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Financial Tasks */}
            <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 mb-16 md:mb-32">
              <div className="w-full md:w-1/2 order-1 md:order-1">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 flex-shrink">
                      <PiggyBank className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <h3 className="text-xl md:text-3xl font-bold">Financial Tasks</h3>
                    </div>
                    <span className="px-2 py-1 text-[10px] md:text-xs font-medium bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/20 whitespace-nowrap flex-shrink-0">Coming Soon</span>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Simplify expense tracking and receipt processing. Forward receipts and financial documents to your AI assistant for automated categorization and expense reporting.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-2 md:order-2">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <h4 className="text-base md:text-lg font-semibold text-primary mb-4">Try it yourself:</h4>
                  <ol className="space-y-3 text-muted-foreground text-sm md:text-base">
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">1.</span>
                      Forward receipts to amy@asksymple.ai
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">2.</span>
                      Specify categorization or reporting needs
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">3.</span>
                      Our AI will process and organize the data
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">4.</span>
                      Receive organized financial reports
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Data Analysis */}
            <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 mb-16 md:mb-32">
              <div className="w-full md:w-1/2 order-1 md:order-1">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 flex-shrink">
                      <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <h3 className="text-xl md:text-3xl font-bold">Data Analysis</h3>
                    </div>
                    <span className="px-2 py-1 text-[10px] md:text-xs font-medium bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/20 whitespace-nowrap flex-shrink-0">Coming Soon</span>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Perform rapid spreadsheet analyses and generate visualizations. Send your data to the AI assistant and receive back insightful analysis and beautiful charts.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-2 md:order-2">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <h4 className="text-base md:text-lg font-semibold text-primary mb-4">Try it yourself:</h4>
                  <ol className="space-y-3 text-muted-foreground text-sm md:text-base">
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">1.</span>
                      Send your data file to amy@asksymple.ai
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">2.</span>
                      Describe the analysis you need
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">3.</span>
                      Our AI will analyze and visualize the data
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">4.</span>
                      Get insights and visualizations back
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Lead Generation */}
            <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12">
              <div className="w-full md:w-1/2 order-1 md:order-1">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 flex-shrink">
                      <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <h3 className="text-xl md:text-3xl font-bold">Lead Generation</h3>
                    </div>
                    <span className="px-2 py-1 text-[10px] md:text-xs font-medium bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/20 whitespace-nowrap flex-shrink-0">Coming Soon</span>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Search profiles and compile contact information efficiently. Let our AI assistant help you find and verify contact information for your prospective clients.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-2 md:order-2">
                <div className="bg-secondary/50 h-full p-6 md:p-8 rounded-lg border border-border shadow-2xl">
                  <h4 className="text-base md:text-lg font-semibold text-primary mb-4">Try it yourself:</h4>
                  <ol className="space-y-3 text-muted-foreground text-sm md:text-base">
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">1.</span>
                      Email your target criteria to amy@asksymple.ai
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">2.</span>
                      Specify the type of leads you're looking for
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">3.</span>
                      Our AI will search and verify contacts
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-primary">4.</span>
                      Receive a curated list of qualified leads
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Request Form */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="custom-screen">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Have a Feature Request?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're constantly improving. Let us know what features would help your workflow the most.
            </p>
            <form onSubmit={async (e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const formData = new FormData(form)
              const email = formData.get('email') as string
              const message = formData.get('message') as string

              if (!validateEmail(email)) {
                toast({
                  title: "Invalid email",
                  description: "Please enter a valid email address",
                  variant: "destructive",
                })
                return
              }

              try {
                const { error } = await supabase
                  .from('lead_forms')
                  .insert([{ 
                    email,
                    message
                  }])

                if (error) throw error

                toast({
                  title: "Thank you!",
                  description: "We've received your feature request and will consider it for future updates.",
                })
                form.reset()
                trackEvent('feature_request_submitted', { email })
              } catch (err) {
                console.error('Error submitting feature request:', err)
                toast({
                  title: "Error",
                  description: "Something went wrong. Please try again.",
                  variant: "destructive",
                })
                trackEvent('feature_request_error', { error: JSON.stringify(err) })
              }
            }} className="space-y-4">
              <Input
                type="email"
                name="email"
                placeholder="Your company email"
                className="h-12 bg-secondary border-none text-white placeholder:text-muted-foreground rounded-lg text-base shadow-glow"
                required
              />
              <textarea
                name="message"
                placeholder="Describe the feature you'd like to see..."
                className="w-full h-32 p-4 bg-secondary border-none text-white placeholder:text-muted-foreground rounded-lg text-base shadow-glow resize-none"
                required
              />
              <Button 
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-glow hover-lift"
              >
                Submit Feature Request
              </Button>
            </form>
          </div>
        </div>
      </section>

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
