import { LogIn } from "lucide-react";
import Button from "../Button";
import { Link } from "react-router-dom";
import useAppStore from "../../stores/appStore";
import { useShallow } from "zustand/shallow";

interface MenuItem {
  title: string;
  to: string;
  visibility: boolean;
}

export default function Header() {
  const [appName, website] = useAppStore(
    useShallow((state) => [state.name, state.website])
  );

  const menu: MenuItem[] = [
    {
      title: "Home",
      to: "/#home",
      visibility: website ? website.landing.home.visibility : false,
    },
    {
      title: "How it works",
      to: "/#how-it-works",
      visibility: website ? website.landing.howItWorks.visibility : false,
    },
    {
      title: "Pricing",
      to: "/#pricing",
      visibility: website ? website.landing.pricing.visibility : false,
    },
    {
      title: "FAQs",
      to: "/#faqs",
      visibility: website ? website.landing.faqs.visibility : false,
    },
    {
      title: "Contact",
      to: "/#contact",
      visibility: website ? website.landing.contact.visibility : false,
    },
  ];

  return (
    <header className="flex justify-between items-center gap-4 pt-5" id="home">
      <Link to="/">
        <h5 className="font-semibold text-xl text-slate-100">{appName}</h5>
      </Link>
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-6">
          {menu.map(
            (menuItem) =>
              menuItem.visibility && (
                <Link
                  to={menuItem.to}
                  className="text-slate-100 text-lg"
                  key={menuItem.to}
                >
                  {menuItem.title}
                </Link>
              )
          )}
        </div>
        <Button
          type="primary"
          text="Sign in"
          icon={LogIn}
          to="/sign-in"
          hug={true}
          processing={false}
        />
      </div>
    </header>
  );
}
