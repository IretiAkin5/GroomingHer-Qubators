import Link from "next/link";
export default function NotFound() {
  return (
    <main className="container section">
      <p className="eyebrow">Let’s find another route</p>
      <h1>This page is unavailable.</h1>
      <p className="lead">
        The page or sample lesson could not be found. Learning and support
        remain available.
      </p>
      <div className="actions">
        <Link className="button primary" href="/resources">
          Learning Resources
        </Link>
        <Link className="button secondary" href="/support">
          Get Support
        </Link>
        <Link className="text-link" href="/">
          Home →
        </Link>
      </div>
    </main>
  );
}
