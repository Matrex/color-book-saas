import { PlanData, PlanName } from "../../apis/planApi";
import numberUtil from "../../utils/numberUtil";
import PlanCredit from "./PlanCredit";

interface Props {
  plan: PlanData;
  active: boolean;
  onChoose: (name: PlanName) => void;
}

export default function Plan(props: Props) {
  const { plan } = props;
  const splittedPrice = numberUtil.splitToParts(plan.price);

  const handlePlanClick = () => props.onChoose(plan.name);

  return (
    <div
      className="bg-slate-800 cursor-pointer p-5 rounded-2xl"
      onClick={handlePlanClick}
    >
      <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-semibold text-lg leading-tight">{plan.title}</h3>
          <span className="text-slate-900 bg-yellow-400 rounded py-0.5 px-1.5 text-sm leading-tight">
            {plan.name === "starter" && "Recommended"}
            {plan.name === "advanced" && `${plan.discount}% off`}
          </span>
        </div>
        <div>
          <span className="font-medium text-2xl">${splittedPrice[0]}.</span>
          {splittedPrice[1]}
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="font-semibold mb-1 leading-tight">You’ll get</p>
          <PlanCredit
            title="Public pages / month"
            amount={plan.public_page_limit}
          />
          <PlanCredit
            title="Page creations / month"
            amount={plan.page_creation_limit}
          />
        </div>
        <div
          className={`${
            props.active ? "bg-yellow-500" : "bg-slate-600"
          } rounded-full w-6 h-6 self-end transition-colors duration-300`}
        ></div>
      </div>
    </div>
  );
}
