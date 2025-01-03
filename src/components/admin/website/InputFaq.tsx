import Textarea from "../../Textarea";
import InputMulti from "./InputMulti";
import FaqCard from "./FaqCard";
import Input from "../../Input";
import { Faq } from "../../../stores/appStore";
import { useState } from "react";
import FormRow from "./FormRow";

export interface Formdata {
  question: string;
  answer: string;
}

interface Props {
  faqs: Faq[];
  onChange(faqs: Faq[]): void;
}

export default function InputFaq(props: Props) {
  const initialFormdata: Formdata = {
    question: "",
    answer: "",
  };

  const [question, setQuestion] = useState(initialFormdata.question);
  const [answer, setAnswer] = useState(initialFormdata.answer);

  const formdata: Formdata = { question, answer };

  const handleInputChange = (name: string, value: string) => {
    if (name === "question") setQuestion(value);
    if (name === "answer") setAnswer(value);
  };

  const handleFormdataChange = (formdata: Formdata) => {
    setQuestion(formdata.question);
    setAnswer(formdata.answer);
  };

  return (
    <InputMulti<Formdata>
      module={{ singular: "FAQ", plural: "FAQs" }}
      items={props.faqs}
      card={FaqCard}
      initialFormdata={initialFormdata}
      formdata={formdata}
      form={
        <FormRow>
          <Input
            type="text"
            label="Question"
            name="question"
            value={formdata.question}
            background="dark"
            onChange={handleInputChange}
          />
          <Textarea
            label="Answer"
            value={formdata.answer}
            name="answer"
            onChange={handleInputChange}
          />
        </FormRow>
      }
      onItemsChange={props.onChange}
      onFormdataChange={handleFormdataChange}
    />
  );
}
