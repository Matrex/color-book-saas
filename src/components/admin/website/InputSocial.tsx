import InputMulti from "./InputMulti";
import SocialCard from "./SocialCard";
import Input from "../../Input";
import { Link } from "react-router-dom";
import { Social } from "../../../stores/appStore";
import { useState } from "react";
import FormRow from "./FormRow";

export interface Formdata {
  icon: string;
  url: string;
}

interface Props {
  socials: Social[];
  onChange(socials: Social[]): void;
}

export default function InputSocial(props: Props) {
  const initialFormdata: Formdata = {
    icon: "",
    url: "",
  };

  const [icon, setIcon] = useState(initialFormdata.icon);
  const [url, setUrl] = useState(initialFormdata.url);

  const formdata: Formdata = { icon, url };

  const handleInputChange = (name: string, value: string) => {
    if (name === "icon") setIcon(value);
    if (name === "url") setUrl(value);
  };

  const handleFormdataChange = (formdata: Formdata) => {
    setIcon(formdata.icon);
    setUrl(formdata.url);
  };

  return (
    <InputMulti<Formdata>
      module={{ singular: "social", plural: "socials" }}
      items={props.socials}
      card={SocialCard}
      initialFormdata={initialFormdata}
      formdata={formdata}
      form={
        <FormRow>
          <Input
            type="text"
            label="Icon name"
            name="icon"
            value={formdata.icon}
            placeholder="facebook-line"
            background="dark"
            helper={
              <span>
                You can find the icon and its names from{" "}
                <Link
                  className="text-yellow-400"
                  to="https://remixicon.com/"
                  target="_blank"
                >
                  Remix Icon
                </Link>
                .
              </span>
            }
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Link"
            name="url"
            value={formdata.url}
            background="dark"
            onChange={handleInputChange}
          />
        </FormRow>
      }
      onItemsChange={props.onChange}
      onFormdataChange={handleFormdataChange}
    />
  );
}
