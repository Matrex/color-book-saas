import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";

interface Props {
  to: string;
  icon: LucideIcon;
  children: ReactNode;
}

export default function MenuItem(props: Props) {
  const isRouteMatch = useMatch(props.to);
  const routeMatchClass = isRouteMatch ? "text-yellow-400" : "";

  return (
    <div className={`${routeMatchClass} flex gap-3 items-center`}>
      <props.icon size={24} />
      <Link to={props.to}>{props.children}</Link>
    </div>
  );
}
