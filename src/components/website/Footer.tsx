import { Link } from "react-router-dom";
import Platforms from "./landing/Platforms";
import dateUtil from "../../utils/dateUtil";
import SocialLinks from "./landing/SocialLinks";
import useAppStore, {
  FooterSection,
  selectHasAnyDownloadablePlatfrom,
} from "../../stores/appStore";
import { useShallow } from "zustand/shallow";

export default function Footer() {
  const currentYear = dateUtil.currentYear();
  const [appName, tagline, website, readByPath] = useAppStore(
    useShallow((state) => [
      state.name,
      state.tagline,
      state.website,
      state.readByPath,
    ])
  );
  const hasAnyDownloadablePlatfrom = useAppStore(
    selectHasAnyDownloadablePlatfrom
  );
  const footer = readByPath<FooterSection>("website.landing.footer");
  if (!footer.visibility) return null;
  const termsVisibility = website ? website.terms.visibility : false;
  const privacyVisibility = website ? website.privacy.visibility : false;

  return (
    <footer id="footer" className="pt-36">
      <div className="bg-slate-950 rounded-3xl p-8 sm:p-10 md:p-12 lg:p-14">
        <Link to="/" className="block w-fit">
          <h5 className="text-slate-100 font-semibold text-2xl leading-tight mb-1">
            {appName}
          </h5>
        </Link>
        <p className="text-lg text-slate-300 mb-8 leading-tight">{tagline}</p>
        <div className="flex justify-between gap-5 flex-col-reverse md:flex-row">
          <div>
            <div>
              <div className="mb-5">
                <h5 className="text-lg font-medium mb-4 leading-tight text-slate-300">
                  Follow us on
                </h5>
                <SocialLinks links={footer.socials} />
              </div>
              <p className="flex gap-6 text-lg text-slate-400">
                Copyright © {appName} {currentYear}
              </p>
            </div>
          </div>
          <div className="md:self-end">
            {hasAnyDownloadablePlatfrom && (
              <div className="mb-5">
                <h5 className="text-lg font-medium mb-4 leading-tight text-slate-300">
                  Download our app
                </h5>
                <Platforms type="downloadable" />
              </div>
            )}
            <div className="flex gap-6 text-lg text-slate-400">
              {termsVisibility && <Link to="/terms">Terms of Service</Link>}
              {privacyVisibility && <Link to="/privacy">Privacy Policy</Link>}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
