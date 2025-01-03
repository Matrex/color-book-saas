import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  icon: LucideIcon;
  children: ReactNode;
}

export default function IconDetail(props: Props) {
  return (
    <div className="flex gap-2.5">
      <props.icon size={20} className="text-slate-400" />
      <div className="text-slate-300 leading-tight">{props.children}</div>
    </div>
  );
}
