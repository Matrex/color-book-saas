import Textarea from "../../Textarea";
import InputMulti from "./InputMulti";
import TestimonialCard from "./TestimonialCard";
import Input from "../../Input";
import File from "../../File";
import { Image } from "lucide-react";
import { Testimonial } from "../../../stores/appStore";
import { useState } from "react";
import FormRow from "./FormRow";

export interface Formdata {
  name: string;
  location: string;
  photo: string;
  feedback: string;
}

interface Props {
  testimonials: Testimonial[];
  onChange(testimonials: Testimonial[]): void;
}

export default function InputTestimonial(props: Props) {
  const initialFormdata: Formdata = {
    name: "",
    location: "",
    photo: "",
    feedback: "",
  };

  const [name, setName] = useState(initialFormdata.name);
  const [location, setLocation] = useState(initialFormdata.location);
  const [photo, setPhoto] = useState(initialFormdata.photo);
  const [feedback, setFeedback] = useState(initialFormdata.feedback);

  const formdata: Formdata = { name, location, photo, feedback };

  const handleInputChange = (name: string, value: string) => {
    if (name === "name") setName(value);
    if (name === "location") setLocation(value);
    if (name === "photo") setPhoto(value);
    if (name === "feedback") setFeedback(value);
  };

  const handleFormdataChange = (formdata: Formdata) => {
    setName(formdata.name);
    setLocation(formdata.location);
    setPhoto(formdata.photo);
    setFeedback(formdata.feedback);
  };

  return (
    <InputMulti<Formdata>
      module={{ singular: "testimonial", plural: "testimonials" }}
      items={props.testimonials}
      card={TestimonialCard}
      initialFormdata={initialFormdata}
      formdata={formdata}
      form={
        <FormRow>
          <Input
            type="text"
            label="Customer name"
            name="name"
            value={formdata.name}
            background="dark"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Location"
            name="location"
            value={formdata.location}
            background="dark"
            onChange={handleInputChange}
          />
          <File
            accept="image/*"
            label="Photo"
            name="photo"
            value={formdata.photo}
            background="dark"
            placeholder="Choose photo"
            icon={Image}
            onChange={handleInputChange}
          />
          <Textarea
            label="Feedback"
            value={formdata.feedback}
            name="feedback"
            onChange={handleInputChange}
          />
        </FormRow>
      }
      onItemsChange={props.onChange}
      onFormdataChange={handleFormdataChange}
    />
  );
}
