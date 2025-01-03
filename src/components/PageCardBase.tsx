import { Flame, User } from "lucide-react";
import { UserData } from "../apis/userApi";
import PageActions from "./PageActions";
import { PageData } from "../apis/pageApi";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";

interface Props {
  page: PageData;
  photo: string;
  user: UserData;
  date: string;
  isColored?: boolean;
  isFavorited?: boolean;
  actions?: ReactNode;
  onFavorite?(id: number): void;
}

export default function PageCardBase(props: Props) {
  const authUser = useAuthStore((state) => {
    if (!state.user) throw new Error("user not found");
    return state.user;
  });

  const content = (
    <div className="bg-slate-800 rounded-2xl overflow-hidden relative">
      <div className="w-full aspect-square bg-slate-200 rounded-2xl overflow-hidden">
        <img className="object-cover" src={props.photo} />
      </div>
      <div className="px-4 py-5">
        <div className="flex gap-2 mb-5">
          <User size={22} className="text-slate-400" />
          <div>
            <div className="text-slate-200">{props.user.name}</div>
            <div className="text-slate-400">{props.user.stripe_id}</div>
          </div>
        </div>
        <div>
          <PageActions
            id={props.page.id}
            coloredCount={props.page.colored_count}
            favoritedCount={props.page.favorited_count}
            isColored={props.isColored}
            isFavorited={props.isFavorited}
            date={props.date}
            onFavorite={props.onFavorite}
          />
        </div>
        <div className="flex items-center justify-end mt-4 gap-1.5">
          {props.actions}
        </div>
      </div>
      {props.page.trending && (
        <div className="absolute top-2 right-2 p-1.5 rounded-md bg-yellow-400 flex items-center justify-center">
          <Flame size={20} className="text-slate-800" />
        </div>
      )}
    </div>
  );

  return authUser.admin ? (
    content
  ) : (
    <Link to={`/pages/${props.page.id}/color`}>{content}</Link>
  );
}
