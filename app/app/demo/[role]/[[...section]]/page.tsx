import { notFound } from "next/navigation";
import { isRole, lessons, roleNames, type Role } from "@/lib/content";
import DemoShell from "@/components/DemoShell";
import SpaceContent from "@/components/SpaceContent";
const sections: Record<Role, string[]> = {
  girl: [
    "",
    "lessons",
    "resources",
    "ask",
    "diary",
    "share",
    "messages",
    "progress",
    "support",
    "account",
  ],
  parent: [
    "",
    "guides",
    "messages",
    "programme",
    "support",
    "account",
    "feedback",
  ],
  school: [
    "",
    "sessions",
    "materials",
    "participation",
    "support",
    "feedback",
    "account",
  ],
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string; section?: string[] }>;
}) {
  const { role } = await params;
  return {
    title: isRole(role) ? `${roleNames[role]} demonstration` : "Demonstration",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ role: string; section?: string[] }>;
}) {
  const { role, section = [] } = await params;
  if (!isRole(role)) notFound();
  if (!sections[role].includes(section[0] ?? "")) notFound();
  if (
    section.length > 1 &&
    !(
      role === "girl" &&
      section[0] === "lessons" &&
      section.length === 2 &&
      lessons.some((l) => l.slug === section[1])
    )
  )
    notFound();
  return (
    <DemoShell role={role}>
      <SpaceContent role={role} section={section} />
    </DemoShell>
  );
}
