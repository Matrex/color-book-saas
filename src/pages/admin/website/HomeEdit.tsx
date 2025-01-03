import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import { FileBox, Image } from "lucide-react";
import Input from "../../../components/Input";
import File from "../../../components/File";
import useAppStore, { HomeSection } from "../../../stores/appStore";
import Textarea from "../../../components/Textarea";
import Form from "../../../components/admin/website/Form";
import FormHeading from "../../../components/admin/website/FormHeading";
import FormRow from "../../../components/admin/website/FormRow";

export function HomeEdit() {
  const path = "website.landing.home";
  const readByPath = useAppStore((state) => state.readByPath);
  const home = readByPath<HomeSection>(path);

  const [headingLine1, setHeadingLine1] = useState(home.headingLine1);
  const [headingLine2, setHeadingLine2] = useState(home.headingLine2);
  const [subheading, setSubheading] = useState(home.subheading);
  const [image, setImage] = useState(home.image);
  const [web, setWeb] = useState(home.platforms.web);
  const [android, setAndroid] = useState(home.platforms.android);
  const [ios, setIos] = useState(home.platforms.ios);
  const [windows, setWindows] = useState(home.platforms.windows);
  const [mac, setMac] = useState(home.platforms.mac);
  const [debian, setDebian] = useState(home.platforms.debian);

  const data: HomeSection = {
    headingLine1,
    headingLine2,
    subheading,
    image,
    platforms: {
      web,
      android,
      ios,
      windows,
      mac,
      debian,
    },
    visibility: home.visibility,
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "headingLine1") setHeadingLine1(value);
    else if (name === "headingLine2") setHeadingLine2(value);
    else if (name === "subheading") setSubheading(value);
    else if (name === "web") setWeb(value);
    else if (name === "android") setAndroid(value);
    else if (name === "ios") setIos(value);
    else if (name === "image") setImage(value);
    else if (name === "windows") setWindows(value);
    else if (name === "mac") setMac(value);
    else if (name === "debian") setDebian(value);
  };

  return (
    <div>
      <PageHeading heading="Edit home" />
      <Form section="home" path={path} data={data}>
        <FormRow>
          <Input
            type="text"
            label="Heading line 1"
            name="headingLine1"
            value={headingLine1}
            background="dark"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Heading line 2"
            name="headingLine2"
            value={headingLine2}
            background="dark"
            onChange={handleInputChange}
          />
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
        <FormHeading>Platforms</FormHeading>
        <FormRow>
          <Input
            type="text"
            label="Web URL"
            name="web"
            value={web}
            background="dark"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Google Play URL"
            name="android"
            value={android}
            background="dark"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="App Store URL"
            name="ios"
            value={ios}
            background="dark"
            onChange={handleInputChange}
          />
          <File
            accept="*"
            label="Windows build"
            name="windows"
            value={windows}
            background="dark"
            placeholder="Choose file"
            icon={FileBox}
            onChange={handleInputChange}
          />
          <File
            accept="*"
            label="Mac build"
            name="mac"
            value={mac}
            background="dark"
            placeholder="Choose file"
            icon={FileBox}
            onChange={handleInputChange}
          />
          <File
            accept="*"
            label="Debian build"
            name="debian"
            value={debian}
            background="dark"
            placeholder="Choose file"
            icon={FileBox}
            onChange={handleInputChange}
          />
        </FormRow>
      </Form>
    </div>
  );
}
