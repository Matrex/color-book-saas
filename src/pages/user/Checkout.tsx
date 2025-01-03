import { useLoaderData, useSearchParams } from "react-router-dom";
import planApi, { PlanData, PlanName } from "../../apis/planApi";
import PageHeading from "../../components/PageHeading";
import Plan from "../../components/user/Plan";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { LogIn } from "lucide-react";
import useButton from "../../hooks/useButton";
import stripeApi from "../../apis/stripeApi";
import { find } from "lodash-es";
import routeUtil from "../../utils/routeUtil";

interface LoaderProps {
  plans: PlanData[];
}

export async function checkoutLoader() {
  const plans = await planApi.listPaid();
  return { plans };
}

export function Checkout() {
  const [searchParams] = useSearchParams();
  const [activePlan, setActivePlan] = useState<PlanName | null>(null);
  const { plans } = useLoaderData() as LoaderProps;
  const [processing, startProcessing, stopProcessing] = useButton();

  const handlePlanChoose = (name: PlanName) => {
    setActivePlan(name);
  };

  const handleCheckoutClick = async () => {
    startProcessing();
    const plan = find(plans, (plan) => plan.name === activePlan);
    if (!plan || !plan.stripe_price_id) {
      stopProcessing();
      return;
    }
    const result = await stripeApi.checkout({ priceId: plan.stripe_price_id });
    stopProcessing();
    if (!result) return;
    routeUtil.toExternal(result.url);
  };

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (!plan) return;
    setActivePlan(plan as PlanName);
  }, []);

  return (
    <div>
      <PageHeading heading="Choose plan" />
      <div className="grid grid-cols-10 gap-7">
        <div className="col-span-10 lg:col-span-8 xl:col-span-6 2xl:col-span-5 grid gap-5">
          {plans.map((plan) => (
            <Plan
              plan={plan}
              key={plan.name}
              active={plan.name === activePlan}
              onChoose={handlePlanChoose}
            />
          ))}
          <Button
            type="primary"
            text="Checkout"
            icon={LogIn}
            hug={false}
            processing={processing}
            onClick={handleCheckoutClick}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}
