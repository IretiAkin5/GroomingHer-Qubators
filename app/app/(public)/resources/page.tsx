import { PageIntro } from "@/components/Public";
import ResourceLibrary from "@/components/ResourceLibrary";
export const metadata = { title: "Learning Resources" };
export default function Resources() {
  return (
    <>
      <PageIntro
        eyebrow="A little learning goes a long way"
        title="Start with a question."
        text="Explore introductory lessons about growing up, at your own pace. No account, personal details or symptom entries are needed."
      />
      <section className="container content-section">
        <ResourceLibrary />
      </section>
    </>
  );
}
