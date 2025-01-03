import { Clock, User, WalletMinimal } from "lucide-react";
import IconDetail from "./IconDetail";
import dateUtil from "../../utils/dateUtil";
import { PaginateResult } from "../../apis/subscriptionApi";

interface Props {
  subscription: PaginateResult;
}

type Status = "canceled" | "active";

interface StatusConfig {
  className: string;
  text: string;
}

const statusConfigs: Record<Status, StatusConfig> = {
  active: {
    className: "text-slate-900 bg-yellow-400",
    text: "active",
  },
  canceled: {
    className: "text-slate-400 bg-slate-900",
    text: "canceled",
  },
};

export default function SubscriptionCard(props: Props) {
  const { subscription } = props;
  const createdAt = dateUtil.fromIso(subscription.created_at).toRelative();
  const status: Status = subscription.canceled_at ? "canceled" : "active";
  const statusConfig = statusConfigs[status];

  return (
    <div className="bg-slate-800 p-5 rounded-2xl flex flex-col gap-4">
      <div className="grid gap-2">
        <IconDetail icon={User}>
          <div className="text-slate-200">{subscription.user.email}</div>
          <div className="text-slate-400">{subscription.user.stripe_id}</div>
        </IconDetail>
        <IconDetail icon={WalletMinimal}>
          <div>{subscription.plan.title}</div>
          <div className="text-slate-400">${subscription.price}</div>
        </IconDetail>
        <IconDetail icon={Clock}>{createdAt}</IconDetail>
      </div>
      {
        <div
          className={`${statusConfig.className} w-fit leading-tight px-2 rounded-md`}
        >
          {statusConfig.text}
        </div>
      }
    </div>
  );
}
