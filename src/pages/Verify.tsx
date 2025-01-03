import PublicLayout from "../components/PublicLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import userApi, { UserVerifyPayload } from "../apis/userApi";
import useAuthStore from "../stores/authStore";
import { useShallow } from "zustand/shallow";
import Input from "../components/Input";
import Button from "../components/Button";
import { LogIn } from "lucide-react";
import useButton from "../hooks/useButton";
import queryUtil from "../utils/queryUtil";

export function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [processing, startProcessing, stopProcessing] = useButton();
  const [updateAuthToken] = useAuthStore(
    useShallow((state) => [state.updateToken])
  );

  const handleFieldChange = (name: string, value: string) => {
    if (name === "otp") setOtp(value);
  };

  const handleAccessClick = async () => {
    if (!token) return;
    startProcessing();
    const payload: UserVerifyPayload = {
      token,
      otp,
    };
    const result = await userApi.verify(payload);
    stopProcessing();
    if (!result) return;
    updateAuthToken(result.authToken);
    if (result.admin) navigate("/admin");
    else navigate(queryUtil.followParams("/pages/public"));
  };

  return (
    <PublicLayout
      image="/assets/images/public.png"
      description="We’ve sent an OTP to your registered email address. Please enter it below to verify your account."
    >
      <div className="grid gap-5">
        <div className="grid gap-4">
          <Input
            type="text"
            label="OTP"
            name="otp"
            value={otp}
            background="light"
            placeholder="Enter 5 digit OTP"
            onChange={handleFieldChange}
          />
          <Button
            type="primary"
            text="Access account"
            icon={LogIn}
            hug={false}
            processing={processing}
            onClick={handleAccessClick}
          />
        </div>
        <p className="mx-auto">
          Didn't receive the verification OTP?&nbsp;
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
