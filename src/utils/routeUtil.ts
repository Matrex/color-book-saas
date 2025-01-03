import platformUtil from "./platformUtil";

const routeUtil = {
  toExternal(url: string) {
    if (platformUtil.is("electron")) {
      window.electron.send("route:external", url);
    } else {
      window.location.href = url;
    }
  },
};

export default routeUtil;
