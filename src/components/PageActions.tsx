import { Brush, Clock4, Heart } from "lucide-react";
import PageActionItem from "./PageActionItem";
import dateUtil from "../utils/dateUtil";

interface Props {
  id: number;
  coloredCount: number;
  favoritedCount: number;
  isColored?: boolean;
  isFavorited?: boolean;
  date: string;
  onFavorite?: (id: number) => void;
}

export default function PageActions(props: Props) {
  const date = dateUtil.fromIso(props.date).toRelative();
  return (
    <div className="flex items-center justify-between">
      <PageActionItem
        id={props.id}
        icon={Brush}
        value={props.coloredCount}
        active={Boolean(props.isColored)}
      />
      <PageActionItem
        id={props.id}
        icon={Heart}
        value={props.favoritedCount}
        active={Boolean(props.isFavorited)}
        onClick={props.onFavorite}
      />
      <PageActionItem id={props.id} icon={Clock4} value={date} active={false} />
    </div>
  );
}
