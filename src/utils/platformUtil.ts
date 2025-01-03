import { Capacitor } from "@capacitor/core";

const platformUtil = {
  getName() {
    if (window.electron) return "electron";
    return Capacitor.getPlatform();
  },

  is(platform: string) {
    return platform === this.getName();
  },

  isAny(platforms: string[]) {
    const platform = this.getName();
    return platforms.includes(platform);
  },
};

export default platformUtil;
