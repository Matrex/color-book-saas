import { LucideIcon } from "lucide-react";
import { useState } from "react";

export interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  value: string;
  icon: LucideIcon;
  options: Option[];
  onChange: (name: string, value: string) => void;
}

export default function Select(props: Props) {
  const selected = props.options.find((option) => option.value === props.value);
  const [opened, setOpened] = useState(false);

  const activeOptionClass = (value: string) => {
    const isActive = props.value === value;
    return isActive ? "text-yellow-400" : "text-slate-300";
  };

  const handleOptionsToggle = () => {
    setOpened((opened) => !opened);
  };

  const handleSelect = (value: string) => {
    return () => {
      props.onChange(props.name, value);
      setOpened(false);
    };
  };

  return (
    <div className="flex flex-col gap-2 relative select-none w-full">
      <div
        className="bg-slate-800 ring-slate-800 outline-none text-slate-300 placeholder:text-slate-500 ring-1 ring-inset px-5 py-3 rounded-xl flex items-center justify-between cursor-pointer"
        onClick={handleOptionsToggle}
      >
        <span>{selected ? selected.label : ""}</span>
        <props.icon size={20} />
      </div>
      {opened && (
        <ul className="flex flex-col gap-2 bg-slate-800 px-5 py-4 rounded-xl absolute z-50 right-0 top-14 w-full">
          {props.options.map((option) => {
            return (
              <li
                key={option.value}
                className={`${activeOptionClass(
                  option.value
                )} cursor-pointer hover:text-slate-100 transition-colors duration-200`}
                onClick={handleSelect(option.value)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
