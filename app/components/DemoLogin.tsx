"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemo } from "./DemoProvider";
import { Icon } from "./Icons";
import { roleNames, type Role } from "@/lib/content";
export default function DemoLogin() {
  const demo = useDemo();
  const router = useRouter();
  return (
    <>
      <div className="notice">
        <strong>Demonstration access only.</strong>
        <p>
          Choose a fixed fictional identity. This does not authenticate a person
          or grant live access. Entering another demo resets the previous role’s
          temporary records.
        </p>
      </div>
      <div className="card-grid">
        {(["girl", "parent", "school"] as Role[]).map((role) => (
          <article className="role-card" key={role}>
            <Icon
              name={
                role === "girl"
                  ? "flower"
                  : role === "parent"
                    ? "people"
                    : "school"
              }
              size={30}
            />
            <h2>
              {role === "girl"
                ? "Ada"
                : role === "parent"
                  ? "Mrs Adeyemi"
                  : "Mrs Bello"}
            </h2>
            <p>{roleNames[role]} · Gracefield School</p>
            <span className="badge">Fictional identity</span>
            <button
              className="button primary"
              onClick={() => {
                demo.start(role);
                router.push(`/demo/${role}`);
              }}
            >
              Enter {roleNames[role]} demo
              <Icon name="arrow" size={18} />
            </button>
          </article>
        ))}
      </div>
      <div className="actions">
        <Link className="text-link" href="/recovery">
          Account recovery information →
        </Link>
        <Link className="text-link" href="/get-started">
          New here? Get Started →
        </Link>
      </div>
    </>
  );
}
