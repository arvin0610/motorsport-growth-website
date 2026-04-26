import type { Metadata } from "next";
import { ContactBlock } from "@/components/contact-block";

export const metadata: Metadata = {
  title: "Contact",
  description: "Pit lane is open. Forty-minute strategy call. We come prepared, you come honest.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 md:pt-40">
      <ContactBlock />
    </div>
  );
}
