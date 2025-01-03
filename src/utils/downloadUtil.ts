import download from "downloadjs";
import { Filesystem, Directory } from "@capacitor/filesystem";
import platformUtil from "./platformUtil";
import { alertStore } from "../stores/alertStore";
import imageUtil from "./imageUtil";

const downloadUtil = {
  async pngUrl(url: string, filename: string) {
    const dataUri = await imageUtil.urlToDataUri(url);
    if (platformUtil.isAny(["ios", "android"])) {
      const permission = await Filesystem.requestPermissions();
      if (permission.publicStorage === "granted") {
        await Filesystem.writeFile({
          path: filename,
          data: dataUri,
          directory: Directory.Documents,
        });
        const location = platformUtil.is("ios") ? "files" : "documents";
        alertStore().replace("info", `Saved to ${location}`);
      }
    } else {
      download(dataUri, filename, "image/png");
    }
  },
};

export default downloadUtil;
