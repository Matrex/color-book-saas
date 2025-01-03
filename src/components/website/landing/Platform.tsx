import { RemixiconComponentType } from "@remixicon/react";
import { Link } from "react-router-dom";

export type PlatformSize = "regular" | "medium";

interface Props {
  size: PlatformSize;
  icon: RemixiconComponentType;
  title: string;
  to: string;
}

const sizeClasses: Record<PlatformSize, string> = {
  regular: "w-14 h-14",
  medium: "w-20 h-20",
};

export default function Platform(props: Props) {
  return (
    props.to && (
      <Link
        to={props.to}
        target="_blank"
        className={`${
          sizeClasses[props.size]
        } flex flex-col items-center justify-center bg-slate-800 transition-colors duration-300 gap-2 rounded-xl hover:bg-yellow-400 hover:text-slate-900 cursor-pointer`}
      >
        <props.icon size={24} />
        {props.size === "medium" && (
          <h6 className="text-sm leading-tight">{props.title}</h6>
        )}
      </Link>
    )
  );
}
