import { Image, User } from "lucide-react";
import File from "../../components/File";
import Input from "../../components/Input";
import PageHeading from "../../components/PageHeading";
import Button from "../../components/Button";
import { useState } from "react";
import useButton from "../../hooks/useButton";
import useAlertStore from "../../stores/alertStore";
import userApi, { UserCreatePayload } from "../../apis/userApi";
import { useNavigate } from "react-router-dom";
import ButtonCancel from "../../components/admin/ButtonCancel";

export function UserCreate() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [creating, startCreating, stopCreating] = useButton();
  const replaceAlert = useAlertStore((state) => state.replace);
  const navigate = useNavigate();

  const handleFieldChange = (name: string, value: string) => {
    if (name === "name") setName(value);
    else if (name === "photo") setPhoto(value);
    else if (name === "email") setEmail(value);
  };

  const handleCreateClick = async () => {
    const payload: UserCreatePayload = {
      name,
      email,
    };
    if (photo) payload.photo = photo;
    startCreating();
    const result = await userApi.create(payload);
    stopCreating();
    if (result && result.created) {
      replaceAlert("success", "User has been added", true);
      navigate("/admin/users");
    }
  };

  return (
    <div>
      <PageHeading heading="Add user" />
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-10 lg:col-span-5 xl:col-span-4 grid gap-4">
          <Input
            type="text"
            label="Name"
            name="name"
            value={name}
            background="dark"
            onChange={handleFieldChange}
          />
          <File
            accept="image/*"
            label="Photo"
            name="photo"
            value={photo}
            background="dark"
            placeholder="Choose photo"
            icon={Image}
            onChange={handleFieldChange}
          />
          <Input
            type="text"
            label="Email"
            name="email"
            value={email}
            background="dark"
            onChange={handleFieldChange}
          />
          <div className="flex flex-col gap-y-3">
            <Button
              type="primary"
              text="Add user"
              icon={User}
              hug={false}
              processing={creating}
              onClick={handleCreateClick}
            />
            <ButtonCancel hug={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
