import { CircleSlash, Info, WalletMinimal } from "lucide-react";
import PlanCredit from "./PlanCredit";
import Button from "../Button";
import { CreditData } from "../../apis/creditApi";
import dateUtil from "../../utils/dateUtil";
import stripeApi from "../../apis/stripeApi";
import useAlertStore from "../../stores/alertStore";
import Confirm from "../Confirm";
import useConfirmStore from "../../stores/confirmStore";
import { useNavigate } from "react-router-dom";

interface Props {
  credit: CreditData;
}

export default function ActivePlan(props: Props) {
  const { credit } = props;
  const { plan, subscription } = credit.user;
  const replaceAlert = useAlertStore((state) => state.replace);
  const replaceConfirm = useConfirmStore((state) => state.replace);
  const navigate = useNavigate();

  const handleCancelPlanClick = async () => {
    replaceConfirm(
      "danger",
      "Are you sure you want to cancel your active subscription plan?",
      credit.id
    );
  };

  const handleCancelPlan = async (_id: number, done: VoidFunction) => {
    const result = await stripeApi.cancelSubscription();
    done();
    if (!result) return;
    replaceAlert(
      "success",
      "Your active subscription plan has been canceled",
      true
    );
    navigate("/pages/public");
  };

  return (
    <div>
      <h4 className="font-semibold text-lg mb-2">Plan</h4>
      <div className="grid gap-4">
        <div className="text-slate-900 bg-yellow-400 rounded-md py-0.5 px-4 leading-tight w-fit">
          {plan ? plan.name : ""}
        </div>
        <div>
          <h5 className="font-semibold mb-2">Available credits</h5>
          <PlanCredit
            title="public page coloring remaining"
            amount={credit.public_page}
          />
          <PlanCredit
            title="page creations remaining"
            amount={credit.page_creation}
          />
        </div>
        {subscription && !subscription.canceled_at && (
          <div className="flex gap-2">
            <Info size={20} className="self-start shrink-0" />
            <p className="text-sm leading-snug">
              Your available credits will expire, and your subscription will
              renew on {dateUtil.fromIso(subscription.expire_at).toLocal()}.
            </p>
          </div>
        )}
        <div className="grid gap-3">
          <Button
            type="primary"
            text="Change plan"
            icon={WalletMinimal}
            hug={false}
            processing={false}
            to="/checkout"
          />
          {subscription && !subscription.canceled_at && (
            <Button
              type="secondary"
              text="Cancel plan"
              icon={CircleSlash}
              hug={false}
              processing={false}
              onClick={handleCancelPlanClick}
            />
          )}
        </div>
      </div>
      <Confirm onProceed={handleCancelPlan} />
    </div>
  );
}
