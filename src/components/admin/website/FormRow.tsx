import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function FormRow(props: Props) {
  return (
    <div className="grid lg:grid-cols-2 gap-x-5 gap-y-4">{props.children}</div>
  );
}
