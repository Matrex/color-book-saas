import { LogIn } from "lucide-react";
import numberUtil from "../../../utils/numberUtil";
import Button from "../../Button";
import { PlanData } from "../../../apis/planApi";

interface Props {
  plan: PlanData;
  includes: string[];
}

export default function Plan(props: Props) {
  const { plan } = props;
  const splittedPrice = numberUtil.splitToParts(plan.price);

  return (
    <div className="flex flex-col gap-6 p-8 bg-slate-800 rounded-3xl">
      <div>
        <div className="flex items-center flex-wrap gap-3 mb-1.5">
          <h3 className="text-slate-100 font-semibold text-2xl leading-tight">
            {plan.title}
          </h3>
          {plan.name !== "free" && (
            <div className="rounded-md bg-yellow-400 text-slate-900 px-1.5 leading-tight font-medium">
              {plan.name === "starter" && "Recommended"}
              {plan.name === "advanced" && `${plan.discount}% off`}
            </div>
          )}
        </div>
        <p className="text-slate-300 text-lg">{plan.description}</p>
      </div>
      <h2 className="text-yellow-400 font-bold text-3xl">
        ${splittedPrice[0]}
        <span className="text-lg">
          .{splittedPrice[1]} {plan.name !== "free" && " / month"}
        </span>
      </h2>
      <div className="flex flex-col gap-4">
        {props.includes.map((include, index) => {
          return (
            <p
              className={`${
                index === 0 ? "font-semibold text-slate-100" : "text-slate-300"
              } text-lg leading-tight`}
              key={include}
            >
              {include}
            </p>
          );
        })}
      </div>
      <Button
        type={plan.price === 0 ? "light" : "primary"}
        to={plan.name === "free" ? "/sign-up" : `/sign-up/?plan=${plan.name}`}
        text={
          plan.name === "free" ? "Start free trial" : `Choose ${plan.title}`
        }
        icon={LogIn}
        hug={false}
        processing={false}
      />
    </div>
  );
}
