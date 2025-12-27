
import React from 'react';

export const CONTACT_INFO = {
  name: "Mr Vũ",
  phone: "0927099940",
  email: "tonyhoaivu@gmail.com",
};

export const MOCK_SPIN_LINKS = [
  { id: 1, title: "25 Spins - Daily Reward", url: "https://static.coinmaster.com/reward1", date: "2024-05-20" },
  { id: 2, title: "10 Spins & 1M Coins", url: "https://static.coinmaster.com/reward2", date: "2024-05-20" },
  { id: 3, title: "50 Spins - Weekend Bonus", url: "https://static.coinmaster.com/reward3", date: "2024-05-19" },
];

export const MOCK_COIN_LINKS = [
  { id: 1, title: "2M Coins - Daily Reward", url: "https://static.coinmaster.com/coins1", date: "2024-05-20" },
  { id: 2, title: "3.5M Coins - Special Pack", url: "https://static.coinmaster.com/coins2", date: "2024-05-19" },
];

export const ICONS = {
  Spin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  Coin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18.06" />
      <path d="M7 6h2v4H7zM15 14h2v4h-2z" />
    </svg>
  ),
  Event: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Hammer: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
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
  History: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  ),
};
