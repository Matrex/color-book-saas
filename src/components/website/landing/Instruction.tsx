import { CircleCheck } from "lucide-react";

interface Props {
  content: string;
}

export default function Instruction(props: Props) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center justify-center bg-slate-900 p-4 rounded-xl text-yellow-400 w-14 h-14">
        <CircleCheck size={24} />
      </div>
      <p className="text-slate-100 text-lg">{props.content}</p>
    </div>
  );
}
