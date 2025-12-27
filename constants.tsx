
import React from 'react';

export const CONTACT_INFO = {
  name: "Mr Vũ",
  phone: "0927099940",
  email: "tonyhoaivu@gmail.com",
};

// URL API chính thức của bạn sau khi deploy backend
// Hệ thống sẽ tự động gọi đến các file .php để lấy link mới nhất
export const API_BASE_URL = window.location.origin + "/api/";

export const ICONS = {
  Spin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 12c0-4.4 3.6-8 8-8 3.3 0 6.1 2 7.3 4.9L21.5 8M2.5 16l4.2-3.1C7.9 10 10.7 8 14 8c4.4 0 8 3.6 8 8 0 3.3-2 6.1-4.9 7.3L12 22" />
    </svg>
  ),
  Coin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  Event: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  History: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Hammer: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15 5 4 4" />
      <path d="M18 2l4 4" />
      <path d="m2 22 7-7" />
      <path d="M11 13 4 6l-2 2 7 7-2 2 2 2 7-7-2-2Z" />
    </svg>
  ),
  Pig: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 15c0 2.8 2.2 5 5 5h8c2.8 0 5-2.2 5-5V9c0-2.8-2.2-5-5-5H8c-2.8 0-5 2.2-5 5v6Z" />
      <circle cx="9" cy="10" r="1" />
      <circle cx="15" cy="10" r="1" />
      <path d="M10 14h4" />
    </svg>
  ),
  Shield: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  ),
};
