
import React from 'react';

export const CONTACT_INFO = {
  name: "THV Admin",
  phone: "0927099940",
  zalo: "0927099940",
};

export const COLORS = {
  primary: "#2563eb",
  secondary: "#4f46e5",
  accent: "#06b6d4",
  spin: "#3b82f6",
  coin: "#f59e0b",
  success: "#10b981",
  background: "#f8fafc"
};

export const ICONS = {
  LogoTHV: (props: any) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" stroke="url(#logoGradient)" strokeWidth="4" />
      <path d="M30 35H45V65H30M70 35H55V65H70M40 50H60" stroke="url(#logoGradient)" strokeWidth="6" strokeLinecap="round" />
      <text x="50" y="85" textAnchor="middle" fill="url(#logoGradient)" fontSize="12" fontWeight="900" style={{fontFamily: 'sans-serif'}}>THV PRO</text>
    </svg>
  ),
  Spin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 12c0-4.4 3.6-8 8-8 3.3 0 6.1 2 7.3 4.9L21.5 8M2.5 16l4.2-3.1C7.9 10 10.7 8 14 8c4.4 0 8 3.6 8 8 0 3.3-2 6.1-4.9 7.3L12 22" />
    </svg>
  ),
  Coin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  Gift: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  ),
  Badge: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  // Added Pig icon for Raid events
  Pig: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 5h6.7a2.3 2.3 0 0 1 1.8.9l1.1 1.4a2.3 2.3 0 0 0 1.8.9H21a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <circle cx="14" cy="13" r="3" />
      <path d="M7 11h.01" />
    </svg>
  ),
  // Added Hammer icon for Attack events
  Hammer: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0-.83-.83-.83-2.17 0-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6l-.85.85a4.45 4.45 0 0 0-1.24 2.55 4.5 4.5 0 0 0 1.25 3.7l1.25 1.25a4.5 4.5 0 0 0 3.7 1.25 4.5 4.5 0 0 0 2.55-1.24l.85-.85-2.74-2.73a1 1 0 0 0-.86-.27z" />
    </svg>
  ),
  // Added Shield icon for Shield events
  Shield: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  // Added Event symbol icon (thunderbolt)
  Event: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
};
