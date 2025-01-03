import { useEffect } from "react";

export default function useDynamicHead(title?: string, favicon?: string) {
  useEffect(() => {
    if (title) document.title = title;
    if (favicon) {
      const existingFavicon = document.querySelector(
        "link[rel='icon']"
      ) as HTMLLinkElement;
      if (existingFavicon) {
        existingFavicon.href = favicon;
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/png";
        link.href = favicon;
        document.head.appendChild(link);
      }
    }
  }, [title, favicon]);
}
