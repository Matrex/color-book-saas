import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import Input from "../../../components/Input";
import { Image } from "lucide-react";
import useAppStore, { ContactSection } from "../../../stores/appStore";
import File from "../../../components/File";
import Textarea from "../../../components/Textarea";
import Form from "../../../components/admin/website/Form";
import FormRow from "../../../components/admin/website/FormRow";

export function ContactEdit() {
  const path = "website.landing.contact";
  const readByPath = useAppStore((state) => state.readByPath);
  const contact = readByPath<ContactSection>(path);

  const [subheading, setSubheading] = useState(contact.subheading);
  const [image, setImage] = useState(contact.image);
  const [location, setLocation] = useState(contact.location);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);

  const data: ContactSection = {
    subheading,
    image,
    location,
    phone,
    email,
    visibility: contact.visibility,
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "subheading") setSubheading(value);
    else if (name === "image") setImage(value);
    else if (name === "location") setLocation(value);
    else if (name === "phone") setPhone(value);
    else if (name === "email") setEmail(value);
  };

  return (
    <div>
      <PageHeading heading="Edit contact" />
      <Form section="contact" path={path} data={data}>
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
            label="Location"
            name="location"
            value={location}
            background="dark"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Phone"
            name="phone"
            value={phone}
            background="dark"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Email"
            name="email"
            value={email}
            background="dark"
            onChange={handleInputChange}
          />
        </FormRow>
      </Form>
    </div>
  );
}
