import { PageIntro } from "@/components/Public";
import DemoLogin from "@/components/DemoLogin";
export const metadata = { title: "Log In" };
export default function Login() {
  return (
    <>
      <PageIntro
        eyebrow="Welcome back"
        title="Return to a demonstration space."
        text="Live accounts are not enabled. Please don’t enter a real email address, password or a child’s information."
      />
      <section className="container content-section">
        <DemoLogin />
      </section>
    </>
  );
}
