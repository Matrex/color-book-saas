import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import { Image } from "lucide-react";
import File from "../../../components/File";
import InputTestimonial from "../../../components/admin/website/InputTestimonial";
import useAppStore, {
  Testimonial,
  TestimonialsSection,
} from "../../../stores/appStore";
import Textarea from "../../../components/Textarea";
import Form from "../../../components/admin/website/Form";
import FormRow from "../../../components/admin/website/FormRow";

export function TestimonialEdit() {
  const path = "website.landing.testimonials";
  const readByPath = useAppStore((state) => state.readByPath);
  const testimonialsData = readByPath<TestimonialsSection>(path);

  const [subheading, setSubheading] = useState(testimonialsData.subheading);
  const [image, setImage] = useState(testimonialsData.image);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    testimonialsData.testimonials
  );

  const data: TestimonialsSection = {
    subheading,
    image,
    testimonials,
    visibility: testimonialsData.visibility,
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "subheading") setSubheading(value);
    if (name === "image") setImage(value);
  };

  const handleTestimonialsChange = (testimonials: Testimonial[]) => {
    setTestimonials(testimonials);
  };

  return (
    <div>
      <PageHeading heading="Edit testimonial" />
      <Form section="testimonial" path={path} data={data}>
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
        </FormRow>
        <FormRow>
          <InputTestimonial
            testimonials={testimonials}
            onChange={handleTestimonialsChange}
          />
        </FormRow>
      </Form>
    </div>
  );
}
