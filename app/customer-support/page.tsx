"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Clock, MessageSquare, Zap, CheckCircle, AlertCircle } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { showSuccessToast, showErrorToast } from "@/components/toast-wrapper"
import { supabase } from "@/lib/supabase"
import { Navbar } from "@/components/navbar"
import { BookDemoForm } from "@/components/book-demo-form"

export default function CustomerSupportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-32 bg-black">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
              AI Assistant Powered by{" "}
              <span className="text-[#FF6B00]">Your Unique Expertise</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-4xl mx-auto mb-8">
              Transform your customer support with an AI assistant that combines your unique business expertise with exceptional support capabilities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
                onClick={() => setIsModalOpen(true)}
              >
                Book a free demo
              </Button>
            </div>
          </div>
        </section>

        {/* Demo Request Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-black border border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Book Your Free Demo</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Fill out the form below and we'll get back to you within 24 hours to schedule your demo.
              </DialogDescription>
            </DialogHeader>
            <BookDemoForm onSuccess={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Business Knowledge Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left side content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Your business knowledge,{" "}
                  <span className="text-[#FF6B00]">always available</span>
                </h2>
                <p className="text-lg text-zinc-400 mb-10">
                  AskSymple creates an AI assistant that combines your unique business expertise with exceptional customer support capabilities, answering pertinent questions and solving problems through WhatsApp.
                </p>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 1V3" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 21V23" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.22 4.22L5.64 5.64" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.36 18.36L19.78 19.78" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 12H3" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12H23" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.22 19.78L5.64 18.36" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.36 5.64L19.78 4.22" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Built on Your Expertise</h3>
                      <p className="text-zinc-400">Trained on your unique knowledge and business context.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">WhatsApp Integration</h3>
                      <p className="text-zinc-400">Connect with customers where they already are.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Dual-Purpose Assistant</h3>
                      <p className="text-zinc-400">Handles support inquiries and shares expert knowledge.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side chat demo */}
              <div>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  {/* Chat header - Tabs */}
                  <div className="bg-[#F6F6F6] border-b border-gray-200">
                    <div className="flex justify-between px-4 py-2">
                      <button className="text-gray-500 px-4 py-2">Traditional Support</button>
                      <button className="text-black font-medium px-4 py-2 bg-white rounded-t-lg border-t border-x border-gray-200">AskSymple Assistant</button>
                    </div>
                  </div>

                  {/* Chat interface */}
                  <div className="bg-[#128C7E] p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#075E54] flex items-center justify-center text-white font-bold">
                      AS
                    </div>
                    <div className="text-white">
                      <h3 className="font-medium">AskSymple Assistant</h3>
                      <p className="text-xs text-white/80">Business Knowledge • 24/7 Support</p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="h-[400px] overflow-y-auto p-4 bg-[#ECE5DD] flex flex-col gap-3">
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] text-black p-3 rounded-lg max-w-[80%]">
                        <p>Hi! I'm interested in sleep training my 6-month-old who's learning to roll over. What approach would you recommend?</p>
                        <p className="text-xs text-gray-500 text-right mt-1">9:45 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white text-black p-3 rounded-lg max-w-[80%]">
                        <p>Hi there! Based on our founder Sarah's 15 years of sleep consulting experience, for a 6-month-old who's learning to roll over, we typically recommend our "Gentle Transitions" approach rather than strict cry-it-out methods.</p>
                        <p className="text-xs text-gray-500 text-right mt-1">9:46 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white text-black p-3 rounded-lg max-w-[80%]">
                        <p>This approach is particularly effective during developmental milestones like rolling. It involves a gradual retreat method where you stay in the room while your baby learns to fall asleep independently, moving farther away every few nights.</p>
                        <p className="text-xs text-gray-500 text-right mt-1">9:46 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] text-black p-3 rounded-lg max-w-[80%]">
                        <p>That sounds promising! How much does your sleep training program cost?</p>
                        <p className="text-xs text-gray-500 text-right mt-1">9:47 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white text-black p-3 rounded-lg max-w-[80%]">
                        <p>We offer three packages for 6-month-olds:</p>
                        <p className="text-xs text-gray-500 text-right mt-1">9:48 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white text-black p-3 rounded-lg max-w-[80%]">
                        <p>1. Basic Package: $199 - Includes personalized sleep plan and one 30-minute consultation
                           2. Standard Package: $299 - Includes personalized sleep plan, two 30-minute consultations, and 2 weeks of email support
                           3. Premium Package: $399 - Includes personalized sleep plan, three 30-minute consultations, 4 weeks of email support, and our developmental milestones guide</p>
                        <p className="text-xs text-gray-500 text-right mt-1">9:48 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white text-black p-3 rounded-lg max-w-[80%]">
                        <p>For babies going through the rolling milestone specifically, we recommend at least the Standard Package, as this transition often requires additional support.</p>
                        <p className="text-xs text-gray-500 text-right mt-1">9:49 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] text-black p-3 rounded-lg max-w-[80%]">
                        <p>Great! And how soon could we start? My baby barely slept last night.</p>
                        <p className="text-xs text-gray-500 text-right mt-1">9:50 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white text-black p-3 rounded-lg max-w-[80%]">
                        <p>I understand how exhausting that can be! We currently have an opening this Thursday (in 2 days). If you'd like to book that slot, I can send you our intake form right now, and you could have your first consultation with Sarah this week.</p>
                        <p className="text-xs text-gray-500 text-right mt-1">9:51 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white text-black p-3 rounded-lg max-w-[80%]">
                        <p>In the meantime, would you like me to share 3 quick tips from Sarah that might help you get through the next couple of nights before your consultation?</p>
                        <p className="text-xs text-gray-500 text-right mt-1">9:52 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
              Why Choose Our <span className="text-[#FF6B00]">Business-Powered AI</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#1E1E1E] p-8 rounded-xl">
                <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 1V3" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 21V23" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.22 4.22L5.64 5.64" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.36 18.36L19.78 19.78" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 12H3" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H23" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.22 19.78L5.64 18.36" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.36 5.64L19.78 4.22" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Your Expertise, Automated</h3>
                <p className="text-zinc-400">
                  Share your unique business knowledge and answer pertinent questions without repeating yourself.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#1E1E1E] p-8 rounded-xl">
                <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Customer Support & Sales</h3>
                <p className="text-zinc-400">
                  Handle inquiries, answer product questions, and guide customers through your offerings.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#1E1E1E] p-8 rounded-xl">
                <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Always Available</h3>
                <p className="text-zinc-400">
                  Your business knowledge and support are available to customers 24/7, in your brand's voice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Get Started in Minutes
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Left: Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-md relative rounded-lg overflow-hidden shadow-lg border border-border">
                  <Image 
                    src="/customer-support.jpg" 
                    alt="Customer Support AI Assistant" 
                    width={500} 
                    height={375}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Right: Steps */}
              <div className="w-full md:w-1/2">
                <ol className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white font-medium">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Sign up for an account</h3>
                      <p className="text-muted-foreground">
                        Create your account in seconds and access your dashboard immediately.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white font-medium">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Configure your AI agent settings</h3>
                      <p className="text-muted-foreground">
                        Customize your AI's responses, knowledge base, and behavior to match your brand.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white font-medium">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Get your dedicated Whatsapp Number</h3>
                      <p className="text-muted-foreground">
                        Our team will set up a dedicated Whatsapp number for your business that you can share with your customers.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white font-medium">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Start answering inquiries!</h3>
                      <p className="text-muted-foreground">
                        Watch as your AI assistant handles customer questions efficiently and accurately.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Quotes Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Quote 1 */}
              <div className="bg-white dark:bg-secondary/30 p-8 rounded-xl shadow-sm border border-border">
                <p className="text-lg mb-6 italic">
                  "This is blowing my mind. I can help parents answer questions all the time and WhatsApp is the best way to do that. Wish I had found it sooner."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image 
                      src="/rinie.jpg" 
                      alt="Rinie Gupta" 
                      width={40} 
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Rinie Gupta</p>
                    <p className="text-sm text-muted-foreground">Modern Indian Parent</p>
                  </div>
                </div>
              </div>

              {/* Quote 2 */}
              <div className="bg-white dark:bg-secondary/30 p-8 rounded-xl shadow-sm border border-border">
                <p className="text-lg mb-6 italic">
                  "Customers love the fast responses. We've seen a 40% increase in customer satisfaction since implementing this solution."
                </p>
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image 
                      src="/kriti.jpg" 
                      alt="Rinie Gupta" 
                      width={40} 
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Kriti Gupta</p>
                    <p className="text-sm text-muted-foreground">Nimbu Kids</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="custom-screen">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Alpha Gamma PTE Ltd. All rights reserved. UEN: 202505375R 
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