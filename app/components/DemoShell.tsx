"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type Role, roleNames } from "@/lib/content";
import { useDemo } from "./DemoProvider";
import { Icon } from "./Icons";
const menus: Record<Role, [string, string, string][]> = {
  girl: [
    ["", "Home", "flower"],
    ["lessons", "My Lessons", "book"],
    ["resources", "Resources", "leaf"],
    ["ask", "Ask GroomingHer", "spark"],
    ["diary", "My Diary", "lock"],
    ["support", "Get Support", "heart"],
  ],
  parent: [
    ["", "Home", "flower"],
    ["guides", "Parent Guides", "book"],
    ["messages", "Shared Messages", "heart"],
    ["programme", "School Programme", "school"],
    ["support", "Get Support", "people"],
  ],
  school: [
    ["", "Programme", "school"],
    ["sessions", "Sessions", "book"],
    ["materials", "Materials", "leaf"],
    ["participation", "Participation", "people"],
    ["support", "Support", "heart"],
    ["feedback", "Feedback", "spark"],
  ],
};
export default function DemoShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const demo = useDemo();
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  if (!demo.loaded)
    return (
      <main className="container section">
        <p>Opening the demonstration…</p>
      </main>
    );
  if (demo.role !== role)
    return (
      <main className="container section">
        <p className="eyebrow">Demonstration boundary</p>
        <h1>This role space is not open.</h1>
        <p className="lead">
          {demo.role
            ? `You are exploring the ${roleNames[demo.role]} demo. Changing the URL does not switch roles.`
            : "Choose a fictional identity in Log In, or explore the onboarding journey."}{" "}
          No private records exist in this demonstration.
        </p>
        <div className="actions">
          {demo.role && (
            <Link className="button primary" href={`/demo/${demo.role}`}>
              Return to my {roleNames[demo.role]} demo
            </Link>
          )}
          <Link className="button secondary" href="/login">
            Choose a demo identity
          </Link>
          <Link className="text-link" href="/support">
            Get Support →
          </Link>
        </div>
      </main>
    );
  return (
    <div className="space-layout">
      <a className="skip-link" href="#space-content">
        Skip to content
      </a>
      <aside className={open ? "space-sidebar open" : "space-sidebar"}>
        <Link className="brand" href="/">
          <Icon size={29} />
          GroomingHer.
        </Link>
        <div className="space-role">
          <span className="avatar">
            {role === "girl" ? "A" : role === "parent" ? "MA" : "MB"}
          </span>
          <div>
            <strong>
              {role === "girl"
                ? "Ada"
                : role === "parent"
                  ? "Mrs Adeyemi"
                  : "Mrs Bello"}
            </strong>
            <span>{roleNames[role]} space · fictional</span>
          </div>
        </div>
        <nav aria-label={`${roleNames[role]} navigation`}>
          {menus[role].map(([slug, label, icon]) => {
            const href = `/demo/${role}${slug ? "/" + slug : ""}`;
            const active = slug ? path.startsWith(href) : path === href;
            return (
              <Link
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
                href={href}
                key={label}
                onClick={() => setOpen(false)}
              >
                <Icon name={icon} size={20} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          {role === "girl" && (
            <>
              <Link href="/demo/girl/share">
                <Icon name="heart" size={18} />
                Help Me Tell Someone
              </Link>
              <Link href="/demo/girl/messages">My Shared Messages</Link>
              <Link href="/demo/girl/progress">My Progress</Link>
            </>
          )}
          <Link href={`/demo/${role}/account`}>
            <Icon name="shield" size={18} />
            Account & Privacy
          </Link>
          <Link href="/">Public website ↗</Link>
          <button
            onClick={() => {
              demo.exit();
              router.replace("/");
            }}
          >
            Exit demo / Log out
          </button>
          <small>
            Sign out on shared devices. Screenshots and browser history may
            remain.
          </small>
        </div>
      </aside>
      <div className="space-body">
        <header className="space-topbar">
          <button
            className="menu-toggle"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? "Close space menu ×" : "Space menu ☰"}
          </button>
          <span className="space-breadcrumb">
            {roleNames[role]} space <span>/</span> Gracefield School{" "}
            <span className="badge">Fictional demo</span>
          </span>
          <Link href={`/demo/${role}/support`} className="support-shortcut">
            <Icon name="heart" size={18} />
            Get Support
          </Link>
        </header>
        <div className="space-demo-note">
          Fictional data only · No real accounts or health collection · Sample
          health content awaits professional review
        </div>
        <main id="space-content" className="space-main">
          {children}
        </main>
        <footer className="space-footer">
          GroomingHer · Education, dignity and care. Demo records reset on
          refresh or exit.<Link href="/privacy">Safety and Privacy →</Link>
        </footer>
      </div>
    </div>
  );
}
