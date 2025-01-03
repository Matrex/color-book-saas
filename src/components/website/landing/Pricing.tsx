import { useShallow } from "zustand/shallow";
import useAppStore, { PricingSection } from "../../../stores/appStore";
import Heading from "../Heading";
import Plan from "./Plan";
import { PlanData, PlanName } from "../../../apis/planApi";

interface Props {
  plans: PlanData[];
}

type Includes = Record<PlanName, string[]>;

export default function Pricing(props: Props) {
  const { plans } = props;
  const [readByPath] = useAppStore(useShallow((state) => [state.readByPath]));
  const pricing = readByPath<PricingSection>("website.landing.pricing");
  if (!pricing.visibility) return null;

  const includes = plans.reduce((acc, plan, index) => {
    switch (plan.name) {
      case "free":
        acc[plan.name] = [
          "Includes",
          `Color ${plan.public_page_limit} public pages`,
          `Generate ${plan.page_creation_limit} coloring pages`,
          "Save colored pages",
          `All-in-one tools for fun coloring`,
          `Available across multiple platforms`,
        ];
        break;
      case "starter":
        acc[plan.name] = [
          `Everything in ${plans[index - 1].title}, plus`,
          `Color ${plan.public_page_limit} public pages`,
          `Generate ${plan.page_creation_limit} coloring pages`,
          "Add pages to favorite",
          "Download colored pages",
          "Print colored pages",
        ];
        break;
      case "advanced":
        acc[plan.name] = [
          `Everything in ${plans[index - 1].title}, plus`,
          `Color ${plan.public_page_limit} public pages`,
          `Generate ${plan.page_creation_limit} coloring pages`,
        ];
        break;
    }
    return acc;
  }, {} as Includes);

  return (
    <section id="pricing" className="pt-36">
      <Heading
        heading="Pricing"
        description={pricing.subheading}
        align="center"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center pt-11">
        {props.plans.map((plan) => (
          <Plan plan={plan} includes={includes[plan.name]} key={plan.name} />
        ))}
      </div>
    </section>
  );
}
