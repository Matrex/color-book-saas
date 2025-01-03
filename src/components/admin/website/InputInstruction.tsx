import Textarea from "../../Textarea";
import InstructionCard from "./InstructionCard";
import InputMulti from "./InputMulti";
import { useState } from "react";
import { Instruction } from "../../../stores/appStore";
import FormRow from "./FormRow";

export interface Formdata {
  content: string;
}

interface Props {
  instructions: Instruction[];
  onChange(instructions: Instruction[]): void;
}

export default function InputInstruction(props: Props) {
  const initialFormdata: Formdata = {
    content: "",
  };

  const [content, setContent] = useState(initialFormdata.content);

  const formdata: Formdata = { content };

  const handleInputChange = (name: string, value: string) => {
    if (name === "content") setContent(value);
  };

  const handleFormdataChange = (formdata: Formdata) => {
    setContent(formdata.content);
  };

  return (
    <InputMulti<Formdata>
      module={{ singular: "instruction", plural: "instructions" }}
      items={props.instructions}
      card={InstructionCard}
      initialFormdata={initialFormdata}
      formdata={formdata}
      form={
        <FormRow>
          <Textarea
            label="Content"
            value={content}
            name="content"
            onChange={handleInputChange}
          />
        </FormRow>
      }
      onItemsChange={props.onChange}
      onFormdataChange={handleFormdataChange}
    />
  );
}
