import { Hero } from "@/components/hero";
import { ClientMarquee } from "@/components/client-marquee";
import { Who } from "@/components/who";
import { ServicesIndex } from "@/components/services-index";
import { ProcessTimeline } from "@/components/process-timeline";
import { Voices } from "@/components/voices";
import { ContactBlock } from "@/components/contact-block";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <Who />
      <ServicesIndex />
      <ProcessTimeline />
      <Voices />
      <ContactBlock />
    </>
  );
}
