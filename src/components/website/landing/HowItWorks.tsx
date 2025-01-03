import { useShallow } from "zustand/shallow";
import useAppStore, { HowItWorksSection } from "../../../stores/appStore";
import Heading from "../Heading";
import Instruction from "./Instruction";

export default function HowItWorks() {
  const [readByPath] = useAppStore(useShallow((state) => [state.readByPath]));
  const howItWorks = readByPath<HowItWorksSection>(
    "website.landing.howItWorks"
  );
  if (!howItWorks.visibility) return null;

  return (
    <section id="how-it-works" className="pt-36">
      <div className="max-w-[1024px] mx-auto">
        <Heading
          heading="How it works"
          description={howItWorks.subheading}
          align="center"
        />
        <div className="mt-11 p-7 sm:p-12 bg-slate-800 rounded-3xl flex flex-col-reverse lg:flex-row gap-10 items-center">
          <div className="flex flex-col gap-8">
            {howItWorks.instructions.map((instruction) => (
              <Instruction content={instruction.content} key={instruction.id} />
            ))}
          </div>
          <div className="max-w-64 lg:max-w-80 relative">
            <video
              src="/assets/videos/how-it-works.mp4"
              autoPlay
              loop
              muted
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain rounded-[8%] scale-[90%]"
            ></video>
            <img
              src="/assets/images/phone.png"
              className="w-full h-auto relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
