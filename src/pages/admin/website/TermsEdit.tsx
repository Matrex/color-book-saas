import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import QuillEditor from "../../../components/admin/QuillEditor";
import useAppStore, { Terms } from "../../../stores/appStore";
import Form from "../../../components/admin/website/Form";
import FormRow from "../../../components/admin/website/FormRow";

export function TermsEdit() {
  const path = "website.terms";
  const readByPath = useAppStore((state) => state.readByPath);
  const terms = readByPath<Terms>(path);

  const [article, setArticle] = useState(terms.article);

  const data: Terms = {
    article,
    visibility: terms.visibility,
  };

  const handleEditorChange = (html: string) => {
    setArticle(html);
  };

  return (
    <div>
      <PageHeading heading="Edit terms of service" />
      <Form section="terms" path={path} data={data}>
        <FormRow>
          <div className="col-span-2 grid">
            <QuillEditor html={article} onChange={handleEditorChange} />
          </div>
        </FormRow>
      </Form>
    </div>
  );
}
