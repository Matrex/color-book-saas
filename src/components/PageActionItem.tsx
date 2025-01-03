import { LucideIcon } from "lucide-react";
import { MouseEvent } from "react";

interface Props {
  id: number;
  icon: LucideIcon;
  value: string | number | null;
  active: boolean;
  onClick?: (id: number) => void;
}

export default function PageActionItem(props: Props) {
  const wrapperCursorClass = props.onClick ? "cursor-pointer" : "";
  const iconActiveClass = props.active ? "text-yellow-400" : "text-slate-400";

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!props.onClick) return;
    event.preventDefault();
    props.onClick(props.id);
  };

  return (
    <div
      className={`${wrapperCursorClass} flex gap-1.5 items-center`}
      onClick={handleClick}
    >
      <props.icon size={20} className={iconActiveClass} />
      <div className="text-sm text-slate-400">{props.value}</div>
    </div>
  );
}
