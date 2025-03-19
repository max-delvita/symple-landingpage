"use client"

import { useState } from "react"
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
import { showSuccessToast, showErrorToast } from "@/components/toast-wrapper"
import { supabase } from "@/lib/supabase"

interface BookDemoFormProps {
  onSuccess: () => void;
}

export function BookDemoForm({ onSuccess }: BookDemoFormProps) {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    companyName: "",
    phoneNumber: "",
    businessSize: "",
    additionalInfo: ""
  })
  
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.businessEmail)) {
      showErrorToast()
      return
    }

    // Phone validation
    if (formData.phoneNumber && !/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      showErrorToast()
      return
    }

    setIsSubmitting(true)
    
    try {
      // Prepare the data to match the table schema
      const leadData = {
        name: formData.fullName,
        email: formData.businessEmail,
        tel: formData.phoneNumber || null,
        number_employees: formData.businessSize,
        additional_information: formData.additionalInfo || null,
      }
      
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('customer-support-leads')
        .insert([leadData])
        .select()
      
      if (error) throw error
      
      // Show success message
      showSuccessToast()
      
      // Reset form
      setFormData({
        fullName: "",
        businessEmail: "",
        companyName: "",
        phoneNumber: "",
        businessSize: "",
        additionalInfo: ""
      })
      
      // Call success callback
      onSuccess()
      
    } catch (error) {
      console.error("Form submission error:", error)
      showErrorToast()
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      businessSize: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-white">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="bg-[#1E1E1E] border-zinc-800 text-white"
          />
        </div>
        
        <div>
          <Label htmlFor="businessEmail" className="text-white">Business Email</Label>
          <Input
            id="businessEmail"
            name="businessEmail"
            type="email"
            value={formData.businessEmail}
            onChange={handleInputChange}
            required
            className="bg-[#1E1E1E] border-zinc-800 text-white"
          />
        </div>
        
        <div>
          <Label htmlFor="companyName" className="text-white">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
            className="bg-[#1E1E1E] border-zinc-800 text-white"
          />
        </div>
        
        <div>
          <Label htmlFor="phoneNumber" className="text-white">Phone Number (optional)</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="bg-[#1E1E1E] border-zinc-800 text-white"
          />
        </div>
        
        <div>
          <Label htmlFor="businessSize" className="text-white">Business Size</Label>
          <Select
            value={formData.businessSize}
            onValueChange={handleSelectChange}
            required
          >
            <SelectTrigger className="bg-[#1E1E1E] border-zinc-800 text-white">
              <SelectValue placeholder="Select business size" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1E1E] border-zinc-800">
              <SelectItem value="1-10">1-10 employees</SelectItem>
              <SelectItem value="11-50">11-50 employees</SelectItem>
              <SelectItem value="51-100">51-100 employees</SelectItem>
              <SelectItem value="101-200">101-200 employees</SelectItem>
              <SelectItem value="200+">200+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  )
} 