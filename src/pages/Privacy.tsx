import { useShallow } from "zustand/shallow";
import Article from "../components/website/Article";
import useAppStore from "../stores/appStore";

export function Privacy() {
  const [website] = useAppStore(useShallow((state) => [state.website]));
  const content = website ? website.privacy.article : "";
  const visibility = website ? website.privacy.visibility : false;

  return (
    visibility && (
      <Article
        title="Privacy Policy"
        subtitle="Your privacy matters to us"
        content={content}
      />
    )
  );
}
