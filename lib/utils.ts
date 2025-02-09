import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js' | 'set',
      targetId: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options?: any
    ) => void;
  }
}

// Google Analytics Event Tracking
export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>,
  options?: {
    debug?: boolean;
  }
) => {
  try {
    if (typeof window === 'undefined' || !window.gtag) {
      if (options?.debug) {
        console.warn('Google Analytics not initialized');
      }
      return;
    }

    // Add common properties
    const eventProperties = {
      ...properties,
      timestamp: new Date().toISOString(),
      location: window.location.pathname,
    };

    window.gtag('event', eventName, eventProperties);

    if (options?.debug) {
      console.log('GA Event:', { eventName, ...eventProperties });
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}
