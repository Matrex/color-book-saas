import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { LogIn } from "lucide-react";
import useButton from "../hooks/useButton";
import userApi, { UserSignUpPayload } from "../apis/userApi";
import { useShallow } from "zustand/shallow";
import useAppStore from "../stores/appStore";
import queryUtil from "../utils/queryUtil";

export function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, startProcessing, stopProcessing] = useButton();
  const [appName] = useAppStore(useShallow((state) => [state.name]));

  const handleChange = (name: string, value: string) => {
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
  };

  const handleSignUpClick = async () => {
    startProcessing();
    const payload: UserSignUpPayload = {
      name,
      email,
    };
    const result = await userApi.signUp(payload);
    stopProcessing();
    if (!result) return;
    navigate(queryUtil.followParams(`/verify/${result.token}`));
  };

  return (
    <PublicLayout
      image="/assets/images/public.png"
      description={`Create a ${appName} account`}
    >
      <div className="grid gap-5">
        <div className="grid gap-4">
          <Input
            type="text"
            label="Name"
            name="name"
            value={name}
            background="light"
            placeholder="Your full name"
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Email"
            name="email"
            value={email}
            background="light"
            placeholder="Email address"
            onChange={handleChange}
          />
          <Button
            type="primary"
            text="Sign up"
            icon={LogIn}
            hug={false}
            processing={processing}
            onClick={handleSignUpClick}
          />
        </div>
        <p className="mx-auto">
          Already have an account?&nbsp;
          <Link
            to={queryUtil.followParams("/sign-in")}
            className="font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}
