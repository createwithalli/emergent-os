export type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: "lead" | "warm" | "negotiation" | "closed";
  value: number;
  lastTouch: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  day: string;
  time: string;
  kind: "call" | "demo" | "internal" | "web3";
};

export type Message = {
  id: string;
  thread: string;
  from: string;
  body: string;
  cipher?: string;
  iv?: string;
  encrypted: boolean;
  at: string;
};

export type WalletSession = {
  address: string;
  chain: string;
  connected: boolean;
};
