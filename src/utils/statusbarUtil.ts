import { StatusBar } from "@capacitor/status-bar";
import platformUtil from "./platformUtil";

const statusbarUtil = {
  hide() {
    const isCompatible = platformUtil.isAny(["ios", "android"]);
    if (!isCompatible) return;
    StatusBar.hide();
  },
};

export default statusbarUtil;
