import { Eye, EyeClosed, SquarePen } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionMeta } from "../../pages/admin/Website";
import { useState } from "react";
import useAppStore from "../../stores/appStore";
import { useShallow } from "zustand/shallow";

interface SectionBase {
  visibility: boolean;
}

interface Props {
  section: SectionMeta;
  onToggleVisibility(): void;
}

export default function WebsiteSection(props: Props) {
  const [readByPath, toggleVisibilityByPath] = useAppStore(
    useShallow((state) => [state.readByPath, state.toggleVisibilityByPath])
  );
  const sectionData = readByPath<SectionBase>(props.section.path);
  const [visibility, setVisibility] = useState(sectionData.visibility);

  const handleVisibilityClick = () => {
    setVisibility(!visibility);
    toggleVisibilityByPath(props.section.path);
    props.onToggleVisibility();
  };

  return (
    <div className="p-5 bg-slate-800 rounded-2xl flex flex-col gap-2">
      <h5 className="font-medium leading-tight">{props.section.title}</h5>
      <div className="flex self-end items-center text-slate-400 gap-3">
        {visibility ? (
          <EyeClosed
            size={20}
            onClick={handleVisibilityClick}
            className="cursor-pointer select-none"
          />
        ) : (
          <Eye
            size={20}
            onClick={handleVisibilityClick}
            className="cursor-pointer select-none"
          />
        )}
        <Link to={props.section.to}>
          <SquarePen size={20} />
        </Link>
      </div>
    </div>
  );
}
