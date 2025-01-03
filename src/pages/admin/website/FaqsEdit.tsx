import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import { Image } from "lucide-react";
import Input from "../../../components/Input";
import File from "../../../components/File";
import InputFaq from "../../../components/admin/website/InputFaq";
import useAppStore, { Faq, FaqsSection } from "../../../stores/appStore";
import Textarea from "../../../components/Textarea";
import Form from "../../../components/admin/website/Form";
import FormRow from "../../../components/admin/website/FormRow";

export function FaqsEdit() {
  const path = "website.landing.faqs";
  const readByPath = useAppStore((state) => state.readByPath);
  const faqsData = readByPath<FaqsSection>(path);
  const { support } = faqsData;

  const [subheading, setSubheading] = useState(faqsData.subheading);
  const [image, setImage] = useState(faqsData.image);
  const [supportHeading, setSupportHeading] = useState(support.heading);
  const [supportDescription, setSupportDescription] = useState(
    support.description
  );
  const [supportLink, setSupportLink] = useState(support.link);
  const [faqs, setFaqs] = useState<Faq[]>(faqsData.faqs);

  const data: FaqsSection = {
    subheading,
    image,
    support: {
      heading: supportHeading,
      description: supportDescription,
      link: supportLink,
    },
    faqs,
    visibility: faqsData.visibility,
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "subheading") setSubheading(value);
    if (name === "image") setImage(value);
    else if (name === "supportHeading") setSupportHeading(value);
    else if (name === "supportLink") setSupportLink(value);
    else if (name === "supportDescription") setSupportDescription(value);
  };

  const handleFaqsChange = (faqs: Faq[]) => {
    setFaqs(faqs);
  };

  return (
    <div>
      <PageHeading heading="Edit FAQs" />
      <Form section="FAQs" path={path} data={data}>
        <FormRow>
          <Textarea
            label="Subheading"
            name="subheading"
            value={subheading}
            onChange={handleInputChange}
          />
          <File
            accept="image/*"
            label="Image"
            name="image"
            value={image}
            background="dark"
            placeholder="Choose image"
            icon={Image}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Support heading"
            name="supportHeading"
            value={supportHeading}
            background="dark"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Support link"
            name="supportLink"
            value={supportLink}
            background="dark"
            onChange={handleInputChange}
          />
          <Textarea
            label="Support description"
            name="supportDescription"
            value={supportDescription}
            onChange={handleInputChange}
          />
        </FormRow>
        <FormRow>
          <InputFaq faqs={faqs} onChange={handleFaqsChange} />
        </FormRow>
      </Form>
    </div>
  );
}
