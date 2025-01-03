import { ChangeEventHandler } from "react";

interface Props {
  label: string;
  value: string;
  name: string;
  onChange(name: string, value: string): void;
}

export default function Textarea(props: Props) {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const { name, value } = event.currentTarget;
    props.onChange(name, value);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <label>{props.label}</label>
      <textarea
        value={props.value}
        name={props.name}
        onChange={handleChange}
        rows={3}
        className="bg-slate-800 ring-slate-800 outline-none text-slate-300 placeholder:text-slate-500 ring-1 ring-inset pl-5 pr-14 py-3 rounded-xl focus:ring-slate-700 scroll"
      />
    </div>
  );
}
