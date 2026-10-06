"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
export default function PublicNav() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [solutions, setSolutions] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    setMenu(false);
    setSolutions(false);
  }, [path]);
  useEffect(() => {
    function close(e: PointerEvent) {
      if (!root.current?.contains(e.target as Node)) setSolutions(false);
    }
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  return (
    <header
      ref={root}
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setMenu(false);
          setSolutions(false);
        }
      }}
    >
      <div className="nav-container">
        <Link href="/" className="brand" aria-label="GroomingHer Home">
          <span className="brand-mark">
            <Icon size={30} />
          </span>
          Grooming<span>Her</span>
          <span className="brand-dot">.</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="public-menu"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close menu ×" : "Menu ☰"}
        </button>
        <nav
          id="public-menu"
          className={menu ? "public-nav is-open" : "public-nav"}
          aria-label="Main navigation"
        >
          <Link href="/" aria-current={path === "/" ? "page" : undefined}>
            Home
          </Link>
          <Link
            href="/about"
            aria-current={path === "/about" ? "page" : undefined}
          >
            About
          </Link>
          <div className="solutions-menu">
            <button
              aria-expanded={solutions}
              aria-controls="solution-links"
              onClick={() => setSolutions(!solutions)}
            >
              Solutions <span aria-hidden="true">⌄</span>
            </button>
            {solutions && (
              <div id="solution-links" className="dropdown">
                <Link href="/solutions/girls">Girls</Link>
                <Link href="/solutions/parents">Parents and Guardians</Link>
                <Link href="/solutions/schools">Schools</Link>
              </div>
            )}
          </div>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/resources">Learning Resources</Link>
          <Link href="/contact">Contact Us</Link>
          <Link className="nav-cta" href="/get-started">
            Get Started <Icon name="arrow" size={16} />
          </Link>
          <Link className="login-link" href="/login">
            Log In
          </Link>
        </nav>
      </div>
    </header>
  );
}
