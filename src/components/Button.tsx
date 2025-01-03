import { LoaderCircle, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Type = "primary" | "secondary" | "info" | "light";

interface Props {
  type: Type;
  to?: string;
  text: string;
  icon: LucideIcon;
  hug: boolean;
  processing: boolean;
  onClick?: VoidFunction;
}

const typeClass: Record<Type, string> = {
  primary: "bg-yellow-400 hover:bg-yellow-300 text-slate-900",
  secondary: "bg-slate-800 hover:bg-slate-700 text-slate-300",
  info: "bg-cyan-400 hover:bg-cyan-300 text-slate-900",
  light: "bg-white hover:bg-yellow-300 text-slate-900",
};

export default function Button(props: Props) {
  const className = `${typeClass[props.type]} ${
    props.hug ? "w-fit" : "w-full"
  } flex gap-2.5 rounded-xl w-fit px-5 py-3 transition-colors duration-300 items-center justify-center h-fit`;

  const Icon = props.processing ? LoaderCircle : props.icon;
  const iconClass = props.processing ? "animate-spin" : "";

  return props.to ? (
    <Link to={props.to} className={className}>
      <props.icon size={24} />
      <span className="font-semibold">{props.text}</span>
    </Link>
  ) : (
    <button
      disabled={props.processing}
      onClick={props.onClick}
      className={className}
    >
      <Icon size={24} className={iconClass} />
      <span className="font-semibold">{props.text}</span>
    </button>
  );
}
