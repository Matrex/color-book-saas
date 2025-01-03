import { ReactNode } from "react";
import useAppStore from "../stores/appStore";
import { useShallow } from "zustand/shallow";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  children: ReactNode;
  description?: string;
}

export default function PublicLayout(props: Props) {
  const [appName] = useAppStore(useShallow((state) => [state.name]));

  return (
    <div className="container px-5 flex gap-12 items-center justify-center mt-28 mx-auto flex-col md:flex-row mb-14">
      <div className="max-w-64 md:max-w-96 sm:w-96">
        <img src={props.image} className="w-full h-full object-cover" />
      </div>
      <div className="bg-slate-800 rounded-2xl p-6 max-w-96 sm:w-96 w-full">
        <Link to="/" className="block w-fit">
          <h1 className="font-semibold text-xl leading-tight mb-1.5">
            {appName}
          </h1>
        </Link>
        {props.description && <p className="mb-4">{props.description}</p>}
        {props.children}
      </div>
    </div>
  );
}
