import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import QuillEditor from "../../../components/admin/QuillEditor";
import useAppStore, { Privacy } from "../../../stores/appStore";
import Form from "../../../components/admin/website/Form";
import FormRow from "../../../components/admin/website/FormRow";

export function PrivacyEdit() {
  const path = "website.privacy";
  const readByPath = useAppStore((state) => state.readByPath);
  const privacy = readByPath<Privacy>(path);

  const [article, setArticle] = useState(privacy.article);

  const data: Privacy = {
    article,
    visibility: privacy.visibility,
  };

  const handleEditorChange = (html: string) => {
    setArticle(html);
  };

  return (
    <div>
      <PageHeading heading="Edit privacy policy" />
      <Form section="privacy policy" path={path} data={data}>
        <FormRow>
          <div className="col-span-2 grid">
            <QuillEditor html={article} onChange={handleEditorChange} />
          </div>
        </FormRow>
      </Form>
    </div>
  );
}
