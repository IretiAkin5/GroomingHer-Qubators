import { PageIntro } from "@/components/Public";
import DemoEnquiry from "@/components/DemoEnquiry";
export const metadata = { title: "Contact Us" };
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="We welcome thoughtful questions"
        title="Contact Us"
        text="Explore general enquiries, school participation and content concerns. This demonstration does not send messages."
      />
      <section className="container content-section two-columns">
        <DemoEnquiry />
        <aside>
          <div className="panel">
            <h2>A conversation, with care</h2>
            <p>
              In the future, this page will offer a verified contact route for
              adults asking about the programme, school interest and content
              concerns.
            </p>
            <p>
              Please do not enter a child’s private health details, upload
              records or describe intimate experiences.
            </p>
          </div>
          <div className="panel">
            <h2>Need help now?</h2>
            <p>
              This website is not monitored for emergencies. Seek immediate
              assistance from a safe adult, qualified healthcare professional or
              local emergency service.
            </p>
            <p>
              Verified school contacts, hours and a backup must be confirmed
              before a pilot begins. There is no live support service in this
              preview.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
