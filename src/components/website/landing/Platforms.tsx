import { useShallow } from "zustand/shallow";
import useAppStore from "../../../stores/appStore";
import Platform, { PlatformSize } from "./Platform";
import {
  RiAppleLine,
  RiFinderLine,
  RiGlobalLine,
  RiGooglePlayLine,
  RiUbuntuLine,
  RiWindowsLine,
} from "@remixicon/react";

type PlatformsType = "available" | "downloadable";

interface Props {
  type: PlatformsType;
}

const typeSizes: Record<PlatformsType, PlatformSize> = {
  available: "medium",
  downloadable: "regular",
};

export default function Platforms(props: Props) {
  const [website] = useAppStore(useShallow((state) => [state.website]));
  const platforms = website ? website.landing.home.platforms : null;
  const size = typeSizes[props.type];

  return (
    platforms && (
      <div className="flex items-center gap-2 flex-wrap">
        {props.type === "available" && (
          <Platform
            size={size}
            icon={RiGlobalLine}
            title="Web"
            to={platforms.web}
          />
        )}
        <Platform
          size={size}
          icon={RiGooglePlayLine}
          title="Android"
          to={platforms.android}
        />
        <Platform
          size={size}
          icon={RiAppleLine}
          title="iOS"
          to={platforms.ios}
        />
        <Platform
          size={size}
          icon={RiWindowsLine}
          title="Windows"
          to={platforms.windows}
        />
        <Platform
          size={size}
          icon={RiFinderLine}
          title="Mac"
          to={platforms.mac}
        />
        <Platform
          size={size}
          icon={RiUbuntuLine}
          title="Debian"
          to={platforms.debian}
        />
      </div>
    )
  );
}
