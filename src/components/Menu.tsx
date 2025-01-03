import {
  Globe,
  Heart,
  Images,
  LayoutDashboard,
  LibraryBig,
  LucideIcon,
  Palette,
  Trophy,
  User,
  Users,
  WalletMinimal,
} from "lucide-react";
import MenuItem from "./MenuItem";

interface Props {
  variant: Variant;
}

type Variant = "user" | "admin";

interface VariantData {
  to: string;
  text: string;
  icon: LucideIcon;
}

const variants: Record<Variant, VariantData[]> = {
  user: [
    { to: "/pages/public", text: "Public pages", icon: LibraryBig },
    { to: "/pages/favorite", text: "Favorite pages", icon: Heart },
    { to: "/pages", text: "My pages", icon: Images },
    { to: "/pages/colored", text: "Colored pages", icon: Palette },
    { to: "/account", text: "Account", icon: User },
  ],
  admin: [
    { to: "/admin", text: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/users", text: "Users", icon: Users },
    { to: "/admin/pages", text: "Pages", icon: Images },
    { to: "/admin/pages/colored", text: "Colored pages", icon: Palette },
    { to: "/admin/subscriptions", text: "Subscriptions", icon: Trophy },
    { to: "/admin/plans", text: "Plans", icon: WalletMinimal },
    { to: "/admin/website", text: "Website", icon: Globe },
    { to: "/admin/account", text: "Account", icon: User },
  ],
};

export default function Menu(props: Props) {
  const items = variants[props.variant];

  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => (
        <MenuItem to={item.to} icon={item.icon} key={item.to}>
          {item.text}
        </MenuItem>
      ))}
    </div>
  );
}
