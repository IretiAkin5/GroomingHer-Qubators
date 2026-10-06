import { notFound } from "next/navigation";
import { isRole, roleNames } from "@/lib/content";
import Onboarding from "@/components/Onboarding";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  return {
    title: isRole(role) ? `${roleNames[role]} onboarding` : "Onboarding",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  if (!isRole(role)) notFound();
  return <Onboarding role={role} />;
}
