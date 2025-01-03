import { ReactNode } from "react";

interface Props {
  heading: string;
  children?: ReactNode;
}

export default function PageHeading(props: Props) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <h4 className="font-semibold text-lg">{props.heading}</h4>
      {props.children}
    </div>
  );
}
