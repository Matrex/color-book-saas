import { useShallow } from "zustand/shallow";
import useAppStore, { ContactSection } from "../../../stores/appStore";
import Heading from "../Heading";
import ContactDetail from "./ContactDetail";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [readByPath] = useAppStore(useShallow((state) => [state.readByPath]));
  const contact = readByPath<ContactSection>("website.landing.contact");
  if (!contact.visibility) return null;

  return (
    <section id="contact" className="pt-36">
      <div className="flex gap-5 md:gap-12 w-fit md:items-center justify-center mx-auto flex-col md:flex-row">
        <div>
          <Heading
            heading="Get in touch with us"
            description={contact.subheading}
            align="left"
          />
          <div className="flex flex-col gap-9 mt-11">
            {contact.location && (
              <ContactDetail
                icon={MapPin}
                title="Our location"
                content={contact.location}
              />
            )}
            {contact.phone && (
              <ContactDetail
                icon={Phone}
                title="Phone number"
                content={contact.phone}
                to={`tel:${contact.phone}`}
              />
            )}
            {contact.email && (
              <ContactDetail
                icon={Mail}
                title="Email address"
                content={contact.email}
                to={`mailto:${contact.email}`}
              />
            )}
          </div>
        </div>
        <img src={contact.image} className="w-full max-w-80 md:max-w-96" />
      </div>
    </section>
  );
}
