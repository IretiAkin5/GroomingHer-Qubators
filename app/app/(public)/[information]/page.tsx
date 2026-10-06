import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, FaqList } from "@/components/Public";
const pages: {
  [key: string]: {
    title: string;
    description: string;
    sections: [string, string][];
  };
} = {
  privacy: {
    title: "Safety and Privacy",
    description:
      "Understand who can see what, and what this demonstration does with information.",
    sections: [
      [
        "This preview collects no health information",
        "All identities, entries and messages are fictional. Personal input is disabled. No form is sent to a server; demo health records stay in temporary memory. A small session marker may remember the chosen demonstration role in this browser tab; signing out clears it.",
      ],
      [
        "The planned role boundaries",
        "A girl owns her optional diary. Parents receive only exact messages she confirms. Schools see programme participation and attendance, not diaries, unshared symptoms, AI questions or parent messages. AI never reads the diary.",
      ],
      [
        "A girl chooses each message",
        "She selects a verified recipient, reviews the exact text and confirms sending. A connection is not permission to browse her records. Pausing sharing will prevent future messages, but cannot retract a copy someone has already received.",
      ],
      [
        "Shared devices and paper",
        "Sign out when finished on a shared device. Screenshots, saved credentials, browser history and paper diaries can expose information. No app can guarantee complete privacy on a shared device. Learning remains available without tracking.",
      ],
      [
        "Before live participation",
        "Permissions, lawful retention, deletion, confidentiality exceptions and child-protection procedures need Nigerian professional review. We do not promise absolute secrecy. No live records or exceptional disclosure procedures are implemented in this preview.",
      ],
      [
        "Correction or deletion",
        "There are no live participant records here. Exit the demo to reset its temporary state. Verified request routes and any lawful retention exceptions must be established before enrolment.",
      ],
    ],
  },
  terms: {
    title: "Demonstration terms",
    description: "A preview for product review, not a live health service.",
    sections: [
      [
        "What you are exploring",
        "GroomingHer is a fictional demonstration of an education-first product. It creates no live accounts, sends no messages and accepts no health records.",
      ],
      [
        "Content status",
        "All health samples await professional review and must not be used for diagnosis, treatment or teaching children before approval. Reflections are distinct from medical explanations.",
      ],
      [
        "Future service",
        "Live terms, privacy arrangements, vendor data handling and account permissions must be reviewed before a pilot. No partnership, clinical approval, funding or service availability is implied.",
      ],
    ],
  },
  "child-safety": {
    title: "Child Safety",
    description:
      "Dignity, choices and appropriate human support are central to GroomingHer.",
    sections: [
      [
        "Safe participation",
        "The planned programme needs guardian permission, the girl’s own agreement, trained staff and reviewed child-protection arrangements. A girl can skip optional activities and seek help without religious tests.",
      ],
      [
        "No private disclosures in this preview",
        "Do not enter a child’s health history or intimate information. No intimate images, peer chat, symptom diagnosis or automatic health alerts are supported.",
      ],
      [
        "If you need immediate help",
        "Seek a safe adult or local emergency service immediately. If an adult feels unsafe, choose another safe route. Do not wait for a website reply. This is not a staffed support or emergency channel.",
      ],
      [
        "Before the pilot",
        "Named responsible people, a backup, confidentiality limits and referral procedures need professional review and verification. No live school support arrangement is confirmed.",
      ],
    ],
  },
  accessibility: {
    title: "Accessibility Help",
    description:
      "Learning should be understandable and reachable, on screen and beyond it.",
    sections: [
      [
        "Reading and navigation",
        "Use your browser’s zoom controls to enlarge text. All primary actions have text labels, visible keyboard focus and usable touch targets. The menu opens by button, not hover alone.",
      ],
      [
        "Beyond a personal device",
        "Printed lessons and guided school sessions are planned for core learning. Article previews offer print / save-as-PDF using your browser. Samples remain unapproved for delivery to children.",
      ],
      [
        "Share an access concern",
        "The Contact Us page previews an accessibility enquiry. Live contact details and a response team will be confirmed before launch; no enquiries are sent from this demonstration.",
      ],
    ],
  },
  support: {
    title: "Get Support",
    description:
      "You can seek human help without logging a diary, using AI or finishing a lesson.",
    sections: [
      [
        "For urgent help",
        "Seek immediate assistance from a safe adult or local emergency service. Do not wait for an app or website response. For personal health concerns, speak with a qualified healthcare professional.",
      ],
      [
        "A routine school contact",
        "Every pilot school must verify a trained female contact, available hours and a backup. No real school contact or hours are confirmed in this demonstration.",
      ],
      [
        "Another safe route",
        "If a connected adult is unavailable or feels unsafe, speak to another safe adult or qualified healthcare professional. Help must also be accessible offline.",
      ],
      [
        "Outside session hours",
        "This preview is not monitored. Use direct human support rather than sending a website enquiry and waiting. School-specific out-of-hours guidance requires verification before launch.",
      ],
    ],
  },
  recovery: {
    title: "Account recovery",
    description:
      "Live accounts and recovery are not enabled in this demonstration.",
    sections: [
      [
        "Return to a fictional space",
        "Use Log In to choose a demo role. No email, phone or password is requested. This does not verify account ownership.",
      ],
      [
        "Before live child accounts",
        "The child-account and recovery approach needs professional privacy and child-protection review. A guardian helping with recovery must not receive diary access by default.",
      ],
      [
        "Shared-device guidance",
        "Exit the demo before another person uses the device. Saved browser credentials, screenshots and paper records remain privacy considerations.",
      ],
    ],
  },
  faqs: {
    title: "Frequently Asked Questions",
    description:
      "A few things you may be wondering before exploring GroomingHer.",
    sections: [],
  },
};
export function generateStaticParams() {
  return Object.keys(pages).map((information) => ({ information }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ information: string }>;
}) {
  const { information } = await params;
  return { title: pages[information]?.title ?? "Page unavailable" };
}
export default async function Information({
  params,
}: {
  params: Promise<{ information: string }>;
}) {
  const { information } = await params;
  const page = Object.hasOwn(pages, information)
    ? pages[information]
    : undefined;
  if (!page) notFound();
  return (
    <>
      <PageIntro
        eyebrow="Care & clarity"
        title={page.title}
        text={page.description}
      />
      <section className="container content-section">
        <div className="prose">
          {information === "faqs" ? (
            <FaqList />
          ) : (
            page.sections.map(([title, text]) => (
              <section key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </section>
            ))
          )}
          <div className="actions">
            <Link className="button secondary" href="/resources">
              Explore Learning Resources
            </Link>
            <Link className="text-link" href="/contact">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
