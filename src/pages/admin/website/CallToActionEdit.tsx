import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import Input from "../../../components/Input";
import useAppStore, { CallToActionSection } from "../../../stores/appStore";
import Textarea from "../../../components/Textarea";
import Form from "../../../components/admin/website/Form";
import FormRow from "../../../components/admin/website/FormRow";

export function CallToActionEdit() {
  const path = "website.landing.callToAction";
  const readByPath = useAppStore((state) => state.readByPath);
  const callToAction = readByPath<CallToActionSection>(path);

  const [heading, setHeading] = useState(callToAction.heading);
  const [description, setDescription] = useState(callToAction.description);

  const data: CallToActionSection = {
    heading,
    description,
    visibility: callToAction.visibility,
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "heading") setHeading(value);
    else if (name === "description") setDescription(value);
  };

  return (
    <div>
      <PageHeading heading="Edit call to action" />
      <Form section="call to action" path={path} data={data}>
        <FormRow>
          <Input
            type="text"
            label="Heading"
            name="heading"
            value={heading}
            background="dark"
            onChange={handleInputChange}
          />
          <Textarea
            label="Description"
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </FormRow>
      </Form>
    </div>
  );
}
