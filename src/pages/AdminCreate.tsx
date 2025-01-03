import { useNavigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { LogIn } from "lucide-react";
import useButton from "../hooks/useButton";
import userApi, { UserCreateAdminPayload } from "../apis/userApi";
import { useShallow } from "zustand/shallow";
import useAppStore from "../stores/appStore";

export function AdminCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, startProcessing, stopProcessing] = useButton();
  const [appName] = useAppStore(useShallow((state) => [state.name]));

  const handleFieldChange = (name: string, value: string) => {
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
  };

  const handleCreateClick = async () => {
    startProcessing();
    const payload: UserCreateAdminPayload = {
      name,
      email,
    };
    const result = await userApi.createAdmin(payload);
    stopProcessing();
    if (!result) return;
    navigate(`/verify/${result.token}`);
  };

  return (
    <PublicLayout
      image="/assets/images/public.png"
      description={`Create ${appName} admin account`}
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
            onChange={handleFieldChange}
          />
          <Input
            type="text"
            label="Email"
            name="email"
            value={email}
            background="light"
            placeholder="Email address"
            onChange={handleFieldChange}
          />
          <Button
            type="primary"
            text="Create admin"
            icon={LogIn}
            hug={false}
            processing={processing}
            onClick={handleCreateClick}
          />
        </div>
      </div>
    </PublicLayout>
  );
}
