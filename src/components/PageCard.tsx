import { Pause, Play, Trash } from "lucide-react";
import { PaginateResult } from "../apis/pageApi";
import useAuthStore from "../stores/authStore";
import PageCardBase from "./PageCardBase";
import { MouseEvent } from "react";

interface Props {
  page: PaginateResult;
  date: string;
  onDelete(id: number): void;
  onToggleFavorite?(id: number): void;
}

export default function PageCard(props: Props) {
  const { page } = props;
  const user = useAuthStore((state) => {
    if (!state.user) throw new Error("user not found");
    return state.user;
  });
  const RestrictionIcon = page.blocked ? Play : Pause;
  const photo = page.colored ? page.colored.preview : page.illustration;

  const handleDeleteClick = (event: MouseEvent<HTMLOrSVGElement>) => {
    event.preventDefault();
    props.onDelete(page.id);
  };

  return (
    <PageCardBase
      page={page}
      photo={photo}
      user={page.user}
      date={props.date}
      isColored={page.is_colored}
      isFavorited={page.is_favorited}
      actions={
        <>
          {user.admin && (
            <RestrictionIcon
              size={20}
              className="text-slate-400 cursor-pointer"
              onClick={handleDeleteClick}
            />
          )}
          {!user.admin && page.is_owner && (
            <Trash
              size={20}
              className="text-slate-400 cursor-pointer"
              onClick={handleDeleteClick}
            />
          )}
        </>
      }
      onFavorite={props.onToggleFavorite}
    />
  );
}
