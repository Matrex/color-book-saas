import { useLoaderData } from "react-router-dom";
import planApi, { PlanData } from "../../apis/planApi";
import PageHeading from "../../components/PageHeading";
import PlanCard from "../../components/admin/PlanCard";

interface LoaderProps {
  plans: PlanData[];
}

export async function planLoader() {
  const plans = await planApi.list();
  return { plans };
}

export function Plans() {
  const { plans } = useLoaderData() as LoaderProps;

  return (
    <div>
      <PageHeading heading="Plans" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <PlanCard plan={plan} key={plan.id} />
        ))}
      </div>
    </div>
  );
}
