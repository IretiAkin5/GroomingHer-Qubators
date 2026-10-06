import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/components/DemoProvider";

export const metadata: Metadata = {
  title: {
    default: "GroomingHer — Growing in knowledge. Grounded in faith.",
    template: "%s · GroomingHer",
  },
  description:
    "Christian health education for Nigerian girls aged 13–15, with parents and schools alongside them. Fictional demonstration; sample health content awaits professional review.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
