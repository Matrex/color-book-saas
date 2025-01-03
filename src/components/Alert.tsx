import { Info, CircleCheckBig, TriangleAlert, LucideIcon } from "lucide-react";
import useAlertStore, { Variant } from "../stores/alertStore";
import { useShallow } from "zustand/shallow";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface VariantData {
  icon: LucideIcon;
  class: string;
}

const variantsData: Record<Variant, VariantData> = {
  info: {
    icon: Info,
    class: "bg-cyan-400 text-cyan-950",
  },
  success: {
    icon: CircleCheckBig,
    class: "bg-green-400 text-green-950",
  },
  danger: {
    icon: TriangleAlert,
    class: "bg-red-400 text-red-950",
  },
};

export default function Alert() {
  const [variant, message, clear, persist] = useAlertStore(
    useShallow((state) => [
      state.variant,
      state.message,
      state.clear,
      state.persist,
    ])
  );
  const location = useLocation();

  const variantData = variantsData[variant];
  const Icon = variantData["icon"];
  const className = variantData["class"];

  const handleClick = () => {
    clear();
  };

  useEffect(() => {
    if (!persist) clear();
  }, [location]);

  return (
    message && (
      <div className="fixed left-0 bottom-16 z-50 flex w-full justify-center">
        <div
          className={`${className} flex items-center gap-2.5 py-3.5 px-5 mx-5 rounded-xl w-fit cursor-pointer`}
          onClick={handleClick}
        >
          <Icon size={24} className="flex-shrink-0" />
          <span>{message}</span>
        </div>
      </div>
    )
  );
}
