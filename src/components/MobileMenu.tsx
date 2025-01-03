import { Menu, X } from "lucide-react";

interface Props {
  active: boolean;
  onClick: VoidFunction;
}

export default function MobileMenu(props: Props) {
  const Icon = props.active ? X : Menu;
  return (
    <Icon
      size={30}
      className="md:hidden cursor-pointer select-none"
      onClick={props.onClick}
    />
  );
}
