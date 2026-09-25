import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "GroomingHer", description: "Trusted puberty and menstrual health companion for teens.", manifest: "/manifest.webmanifest" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Nunito, system-ui, sans-serif" }}>
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "16px 14px 90px" }}>{children}</main>
      </body>
    </html>
  );
}
