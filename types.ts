
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SPIN_LINKS = 'SPIN_LINKS',
  COIN_LINKS = 'COIN_LINKS',
  EVENT_COUNTER = 'EVENT_COUNTER',
  HISTORY = 'HISTORY',
  USAGE = 'USAGE',
  CONTACT = 'CONTACT',
  DEVELOPER_RESOURCES = 'DEVELOPER_RESOURCES'
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

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
}
