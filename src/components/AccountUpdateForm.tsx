import { useState } from "react";
import useButton from "../hooks/useButton";
import PageHeading from "./PageHeading";
import Input from "./Input";
import Button from "./Button";
import { Image, User } from "lucide-react";
import File from "./File";
import userApi, { UserUpdatePayload } from "../apis/userApi";
import useAuthStore from "../stores/authStore";
import { useShallow } from "zustand/shallow";
import useAlertStore from "../stores/alertStore";

interface Props {
  heading: string;
}

export default function AccountUpdateForm(props: Props) {
  const [user, updateUser] = useAuthStore(
    useShallow((state) => [state.user, state.updateUser])
  );

  const [name, setName] = useState(user ? user.name : "");
  const [photo, setPhoto] = useState(user && user.photo ? user.photo : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [updating, startUpdating, stopUpdating] = useButton();
  const [replaceAlert] = useAlertStore(useShallow((state) => [state.replace]));

  const handleFieldChange = (name: string, value: string) => {
    if (name === "name") setName(value);
    else if (name === "photo") setPhoto(value);
    else if (name === "email") setEmail(value);
  };

  const handleUpdateClick = async () => {
    const payload: UserUpdatePayload = {
      name,
      photo,
      email,
    };
    startUpdating();
    const result = await userApi.update(payload);
    stopUpdating();
    if (result && result.updated) {
      replaceAlert("success", "Account details have been updated");
      updateUser(name, photo, email);
    }
  };

  return (
    <div>
      <PageHeading heading={props.heading} />
      <div className="grid gap-4">
        <Input
          type="text"
          label="Name"
          name="name"
          value={name}
          background="dark"
          placeholder="Your full name"
          onChange={handleFieldChange}
        />
        <File
          accept="image/*"
          label="Photo"
          name="photo"
          value={photo}
          background="dark"
          placeholder="Choose your photo"
          icon={Image}
          onChange={handleFieldChange}
        />
        <Input
          type="text"
          label="Email"
          name="email"
          value={email}
          background="dark"
          placeholder="Email address"
          onChange={handleFieldChange}
        />
        <Button
          type="primary"
          text="Update account"
          icon={User}
          hug={false}
          processing={updating}
          onClick={handleUpdateClick}
        />
      </div>
    </div>
  );
}
