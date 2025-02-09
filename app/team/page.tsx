"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Linkedin } from "lucide-react"

interface TeamMember {
  name: string
  title: string
  description: string
  imageUrl: string
  linkedinUrl: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Max Del Vita",
    title: "Founder & CEO",
    description: "With over 23 years of experience in product management, Max brings deep expertise in AI and automation to lead AskSymple's vision. MIT Sloan School of Management alum passionate about building innovative AI solutions.",
    imageUrl: "/team/Max.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/mdelvita/",
  },
  {
    name: "Upasna Bhandari",
    title: "Co-Founder & Chief Experience Officer",
    description: "Leading AskSymple's user experience and product strategy. Passionate about creating intuitive and impactful AI-driven solutions that transform how people work.",
    imageUrl: "/team/Upasna.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/upasnaux-sg/",
  },
  {
    name: "Davender Singh",
    title: "Co-Founder & Chief Technology Officer",
    description: "Technology leader with extensive experience in AI and software engineering. Driving AskSymple's technical innovation and infrastructure to deliver cutting-edge AI solutions.",
    imageUrl: "/team/Davender.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/davender-singh/",
  },
  // Add more team members here
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="custom-screen py-16 lg:py-24">
        <div className="flex items-center gap-2 mb-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary custom-transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Our Team</h1>
          <p className="text-xl text-muted-foreground text-center mb-16">
            Meet the passionate individuals behind AskSymple
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-secondary/50 rounded-lg p-6 hover:bg-secondary/70 transition-colors h-full"
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="relative w-40 h-40 lg:w-48 lg:h-48 mb-4">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary mb-2">{member.title}</p>
                  <p className="text-muted-foreground mb-4 text-sm lg:text-base">{member.description}</p>
                  <div className="flex-grow" />
                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-4"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>Connect on LinkedIn</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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