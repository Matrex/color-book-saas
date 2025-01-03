import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { LogIn } from "lucide-react";
import useButton from "../hooks/useButton";
import { useShallow } from "zustand/shallow";
import userApi, { UserSignInPayload } from "../apis/userApi";
import useAppStore from "../stores/appStore";
import useAuthStore from "../stores/authStore";
import queryUtil from "../utils/queryUtil";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [processing, startProcessing, stopProcessing] = useButton();
  const [appName] = useAppStore(useShallow((state) => [state.name]));
  const [authToken, authUser] = useAuthStore(
    useShallow((state) => [state.token, state.user])
  );

  const handleChange = (name: string, value: string) => {
    if (name === "email") setEmail(value);
  };

  const handleSignInClick = async () => {
    startProcessing();
    const payload: UserSignInPayload = {
      email,
    };
    const result = await userApi.signIn(payload);
    stopProcessing();
    if (!result) return;
    navigate(queryUtil.followParams(`/verify/${result.token}`));
  };

  useEffect(() => {
    if (!authToken) return;
    else if (authUser && authUser.admin) navigate("/admin");
    else if (authUser && !authUser.admin)
      navigate(queryUtil.followParams("/pages/public"));
  }, []);

  return (
    <PublicLayout
      image="/assets/images/public.png"
      description={`Sign in to ${appName} account`}
    >
      <div className="grid gap-5">
        <div className="grid gap-4">
          <Input
            type="text"
            label="Email"
            name="email"
            value={email}
            background="light"
            placeholder="Your email address"
            onChange={handleChange}
          />
          <Button
            type="primary"
            text="Sign in"
            icon={LogIn}
            hug={false}
            processing={processing}
            onClick={handleSignInClick}
          />
        </div>
        <p className="mx-auto">
          Don’t have an account?&nbsp;
          <Link
            to={queryUtil.followParams("/sign-up")}
            className="font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}
