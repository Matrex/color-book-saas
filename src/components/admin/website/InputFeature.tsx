import Textarea from "../../Textarea";
import InputMulti from "./InputMulti";
import { useState } from "react";
import Input from "../../Input";
import { Link } from "react-router-dom";
import { Feature } from "../../../stores/appStore";
import FeatureCard from "./FeatureCard";
import FormRow from "./FormRow";

export interface Formdata {
  icon: string;
  title: string;
  description: string;
}

interface Props {
  features: Feature[];
  onChange(features: Feature[]): void;
}

export default function InputFeature(props: Props) {
  const initialFormdata: Formdata = {
    icon: "",
    title: "",
    description: "",
  };

  const [icon, setIcon] = useState(initialFormdata.icon);
  const [title, setTitle] = useState(initialFormdata.title);
  const [description, setDescription] = useState(initialFormdata.description);

  const formdata: Formdata = { icon, title, description };

  const handleInputChange = (name: string, value: string) => {
    if (name === "icon") setIcon(value);
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
  };

  const handleFormdataChange = (formdata: Formdata) => {
    setIcon(formdata.icon);
    setTitle(formdata.title);
    setDescription(formdata.description);
  };

  return (
    <InputMulti<Formdata>
      module={{ singular: "feature", plural: "features" }}
      items={props.features}
      card={FeatureCard}
      initialFormdata={initialFormdata}
      formdata={formdata}
      form={
        <FormRow>
          <Input
            type="text"
            label="Icon name"
            name="icon"
            value={formdata.icon}
            background="dark"
            placeholder="checkbox-line"
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
            label="Title"
            name="title"
            value={formdata.title}
            background="dark"
            onChange={handleInputChange}
          />
          <Textarea
            label="Description"
            value={formdata.description}
            name="description"
            onChange={handleInputChange}
          />
        </FormRow>
      }
      onItemsChange={props.onChange}
      onFormdataChange={handleFormdataChange}
    />
  );
}
