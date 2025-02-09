import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Window {
  gtag: (command: string, ...args: unknown[]) => void;
}

// Google Analytics Event Tracking
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as { gtag: Window['gtag'] }).gtag('event', eventName, properties);
  }
}
