import { LoaderCircle, LucideIcon } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import storageApi, { StorageUploadPayload } from "../apis/storageApi";
import useButton from "../hooks/useButton";
import urlUtil from "../utils/urlUtil";

type Background = "light" | "dark";

interface Props {
  name: string;
  accept: string;
  value: string;
  icon: LucideIcon;
  background: Background;
  label?: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
}

const backgroundClasses: Record<Background, string> = {
  light: "bg-slate-700 ring-slate-700 focus-within:ring-slate-600",
  dark: "bg-slate-800 ring-slate-800 focus-within:ring-slate-700",
};

export default function File(props: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [processing, startProcessing, stopProcessing] = useButton();

  const className = `${backgroundClasses[props.background]} ${
    props.value ? "text-slate-300" : "text-slate-500"
  } ring-1 ring-inset px-5 py-3 rounded-xl cursor-pointer relative flex justify-between items-center transition-colors duration-300`;

  const Icon = processing ? LoaderCircle : props.icon;
  const iconClass = `will-change-transform ${
    processing ? "animate-spin" : ""
  } flex-shrink-0`;

  const upload = async (file: File) => {
    const payload: StorageUploadPayload = {
      file,
    };
    startProcessing();
    const result = await storageApi.upload(payload);
    stopProcessing();
    if (!result) return "";
    return result.url;
  };

  const clearField = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(props.name, props.value);
    event.target.value = "";
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const url = await upload(file);
      if (url) props.onChange(props.name, url);
      else clearField(event);
    } else clearField(event);
  };

  const handleWrapperClick = () => {
    if (fileRef.current) fileRef.current.click();
  };

  return (
    <div className="flex flex-col gap-2">
      {props.label && <label>{props.label}</label>}
      <div className={className} onClick={handleWrapperClick}>
        <input
          ref={fileRef}
          type="file"
          accept={props.accept}
          name={props.name}
          onChange={handleChange}
          className="absolute top-0 left-0 outline-none w-0 h-0 invisible"
        />
        {urlUtil.trimFilename(props.value) || props.placeholder}
        <Icon size={20} className={iconClass} />
      </div>
    </div>
  );
}
