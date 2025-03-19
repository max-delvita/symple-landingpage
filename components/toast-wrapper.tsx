"use client"

import { toast } from "@/components/ui/use-toast"

export function showSuccessToast() {
  toast({
    title: "Demo request submitted!",
    description: "We'll contact you shortly to schedule your demo.",
    className: "bg-green-50 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-100",
  })
}

export function showErrorToast() {
  toast({
    title: "Something went wrong",
    description: "Please try again later or contact support.",
    variant: "destructive",
    className: "bg-red-50 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-100",
  })
} 