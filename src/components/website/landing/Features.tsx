import Heading from "../Heading";
import Button from "../../Button";
import { LogIn } from "lucide-react";
import Feature from "./Feature";
import useAppStore, { FeaturesSection } from "../../../stores/appStore";
import { useShallow } from "zustand/shallow";

export default function Features() {
  const [readByPath] = useAppStore(useShallow((state) => [state.readByPath]));
  const features = readByPath<FeaturesSection>("website.landing.features");
  if (!features.visibility) return null;

  return (
    <section id="features" className="pt-36">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/5">
          <div className="flex flex-col gap-7">
            <Heading
              heading="Features"
              description={features.subheading}
              align="left"
            />
            <Button
              type="primary"
              text="Start free trial"
              icon={LogIn}
              to="/sign-up"
              hug={true}
              processing={false}
            />
          </div>
          <img src={features.image} className="mt-12 w-full max-w-96" />
        </div>
        <div className="flex flex-col gap-7 lg:w-3/5">
          {features.features.map((feature) => (
            <Feature
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              key={feature.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
