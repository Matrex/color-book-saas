import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import { Image } from "lucide-react";
import File from "../../../components/File";
import InputFeature from "../../../components/admin/website/InputFeature";
import useAppStore, {
  Feature,
  FeaturesSection,
} from "../../../stores/appStore";
import Textarea from "../../../components/Textarea";
import FormRow from "../../../components/admin/website/FormRow";
import Form from "../../../components/admin/website/Form";

export function FeaturesEdit() {
  const path = "website.landing.features";
  const readByPath = useAppStore((state) => state.readByPath);
  const featuresData = readByPath<FeaturesSection>(path);

  const [subheading, setSubheading] = useState(featuresData.subheading);
  const [image, setImage] = useState(featuresData.image);
  const [features, setFeatures] = useState<Feature[]>(featuresData.features);

  const data: FeaturesSection = {
    subheading,
    image,
    features,
    visibility: featuresData.visibility,
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "subheading") setSubheading(value);
    if (name === "image") setImage(value);
  };

  const handleFeaturesChange = (features: Feature[]) => {
    setFeatures(features);
  };

  return (
    <div>
      <PageHeading heading="Edit features" />
      <Form section="features" path={path} data={data}>
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
          <InputFeature features={features} onChange={handleFeaturesChange} />
        </FormRow>
      </Form>
    </div>
  );
}
