import PublicLayout from "../components/PublicLayout";
import { CircleAlert, CircleCheckBig, LogIn, LucideIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";

type Status = "success" | "canceled";

interface StatusData {
  heading: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

const statuses: Record<Status, StatusData> = {
  success: {
    heading: "Payment successful!",
    description: "Your payment was successful! Credits will be reflected soon.",
    icon: CircleCheckBig,
    iconColor: "text-green-500",
  },
  canceled: {
    heading: "Payment unsuccessful",
    description: "The payment was canceled. Please try again later.",
    icon: CircleAlert,
    iconColor: "text-red-500",
  },
};

export function PaymentResult() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") as Status;
  const statusData = statuses[status];
  if (!statusData) return null;

  return (
    <PublicLayout image="/assets/images/public.png">
      <statusData.icon
        size={44}
        className={`${statusData.iconColor} mt-5 mb-3`}
      />
      <h2 className="text-xl font-medium mb-1.5">{statusData.heading}</h2>
      <p className="mb-5">{statusData.description}</p>
      <Button
        type="primary"
        text="Return"
        icon={LogIn}
        hug={false}
        processing={false}
        to="/sign-in"
      />
    </PublicLayout>
  );
}
