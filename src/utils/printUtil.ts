import printJS from "print-js";
import platformUtil from "./platformUtil";
import { Browser } from "@capacitor/browser";

const printUtil = {
  async image(url: string) {
    if (platformUtil.isAny(["ios", "android"])) {
      await Browser.open({ url });
    } else {
      printJS({
        printable: url,
        type: "image",
      });
    }
  },
};

export default printUtil;
