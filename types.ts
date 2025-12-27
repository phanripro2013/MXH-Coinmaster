
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SPIN_LINKS = 'SPIN_LINKS',
  COIN_LINKS = 'COIN_LINKS',
  EVENT_COUNTER = 'EVENT_COUNTER',
  HISTORY = 'HISTORY',
  USAGE = 'USAGE',
  CONTACT = 'CONTACT'
}

export enum EventType {
  HAMMER = 'HAMMER',
  PIG = 'PIG',
  SYM = 'SYM',
  SHIELD = 'SHIELD'
}

export interface SpinLink {
  id: number;
  title: string;
  url: string;
  date: string;
}

export interface EventSession {
  id: string;
  date: string;
  total: number;
  counts: Record<EventType, number>;
}
