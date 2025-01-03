import PageHeading from "../../../components/PageHeading";
import InputSocial from "../../../components/admin/website/InputSocial";
import { useState } from "react";
import useAppStore, { FooterSection, Social } from "../../../stores/appStore";
import Form from "../../../components/admin/website/Form";
import FormRow from "../../../components/admin/website/FormRow";

export function FooterEdit() {
  const path = "website.landing.footer";
  const readByPath = useAppStore((state) => state.readByPath);
  const footer = readByPath<FooterSection>(path);

  const [socials, setSocials] = useState<Social[]>(footer.socials);

  const data: FooterSection = {
    socials,
    visibility: footer.visibility,
  };

  const handleSocialsChange = (socials: Social[]) => {
    setSocials(socials);
  };

  return (
    <div>
      <PageHeading heading="Edit footer" />
      <Form section="footer" path={path} data={data}>
        <FormRow>
          <InputSocial socials={socials} onChange={handleSocialsChange} />
        </FormRow>
      </Form>
    </div>
  );
}
