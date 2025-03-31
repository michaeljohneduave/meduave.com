import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId: string) => void;
    };
  }
}

interface TurnstileOptions {
  sitekey: string;
  callback: (token: string) => void;
  'error-callback'?: () => void;
}

interface TurnstileProps {
  onVerify: (token: string) => void;
  onError?: () => void;
}

export default function Turnstile({ onVerify, onError }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (!containerRef.current) return;
      
      // Render Turnstile widget
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          onVerify(token);
        },
        'error-callback': () => {
          onError?.();
        },
      });
    };

    return () => {
      if (widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      }
      document.head.removeChild(script);
    };
  }, [onVerify, onError]);

  return <div ref={containerRef} />;
} 