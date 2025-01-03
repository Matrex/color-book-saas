import {
  CircleCheckBig,
  Info,
  LoaderCircle,
  LucideIcon,
  TriangleAlert,
} from "lucide-react";
import useConfirmStore, { Variant } from "../stores/confirmStore";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  onProceed(id: number, onProceeded: () => void): void;
}

interface VariantData {
  icon: LucideIcon;
  class: string;
  cancelClass: string;
  proceedClass: string;
}

const variantsData: Record<Variant, VariantData> = {
  info: {
    icon: Info,
    class: "bg-cyan-400 text-cyan-950",
    cancelClass: "text-cyan-400 bg-cyan-950 hover:bg-cyan-900",
    proceedClass: "hover:bg-cyan-300 border-cyan-600",
  },
  success: {
    icon: CircleCheckBig,
    class: "bg-green-400 text-green-950",
    cancelClass: "text-green-400 bg-green-950 hover:bg-green-900",
    proceedClass: "hover:bg-green-300 border-green-600",
  },
  danger: {
    icon: TriangleAlert,
    class: "bg-red-400 text-red-950",
    cancelClass: "text-red-400 bg-red-950 hover:bg-red-900",
    proceedClass: "hover:bg-red-300 border-red-600",
  },
};

export default function Confirm(props: Props) {
  const [id, variant, message, proceeding, clear, replaceProceeding] =
    useConfirmStore(
      useShallow((state) => [
        state.id,
        state.variant,
        state.message,
        state.proceeding,
        state.clear,
        state.replaceProceeding,
      ])
    );
  const location = useLocation();

  const variantData = variantsData[variant];
  const Icon = proceeding ? LoaderCircle : variantData["icon"];
  const iconClass = proceeding ? "animate-spin" : "";
  const className = variantData["class"];
  const cancelClass = variantData["cancelClass"];
  const proceedClass = variantData["proceedClass"];

  const handleProceedClick = () => {
    if (!id) return;
    replaceProceeding(true);
    props.onProceed(id, () => {
      replaceProceeding(false);
      clear();
    });
  };

  const handleCancelClick = () => {
    clear();
  };

  useEffect(() => {
    clear();
  }, [location]);

  return (
    message && (
      <div className="fixed left-0 bottom-16 z-50 px-5 w-full flex justify-center">
        <div
          className={`${className} flex items-start gap-2.5 py-3.5 px-5 rounded-xl w-fit`}
        >
          <Icon size={24} className={`${iconClass} flex-shrink-0`} />
          <div>
            <p className="mb-2">{message}</p>
            <div className="flex gap-4">
              <button
                className={`${cancelClass} px-3 rounded-md cursor-pointer transition-colors duration-300`}
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className={`${proceedClass} border px-3 rounded-md cursor-pointer transition-colors duration-300`}
                onClick={handleProceedClick}
                disabled={proceeding}
              >
                Yes, proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
