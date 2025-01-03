import {
  Link,
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import User from "./User";
import Button from "./Button";
import { CirclePlus } from "lucide-react";
import Menu from "./Menu";
import useColorStore from "../stores/colorStore";
import userApi, { UserData } from "../apis/userApi";
import { authStore } from "../stores/authStore";
import useAppStore from "../stores/appStore";
import { useShallow } from "zustand/shallow";
import { CSSProperties, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import platformUtil from "../utils/platformUtil";

interface LoaderProps {
  user: UserData;
}

export async function layoutLoader({ request }: LoaderFunctionArgs) {
  const user = await userApi.read();
  if (!user) return redirect("/sign-in");
  const url = new URL(request.url);
  const path = url.pathname;
  const isUnauthorizedAdmin = user.admin && !path.startsWith("/admin");
  const isUnauthorizedUser = !user.admin && path.startsWith("/admin");
  if (isUnauthorizedAdmin) return redirect("/admin");
  if (isUnauthorizedUser) return redirect("/pages/public");
  authStore().replaceUser(user);
  return { user };
}

export function Layout() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const colorFullscreen = useColorStore((state) => state.scale);
  const [appName] = useAppStore(useShallow((state) => [state.name]));
  const { user } = useLoaderData() as LoaderProps;
  const location = useLocation();

  const handleMobileMenuClick = () => {
    setMobileMenu(!mobileMenu);
  };

  const style: CSSProperties = {
    paddingTop: platformUtil.is("ios") ? "16px" : "0",
  };

  useEffect(() => {
    setMobileMenu(false);
  }, [location]);

  return (
    <div className="flex flex-col h-screen" style={style}>
      {!colorFullscreen && (
        <header className="border-b border-slate-700">
          <div className="container px-5 flex justify-between items-center py-3 mx-auto h-16">
            <div className="flex items-center gap-2">
              <Link to={user.admin ? "/admin" : "/pages/public"}>
                <h5 className="font-semibold text-lg">{appName}</h5>
              </Link>
              {user.admin && (
                <div className="text-slate-900 bg-yellow-400 text-sm leading-tight px-3 py-0.5 rounded-lg">
                  admin
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <User />
            </div>
            <MobileMenu active={mobileMenu} onClick={handleMobileMenuClick} />
          </div>
        </header>
      )}
      <div className="flex flex-col md:flex-row flex-grow container px-5 mx-auto md:h-[calc(100vh-65px)]">
        {!colorFullscreen && (
          <div
            className={`${
              mobileMenu ? "flex" : "hidden"
            } md:flex md:w-72 border-b md:border-b-0 md:border-r border-slate-700 py-7 pr-8 flex-col gap-7 overflow-y-auto scroll`}
          >
            <div className="block md:hidden">
              <User />
            </div>
            {!user.admin && (
              <Button
                type="primary"
                text="Create page"
                icon={CirclePlus}
                to="/pages/create"
                hug={false}
                processing={false}
              />
            )}
            <Menu variant={user.admin ? "admin" : "user"} />
          </div>
        )}
        <div className="container mx-auto md:px-7 py-7 overflow-y-auto scroll flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
