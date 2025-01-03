import { LoaderCircle, WandSparkles } from "lucide-react";
import { ChangeEvent } from "react";
import useButton from "../../hooks/useButton";

interface Props {
  name: string;
  value: string;
  label: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
  onGenerate: (onGenerated: VoidFunction) => void;
}

export default function InputPrompt(props: Props) {
  const [processing, startProcessing, stopProcessing] = useButton();
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(props.name, event.target.value);
  };

  const handleGenerateClick = () => {
    startProcessing();
    props.onGenerate(() => {
      stopProcessing();
    });
  };

  const Icon = processing ? LoaderCircle : WandSparkles;
  const processingClass = processing ? "animate-spin" : "";

  return (
    <div className="flex flex-col gap-2 relative">
      <label>{props.label}</label>
      <textarea
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        onChange={handleChange}
        rows={5}
        className="resize-none bg-slate-800 ring-slate-800 outline-none text-slate-300 placeholder:text-slate-500 ring-1 ring-inset pl-5 pr-14 py-3 rounded-xl focus:ring-slate-700 scroll"
      />
      <button
        className="bg-slate-900 absolute right-2 top-10 p-2 rounded-lg"
        onClick={handleGenerateClick}
        disabled={processing}
      >
        <Icon size={24} className={`${processingClass} text-slate-300`} />
      </button>
    </div>
  );
}
