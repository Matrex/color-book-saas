import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import InputInstruction from "../../../components/admin/website/InputInstruction";
import useAppStore, {
  HowItWorksSection,
  Instruction,
} from "../../../stores/appStore";
import Textarea from "../../../components/Textarea";
import Form from "../../../components/admin/website/Form";
import FormRow from "../../../components/admin/website/FormRow";

export function HowItWorksEdit() {
  const path = "website.landing.howItWorks";
  const readByPath = useAppStore((state) => state.readByPath);
  const howItWorks = readByPath<HowItWorksSection>(path);

  const [subheading, setSubheading] = useState(howItWorks.subheading);
  const [instructions, setInstructions] = useState<Instruction[]>(
    howItWorks.instructions
  );

  const data: HowItWorksSection = {
    subheading,
    instructions,
    visibility: howItWorks.visibility,
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "subheading") setSubheading(value);
  };

  const handleInstructionsChange = (instructions: Instruction[]) => {
    setInstructions(instructions);
  };

  return (
    <div>
      <PageHeading heading="Edit how it works" />
      <Form section="how it works" path={path} data={data}>
        <FormRow>
          <Textarea
            label="Subheading"
            name="subheading"
            value={subheading}
            onChange={handleInputChange}
          />
        </FormRow>
        <FormRow>
          <InputInstruction
            instructions={instructions}
            onChange={handleInstructionsChange}
          />
        </FormRow>
      </Form>
    </div>
  );
}
