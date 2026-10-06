import PublicNav from "@/components/PublicNav";
import { Footer } from "@/components/Public";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <PublicNav />
      <div className="demo-strip">
        <span className="demo-dot" />
        Development preview · Fictional data only · No live accounts or health
        collection
      </div>
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
