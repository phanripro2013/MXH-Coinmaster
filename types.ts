
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SPIN_LINKS = 'SPIN_LINKS',
  COIN_LINKS = 'COIN_LINKS',
  CONTACT = 'CONTACT'
}

export interface SpinLink {
  id: string;
  title: string;
  amount: string;
  url: string;
  timestamp: string;
  isNew?: boolean;
}

// Added EventType enum to define game event categories
export enum EventType {
  HAMMER = 'HAMMER',
  PIG = 'PIG',
  SYM = 'SYM',
  SHIELD = 'SHIELD'
}

// Added EventSession interface for tracking and saving game statistics
export interface EventSession {
  id: string;
  date: string;
  total: number;
  counts: Record<EventType, number>;
}