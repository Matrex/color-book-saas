import { LoaderCircle, LucideIcon } from "lucide-react";
import useButton from "../../hooks/useButton";

interface Props {
  icon: LucideIcon;
  active: boolean;
  disabled?: boolean;
  onClick(done?: VoidFunction): void;
}

export default function ColorAction(props: Props) {
  const [processing, startProcessing, stopProcessing] = useButton();
  const Icon = processing ? LoaderCircle : props.icon;
  const iconClass = `
    ${processing ? "animate-spin" : ""}
    ${props.disabled ? "" : "cursor-pointer"}
  `;

  const handleClick = () => {
    if (props.disabled) return;
    if (props.onClick.length) startProcessing();
    props.onClick(() => {
      stopProcessing();
    });
  };

  return (
    <Icon
      size={24}
      className={`${
        props.disabled
          ? "text-slate-500"
          : props.active
          ? "text-yellow-400"
          : "text-slate-300"
      } ${iconClass} select-none`}
      onClick={handleClick}
    />
  );
}
