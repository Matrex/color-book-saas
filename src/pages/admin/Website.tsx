import { useShallow } from "zustand/shallow";
import PageHeading from "../../components/PageHeading";
import WebsiteSection from "../../components/admin/WebsiteSection";
import useAppStore from "../../stores/appStore";
import settingApi, { SettingUpdatePayload } from "../../apis/settingApi";

export interface SectionMeta {
  title: string;
  to: string;
  path: string;
}

const sectionMeta: SectionMeta[] = [
  {
    title: "Home",
    to: "home",
    path: "website.landing.home",
  },
  {
    title: "How it works",
    to: "how-it-works",
    path: "website.landing.howItWorks",
  },
  {
    title: "Features",
    to: "features",
    path: "website.landing.features",
  },
  {
    title: "Testimonial",
    to: "testimonial",
    path: "website.landing.testimonials",
  },
  {
    title: "Metrics",
    to: "metrics",
    path: "website.landing.metrics",
  },
  {
    title: "Pricing",
    to: "pricing",
    path: "website.landing.pricing",
  },
  {
    title: "FAQs",
    to: "faqs",
    path: "website.landing.faqs",
  },
  {
    title: "Call to action",
    to: "call-to-action",
    path: "website.landing.callToAction",
  },
  {
    title: "Contact",
    to: "contact",
    path: "website.landing.contact",
  },
  {
    title: "Footer",
    to: "footer",
    path: "website.landing.footer",
  },
  {
    title: "Terms of service",
    to: "terms",
    path: "website.terms",
  },
  {
    title: "Privacy policy",
    to: "privacy",
    path: "website.privacy",
  },
];

export function Website() {
  const [readByPath] = useAppStore(useShallow((state) => [state.readByPath]));

  const handleToggleVisibility = async () => {
    const website = readByPath("website");
    const payload: SettingUpdatePayload = {
      value: website,
    };
    settingApi.update("website", payload);
  };

  return (
    <div>
      <PageHeading heading="Website" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sectionMeta.map((section) => (
          <WebsiteSection
            section={section}
            key={section.to}
            onToggleVisibility={handleToggleVisibility}
          />
        ))}
      </div>
    </div>
  );
}
