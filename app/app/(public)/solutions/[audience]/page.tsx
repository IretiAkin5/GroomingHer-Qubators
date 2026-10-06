import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PageIntro,
  SectionHeading,
  Programme,
  ReviewNotice,
} from "@/components/Public";
import DemoEnquiry from "@/components/DemoEnquiry";
import { Icon } from "@/components/Icons";
const data = {
  girls: {
    eyebrow: "For girls aged 13–15",
    title: "A space to learn. Room to be you.",
    text: "Understand your changing body, grow in confidence and ask questions at your own pace. You are welcome whether or not your periods have started.",
    blocks: [
      [
        "Start with a little understanding",
        "Explore body changes, periods, hygiene, healthy boundaries and asking for help through six short weekly lessons.",
      ],
      [
        "Your diary, your choice",
        "A diary is optional, never graded and never required to learn. In the planned service, parents and schools cannot browse it. This preview uses fixed fictional entries only.",
      ],
      [
        "Questions are welcome",
        "Ask GroomingHer will explain approved lessons in simpler words and link back to the lesson. It will not read your diary, diagnose a condition or suggest medicines. It stays unavailable until professional review.",
      ],
      [
        "Choose what you tell someone",
        "Pick a verified safe adult, choose your words, review the exact message and decide whether to send or cancel. Nothing is attached or shared automatically.",
      ],
      [
        "Support without conditions",
        "You can ask a safe adult for help without using a diary or finishing a lesson. If one adult feels unsafe or is unavailable, choose another support route.",
      ],
      [
        "Learn beyond a screen",
        "Core lessons can be explored through school sessions and printed materials. You do not need your own phone.",
      ],
    ],
    role: "girl",
    action: "Get Started as Girl",
  },
  parents: {
    eyebrow: "For parents and guardians",
    title: "Be alongside her, with understanding.",
    text: "Practical guides, gentle conversation starters and a school programme that helps you support her with dignity and compassion.",
    blocks: [
      [
        "Begin by listening",
        "Explore parent guides about growing up, periods, hygiene and asking for qualified help. Respond calmly, without blame or assumptions.",
      ],
      [
        "A gentle conversation starter",
        "“Is there anything from your lesson you would like us to discuss?” If she is not ready, leave the door open without pressuring her to explain.",
      ],
      [
        "Receive only what she chooses",
        "A fictional message might say: “Could we talk about something from our lesson?” The planned parent space shows only exact messages she has reviewed and confirmed.",
      ],
      [
        "Connection does not unlock her diary",
        "Her diary, unshared symptoms and private AI questions remain unavailable. Permission to participate is separate from diary use and each chosen message.",
      ],
      [
        "School and home, connected",
        "Participating families will receive invitations through an approved school. Both accounts must confirm the correct connection; choosing “parent” does not establish permission authority.",
      ],
      [
        "Faith expressed through care",
        "Christian reflections encourage compassion and dignity. Prayer accompanies practical support and needed healthcare; illness and periods are not spiritual failure.",
      ],
    ],
    role: "parent",
    action: "Get Started as Parent",
  },
  schools: {
    eyebrow: "For Christian schools",
    title: "Bring caring education into school.",
    text: "Help shape a proposed six-week programme for Nigerian girls aged 13–15, with families informed, print access and a clear human-support route.",
    blocks: [
      [
        "A school programme, not a health dashboard",
        "Staff coordinate lessons, invitations and attendance. They do not see diaries, private AI questions, parent messages or suspected-condition lists.",
      ],
      [
        "Prepare the people and the materials",
        "Confirm a facilitator, trained female support contact, backup, available hours and a route to qualified healthcare. Health, faith, privacy and child-protection reviews are required.",
      ],
      [
        "Include girls without a phone",
        "Guided sessions, girl lessons, parent sheets and printed activities support core learning. Optional paper diaries are not collected or graded.",
      ],
      [
        "Interest is the beginning",
        "A school registers interest, discusses readiness and waits for approval. Only approved named staff invitations will grant live access. No pilot school, dates or funding are secured.",
      ],
    ],
    role: "school",
    action: "Register Your School’s Interest",
  },
} as const;
export function generateStaticParams() {
  return Object.keys(data).map((audience) => ({ audience }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  return {
    title: Object.hasOwn(data, audience)
      ? data[audience as keyof typeof data].eyebrow
      : "Solutions",
  };
}
export default async function Solution({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  if (!Object.hasOwn(data, audience)) notFound();
  const d = data[audience as keyof typeof data];
  return (
    <>
      <PageIntro eyebrow={d.eyebrow} title={d.title} text={d.text}>
        <div className="actions">
          <Link
            className="button primary"
            href={
              audience === "schools" ? "#interest" : `/onboarding/${d.role}`
            }
          >
            {d.action}
            <Icon name="arrow" size={18} />
          </Link>
          <Link className="button secondary" href="/resources">
            Explore Resources
          </Link>
        </div>
      </PageIntro>
      <section className="container content-section">
        <div className="two-columns">
          {d.blocks.map(([title, body]) => (
            <article className="panel" key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="Learning preview"
          title="Six weeks. A thoughtful beginning."
        />
        <ReviewNotice />
        <Programme />
      </section>
      {audience === "schools" ? (
        <section className="container content-section">
          <DemoEnquiry school />
        </section>
      ) : (
        <section className="container content-section">
          <div className="notice">
            <strong>Fictional demonstration, not live enrolment.</strong>
            <p>
              Sample invitations and brief preferences let you explore the
              journey. No account is created and no child’s information is
              collected.
            </p>
          </div>
          <Link className="button primary" href={`/onboarding/${d.role}`}>
            {d.action}
            <Icon name="arrow" size={18} />
          </Link>
        </section>
      )}
    </>
  );
}
