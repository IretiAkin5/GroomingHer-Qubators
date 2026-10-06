"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { isRole, type Role } from "@/lib/content";
export type DiaryEntry = {
  id: string;
  date: string;
  end: string;
  flow: string;
  pain: string;
  impact: string;
  note: string;
};
export type SharedMessage = {
  id: string;
  recipient: "parent" | "support";
  text: string;
  time: string;
};
type DemoState = {
  role: Role | null;
  loaded: boolean;
  completed: string[];
  complete: (slug: string) => void;
  entries: DiaryEntry[];
  saveEntry: (entry: DiaryEntry) => void;
  deleteEntry: (id: string) => void;
  messages: SharedMessage[];
  sendSample: (recipient: "parent" | "support", text: string) => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  start: (role: Role) => void;
  exit: () => void;
  recipientPreview: () => void;
  dates: string[];
  setDate: (week: number, date: string) => void;
};
const Context = createContext<DemoState | null>(null);
const marker = "groomingher-demo-role";
export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [messages, setMessages] = useState<SharedMessage[]>([]);
  const [paused, setPaused] = useState(false);
  const [dates, setDates] = useState<string[]>(Array(6).fill("Pending"));
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(marker);
      if (saved && isRole(saved)) setRole(saved);
    } catch {
      /* demo can run without storage */
    }
    setLoaded(true);
  }, []);
  function persist(r: Role | null) {
    try {
      if (r) sessionStorage.setItem(marker, r);
      else sessionStorage.removeItem(marker);
    } catch {
      /* no health content is ever persisted */
    }
  }
  function reset() {
    setCompleted([]);
    setEntries([]);
    setMessages([]);
    setPaused(false);
  }
  function start(r: Role) {
    reset();
    setRole(r);
    persist(r);
  }
  function exit() {
    reset();
    setDates(Array(6).fill("Pending"));
    setRole(null);
    persist(null);
    try {
      for (const r of ["girl", "parent", "school"])
        sessionStorage.removeItem(`groomingher-onboarding-${r}`);
    } catch {}
  }
  function recipientPreview() {
    setEntries([]);
    setCompleted([]);
    setPaused(false);
    setRole("parent");
    persist("parent");
  }
  return (
    <Context.Provider
      value={{
        role,
        loaded,
        completed,
        complete: (slug) =>
          setCompleted((xs) => (xs.includes(slug) ? xs : [...xs, slug])),
        entries,
        saveEntry: (entry) =>
          setEntries((xs) => [...xs.filter((x) => x.id !== entry.id), entry]),
        deleteEntry: (id) => setEntries((xs) => xs.filter((x) => x.id !== id)),
        messages,
        sendSample: (recipient, text) => {
          if (!paused && role === "girl")
            setMessages((xs) => [
              ...xs,
              {
                id: crypto.randomUUID(),
                recipient,
                text,
                time: new Date().toLocaleString("en-NG", {
                  timeZone: "Africa/Lagos",
                  dateStyle: "medium",
                  timeStyle: "short",
                }),
              },
            ]);
        },
        paused,
        setPaused,
        start,
        exit,
        recipientPreview,
        dates,
        setDate: (week, date) =>
          setDates((xs) => xs.map((x, i) => (i === week ? date : x))),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useDemo() {
  const context = useContext(Context);
  if (!context) throw Error("DemoProvider is required");
  return context;
}
