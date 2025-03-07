"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, MessageSquare, Zap } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CustomerSupportPage() {
  const { toast } = useToast()
  
  // Demo form state
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    telephone: ""
  })
  
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Response state for debugging
  const [debugResponse, setDebugResponse] = useState<string | null>(null)
  
  // Handle demo form submission
  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Set loading state
    setIsSubmitting(true)
    setDebugResponse(null)
    
    // Log form data for debugging
    console.log("Submitting form data:", demoForm)
    
    try {
      // Prepare the data to send
      const formData = {
        name: demoForm.name,
        email: demoForm.email,
        telephone: demoForm.telephone,
        source: 'customer-support-demo',
        timestamp: new Date().toISOString()
      }
      
      // Convert to JSON string for logging
      const jsonData = JSON.stringify(formData)
      console.log("Sending to webhook via proxy (JSON):", jsonData)
      
      // Send the data to our API route instead of directly to webhook.site
      const response = await axios.post(
        '/api/webhook-proxy',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      
      console.log("API response status:", response.status)
      console.log("API response data:", response.data)
      
      // Set debug response
      const responseText = JSON.stringify(response.data, null, 2)
      setDebugResponse(responseText || "Empty response (but request was sent)")
      
      // Show success message
      toast({
        title: "Demo request submitted!",
        description: "We'll contact you shortly to schedule your free demo.",
        variant: "default",
      })
      
      // Reset form
      setDemoForm({ name: "", email: "", telephone: "" })
      
    } catch (error) {
      console.error("Form submission error:", error)
      
      // Get error details
      let errorMessage = "Unknown error occurred"
      if (axios.isAxiosError(error)) {
        errorMessage = error.response 
          ? `Error ${error.response.status}: ${JSON.stringify(error.response.data)}`
          : error.message
        console.error("Axios error details:", error.response?.data)
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      // Set debug response
      setDebugResponse(`Error: ${errorMessage}`)
      
      // Show error message
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      })
    } finally {
      // Reset loading state
      setIsSubmitting(false)
    }
  }
  
  // Form state for the contact form at the bottom
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: ""
  })

  // Handle form input changes for both forms
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, formType: 'demo' | 'contact') => {
    const { name, value } = e.target
    if (formType === 'demo') {
      setDemoForm(prev => ({
        ...prev,
        [name]: value
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  // Handle contact form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      company: "",
      website: ""
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Your AI-Powered Assistant for Customer Inquiries
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your customer support experience with our intelligent AI assistant that handles inquiries 24/7.
            </p>
            
            <div className="max-w-md mx-auto bg-white dark:bg-secondary/30 p-6 rounded-xl shadow-lg border border-border">
              <h3 className="text-xl font-semibold mb-4">Book a Free Demo</h3>
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label htmlFor="demo-name" className="block text-sm font-medium mb-2 text-left">
                    Name
                  </label>
                  <Input
                    id="demo-name"
                    name="name"
                    type="text"
                    value={demoForm.name}
                    onChange={(e) => handleInputChange(e, 'demo')}
                    required
                    className="w-full p-3 rounded-lg border border-border"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="demo-email" className="block text-sm font-medium mb-2 text-left">
                    Email
                  </label>
                  <Input
                    id="demo-email"
                    name="email"
                    type="email"
                    value={demoForm.email}
                    onChange={(e) => handleInputChange(e, 'demo')}
                    required
                    className="w-full p-3 rounded-lg border border-border"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="demo-telephone" className="block text-sm font-medium mb-2 text-left">
                    Telephone
                  </label>
                  <Input
                    id="demo-telephone"
                    name="telephone"
                    type="tel"
                    value={demoForm.telephone}
                    onChange={(e) => handleInputChange(e, 'demo')}
                    className="w-full p-3 rounded-lg border border-border"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Book a Free Demo"}
                </Button>
                
                {/* Debug response display */}
                {debugResponse && (
                  <div className="mt-4 p-3 bg-secondary/30 rounded-lg text-xs overflow-auto max-h-48">
                    <p className="font-semibold mb-1">Response from server:</p>
                    <pre className="whitespace-pre-wrap break-words">{debugResponse}</pre>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Our Customer Support AI?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-secondary/50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
                <p className="text-muted-foreground">
                  Responds to inquiries anytime, anywhere. Never keep your customers waiting, even outside business hours.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-secondary/50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Responses</h3>
                <p className="text-muted-foreground">
                  Uses AI to provide accurate, context-aware answers. Our system learns from interactions to improve over time.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-secondary/50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
                <p className="text-muted-foreground">
                  Seamlessly connects with your existing tools. Integrate with your website, CRM, or support platform in minutes.
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
              {/* Left: Image placeholder */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-md h-[300px] bg-secondary/50 rounded-lg flex items-center justify-center border border-border">
                  <p className="text-muted-foreground">Image Placeholder</p>
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
                      <h3 className="text-xl font-semibold mb-2">Integrate with your website or app</h3>
                      <p className="text-muted-foreground">
                        Add a simple code snippet to your site or connect via our API to your existing systems.
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quote 1 */}
              <div className="bg-white dark:bg-secondary/30 p-8 rounded-xl shadow-sm border border-border">
                <p className="text-lg mb-6 italic">
                  "This AI saved us hours every day! Our team can now focus on complex issues while the AI handles routine questions."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                  <div>
                    <p className="font-semibold">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">Acme Corp</p>
                  </div>
                </div>
              </div>

              {/* Quote 2 */}
              <div className="bg-white dark:bg-secondary/30 p-8 rounded-xl shadow-sm border border-border">
                <p className="text-lg mb-6 italic">
                  "Customers love the fast responses. We've seen a 40% increase in customer satisfaction since implementing this solution."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                  <div>
                    <p className="font-semibold">John Smith</p>
                    <p className="text-sm text-muted-foreground">TechBit</p>
                  </div>
                </div>
              </div>

              {/* Quote 3 */}
              <div className="bg-white dark:bg-secondary/30 p-8 rounded-xl shadow-sm border border-border">
                <p className="text-lg mb-6 italic">
                  "Setup was a breeze, and it just works! The AI's ability to learn from our knowledge base is impressive."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                  <div>
                    <p className="font-semibold">Sarah Lee</p>
                    <p className="text-sm text-muted-foreground">GrowEasy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA and Form Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Customer Support?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of businesses that have improved their customer experience with our AI solution.
              </p>
              <Button 
                asChild
                className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all mb-12"
              >
                <Link href="#">Get Started Today</Link>
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white dark:bg-secondary/30 p-8 rounded-xl shadow-lg border border-border">
              <h3 className="text-2xl font-semibold mb-6">Request More Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, 'contact')}
                    required
                    className="w-full p-3 rounded-lg border border-border"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, 'contact')}
                    required
                    className="w-full p-3 rounded-lg border border-border"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange(e, 'contact')}
                    required
                    className="w-full p-3 rounded-lg border border-border"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium mb-2">
                    Website
                  </label>
                  <Input
                    id="website"
                    name="website"
                    type="text"
                    value={formData.website}
                    onChange={(e) => handleInputChange(e, 'contact')}
                    className="w-full p-3 rounded-lg border border-border"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg"
              >
                Submit
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                By submitting this form, you agree to our <Link href="/terms" className="text-primary hover:text-primary/90 underline">Terms and Conditions</Link>
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* Footer would go here */}
      {/* <Footer /> */}
    </div>
  )
} 