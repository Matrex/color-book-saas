import { Outlet, ScrollRestoration } from "react-router-dom";
import Alert from "./Alert";
import settingApi from "../apis/settingApi";
import useAppStore, { appStore } from "../stores/appStore";
import useDynamicHead from "../hooks/useDynamicHead";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import statusbarUtil from "../utils/statusbarUtil";

export async function appLoader() {
  const settings = await settingApi.list();
  if (!settings) return null;
  settings.forEach((setting) => {
    switch (setting.name) {
      case "app_name":
        appStore().updateName(setting.value);
        break;
      case "tagline":
        appStore().updateTagline(setting.value);
        break;
      case "favicon":
        appStore().updateFavicon(setting.value);
        break;
      case "website":
        appStore().replaceWebsite(JSON.parse(setting.value));
        break;
      default:
        break;
    }
  });
  return null;
}

function App() {
  const [name, tagline, favicon] = useAppStore(
    useShallow((state) => [state.name, state.tagline, state.favicon])
  );
  const title = name ? `${name} - ${tagline}` : "";

  useDynamicHead(title, favicon);

  useEffect(() => {
    statusbarUtil.hide();
  }, []);

  return (
    <>
      <Outlet />
      <Alert />
      <ScrollRestoration />
    </>
  );
}

export default App;
