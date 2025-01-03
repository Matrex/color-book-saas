import { ArrowRight } from "lucide-react";

interface Props {
  index: number;
  question: string;
  answer: string;
  active: boolean;
  onClick: (index: number) => void;
}

export default function Faq(props: Props) {
  const handleClick = () => props.onClick(props.index);

  return (
    <div className="px-6 py-5 rounded-lg bg-slate-800 gap-6 flex flex-col">
      <div
        className="flex gap-5 justify-between cursor-pointer select-none"
        onClick={handleClick}
      >
        <h5 className="text-slate-300 font-medium text-lg leading-tight">
          {props.question}
        </h5>
        <ArrowRight
          size={24}
          className={`text-slate-600 transition-transform duration-300 ${
            props.active ? "rotate-90" : ""
          }`}
        />
      </div>
      {props.active && (
        <p className="text-lg text-slate-400 leading-7">{props.answer}</p>
      )}
    </div>
  );
}
