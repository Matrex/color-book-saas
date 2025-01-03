import { CircleCheck } from "lucide-react";
import PageHeading from "../PageHeading";
import { StatusResult } from "../../apis/appApi";
import { map } from "lodash-es";
import useAppStore from "../../stores/appStore";

export default function AppSetupStatus() {
  const status = useAppStore((state) => state.status);

  const labels: Record<keyof StatusResult, string> = {
    openaiApi: "OpenAI API",
    stripeApi: "Stripe API",
    stripeWebhook: "Stripe Webhook",
    plans: "Plans",
  };

  return (
    <div>
      <PageHeading heading="App setup status" />
      <div className="bg-slate-800 p-5 rounded-2xl flex flex-col gap-1.5">
        {map(status, (value, key) => (
          <div className="flex items-center justify-between" key={key}>
            <h5 className="text-slate-300 leading-tight">
              {labels[key as keyof StatusResult]}
            </h5>
            <CircleCheck
              size={20}
              className={`${value ? "text-yellow-400" : "text-slate-600"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
