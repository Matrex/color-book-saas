import { Image, User } from "lucide-react";
import Button from "../../components/Button";
import PageHeading from "../../components/PageHeading";
import useButton from "../../hooks/useButton";
import Input from "../../components/Input";
import { useState } from "react";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import useAlertStore from "../../stores/alertStore";
import ButtonCancel from "../../components/admin/ButtonCancel";
import userApi, { UserData, UserUpdateByIdPayload } from "../../apis/userApi";
import File from "../../components/File";

interface LoaderProps {
  user: UserData;
}

export async function userEditLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) return redirect("/admin/users");
  const user = await userApi.readById(Number(id));
  if (!user) return redirect("/admin/users");
  return { user };
}

export function UserEdit() {
  const { user } = useLoaderData() as LoaderProps;
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.photo);
  const [email, setEmail] = useState(user.email);
  const [updating, startUpdating, stopUpdating] = useButton();
  const replaceAlert = useAlertStore((state) => state.replace);

  const handleFieldChange = (name: string, value: string) => {
    if (name === "name") setName(value);
    else if (name === "photo") setPhoto(value);
    else if (name === "email") setEmail(value);
  };

  const handleUpdateClick = async () => {
    const payload: UserUpdateByIdPayload = {
      name,
      email,
      photo: photo || "",
    };
    startUpdating();
    const result = await userApi.updateById(user.id, payload);
    stopUpdating();
    if (result && result.updated)
      replaceAlert("success", "User has been updated");
  };

  return (
    <div>
      <PageHeading heading="Edit user" />
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
            value={photo || ""}
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
              text="Update user"
              icon={User}
              hug={false}
              processing={updating}
              onClick={handleUpdateClick}
            />
            <ButtonCancel hug={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
