import UserAvatar from "../UserAvatar";
import { Clock, IdCard, Mail, Pause, Play, WalletMinimal } from "lucide-react";
import IconDetail from "./IconDetail";
import dateUtil from "../../utils/dateUtil";
import { PaginateResult } from "../../apis/userApi";
import { RiEditLine } from "@remixicon/react";
import { Link } from "react-router-dom";

interface Props {
  user: PaginateResult;
  onBlock(id: number): void;
}

export default function UserCard(props: Props) {
  const { user } = props;
  const createdAt = dateUtil.fromIso(user.created_at).toRelative();
  const RestrictionIcon = user.blocked ? Play : Pause;

  const handleToggleBlockClick = () => {
    props.onBlock(user.id);
  };

  return (
    <div className="bg-slate-800 p-5 rounded-2xl flex flex-col gap-4">
      {user.photo && (
        <UserAvatar size="medium" photo={user.photo} name={user.name} />
      )}
      <div>
        <h4 className="font-medium mb-2 leading-tight">{user.name}</h4>
        <div className="grid gap-1">
          <IconDetail icon={Mail}>{user.email}</IconDetail>
          <IconDetail icon={IdCard}>{user.stripe_id}</IconDetail>
          <IconDetail icon={WalletMinimal}>{user.plan.title}</IconDetail>
          <IconDetail icon={Clock}>{createdAt}</IconDetail>
        </div>
      </div>
      <div className="flex justify-end items-center gap-2.5">
        <Link to={`/admin/users/${user.id}/edit`}>
          <RiEditLine size={20} className="text-slate-400" />
        </Link>
        <RestrictionIcon
          size={20}
          className="text-slate-400 cursor-pointer select-none"
          onClick={handleToggleBlockClick}
        />
      </div>
    </div>
  );
}
