import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import useAppStore, { PricingSection } from "../../../stores/appStore";
import Textarea from "../../../components/Textarea";
import Form from "../../../components/admin/website/Form";
import FormRow from "../../../components/admin/website/FormRow";

export function PricingEdit() {
  const path = "website.landing.pricing";
  const readByPath = useAppStore((state) => state.readByPath);
  const pricing = readByPath<PricingSection>(path);

  const [subheading, setSubheading] = useState(pricing.subheading);

  const data: PricingSection = {
    subheading,
    visibility: pricing.visibility,
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "subheading") setSubheading(value);
  };

  return (
    <div>
      <PageHeading heading="Edit pricing" />
      <Form section="pricing" path={path} data={data}>
        <FormRow>
          <Textarea
            label="Subheading"
            name="subheading"
            value={subheading}
            onChange={handleInputChange}
          />
        </FormRow>
      </Form>
    </div>
  );
}
