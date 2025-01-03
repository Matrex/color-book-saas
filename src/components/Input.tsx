import { ChangeEvent, ReactNode } from "react";

type Background = "light" | "dark";

interface Props {
  type: "text" | "number";
  name: string;
  value: string;
  background: Background;
  label?: string;
  placeholder?: string;
  helper?: ReactNode;
  onChange(name: string, value: string): void;
}

const backgroundClasses: Record<Background, string> = {
  light: "bg-slate-700 ring-slate-700 focus:ring-slate-600",
  dark: "bg-slate-800 ring-slate-800 focus:ring-slate-700",
};

export default function Input(props: Props) {
  const className = `${
    backgroundClasses[props.background]
  } outline-none text-slate-300 placeholder:text-slate-500 ring-1 ring-inset px-5 py-3 rounded-xl`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(props.name, event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      {props.label && <label>{props.label}</label>}
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        onChange={handleChange}
        className={className}
      />
      {props.helper && <div className="text-sm">{props.helper}</div>}
    </div>
  );
}
