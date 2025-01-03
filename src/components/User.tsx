import { useShallow } from "zustand/shallow";
import useAuthStore from "../stores/authStore";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const [user, removeAuthToken] = useAuthStore(
    useShallow((state) => [state.user, state.removeToken])
  );

  const handleSignOutClick = () => {
    removeAuthToken();
    navigate("/sign-in");
  };

  return (
    user && (
      <div className="flex gap-3 items-center">
        <UserAvatar size="regular" photo={user.photo || ""} name={user.name} />
        <div className="grid gap-0.5">
          <div className="leading-tight">{user.name}</div>
          <div
            className="leading-tight text-sm text-slate-400 cursor-pointer"
            onClick={handleSignOutClick}
          >
            Sign out
          </div>
        </div>
      </div>
    )
  );
}
