import { SquarePen, WalletMinimal } from "lucide-react";
import IconDetail from "./IconDetail";
import { Link } from "react-router-dom";
import { PlanData } from "../../apis/planApi";

interface Props {
  plan: PlanData;
}

export default function PlanCard(props: Props) {
  const { plan } = props;

  return (
    <div className="bg-slate-800 p-5 rounded-2xl flex flex-col gap-3">
      <div>
        <h4 className="font-medium mb-1.5 leading-tight">{plan.title}</h4>
        <p className="text-slate-300 leading-tight">{plan.description}</p>
      </div>
      <IconDetail icon={WalletMinimal}>${plan.price}</IconDetail>
      <div className="text-slate-300">
        <div className="leading-snug">
          Public pages: {plan.public_page_limit}
        </div>
        <div className="leading-snug">
          Create pages: {plan.page_creation_limit}
        </div>
      </div>
      <div className="flex justify-end">
        <Link to={`${plan.id}/edit`}>
          <SquarePen size={20} className="text-slate-400" />
        </Link>
      </div>
    </div>
  );
}
