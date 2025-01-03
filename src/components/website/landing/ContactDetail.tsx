import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  content: string;
  to?: string;
}

export default function ContactDetail(props: Props) {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-slate-800">
        <props.icon size={24} className="text-yellow-400" />
      </div>
      <div>
        <h5 className="text-xl text-slate-100 leading-tight mb-1">
          {props.title}
        </h5>
        <div className="text-lg text-slate-400">
          {props.to ? <a href={props.to}>{props.content}</a> : props.content}
        </div>
      </div>
    </div>
  );
}
