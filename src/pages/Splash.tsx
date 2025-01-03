import { useShallow } from "zustand/shallow";
import useAppStore from "../stores/appStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

export function Splash() {
  const navigate = useNavigate();

  const [appName, tagline] = useAppStore(
    useShallow((state) => [state.name, state.tagline])
  );

  const [authToken, authUser] = useAuthStore(
    useShallow((state) => [state.token, state.user])
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!authToken) navigate("/sign-in");
      else if (authUser && authUser.admin) navigate("/admin");
      else if (authUser && !authUser.admin) navigate("/pages/public");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="max-w-56 mb-8">
        <img
          src="/assets/images/landing-home.png"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-2xl font-semibold">{appName}</h1>
      <p>{tagline}</p>
    </div>
  );
}
