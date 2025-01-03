import { useShallow } from "zustand/shallow";
import Article from "../components/website/Article";
import useAppStore from "../stores/appStore";

export function Terms() {
  const [website] = useAppStore(useShallow((state) => [state.website]));
  const content = website ? website.terms.article : "";
  const visibility = website ? website.terms.visibility : false;

  return (
    visibility && (
      <Article
        title="Terms of Service"
        subtitle="Understanding Your Rights and Responsibilities"
        content={content}
      />
    )
  );
}
