import Heading from "../Heading";
import Button from "../../Button";
import { LifeBuoy } from "lucide-react";
import Faq from "./Faq";
import { useState } from "react";
import useAppStore, { FaqsSection } from "../../../stores/appStore";
import { useShallow } from "zustand/shallow";

export default function Faqs() {
  const [active, setActive] = useState<number | null>(null);
  const [readByPath] = useAppStore(useShallow((state) => [state.readByPath]));
  const faqs = readByPath<FaqsSection>("website.landing.faqs");
  if (!faqs.visibility) return null;

  const handleFaqClick = (index: number) => {
    if (active === index) setActive(null);
    else setActive(index);
  };

  return (
    <section id="faqs" className="pt-36">
      <div className="grid md:grid-cols-2 gap-5 gap-y-8 md:gap-12">
        <div>
          <Heading heading="FAQs" description={faqs.subheading} align="left" />
          <img src={faqs.image} className="mt-11 w-full max-w-96" />
        </div>
        <div className="flex flex-col gap-4">
          {faqs.faqs.map((faq, index) => (
            <Faq
              index={index}
              question={faq.question}
              answer={faq.answer}
              active={index === active}
              onClick={handleFaqClick}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-5 md:gap-12">
        <div className="mt-14 col-span-2 col-start-2 flex flex-col items-center text-center">
          <h4 className="text-xl font-medium text-slate-100 leading-tight mb-3">
            {faqs.support.heading}
          </h4>
          <p className="leading-snug mb-6 text-lg font-medium text-slate-300">
            {faqs.support.description}
          </p>
          <Button
            type="primary"
            text="Get support"
            icon={LifeBuoy}
            to={faqs.support.link}
            hug={true}
            processing={false}
          />
        </div>
      </div>
    </section>
  );
}
