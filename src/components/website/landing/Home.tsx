import Platforms from "./Platforms";
import Button from "../../Button";
import { CircleHelp, LogIn } from "lucide-react";
import useAppStore, {
  HomeSection,
  HowItWorksSection,
  selectHasAnyPlatfrom,
} from "../../../stores/appStore";

export default function Home() {
  const readByPath = useAppStore((state) => state.readByPath);
  const hasAnyPlatfrom = useAppStore(selectHasAnyPlatfrom);
  const home = readByPath<HomeSection>("website.landing.home");
  const howItWorks = readByPath<HowItWorksSection>(
    "website.landing.howItWorks"
  );
  if (!home.visibility) return null;

  return (
    <section className="flex flex-col lg:flex-row lg:items-center gap-11 mt-24">
      <div className="lg:w-1/2">
        <h1 className="mb-4">
          <span className="text-slate-100 font-bold text-[28px] leading-snug mb-0.5 block">
            {home.headingLine1}
          </span>
          <span className="text-yellow-400 font-black text-4xl">
            {home.headingLine2}
          </span>
        </h1>
        <h2 className="text-xl leading-tight text-slate-100 mb-8 max-w-[497px]">
          {home.subheading}
        </h2>
        <div className="flex flex-wrap gap-5 mb-10">
          {howItWorks.visibility && (
            <Button
              type="info"
              text="How it works"
              icon={CircleHelp}
              to="/#how-it-works"
              hug={true}
              processing={false}
            />
          )}
          <Button
            type="primary"
            text="Start free trial"
            icon={LogIn}
            to="/sign-up"
            hug={true}
            processing={false}
          />
        </div>
        {hasAnyPlatfrom && (
          <>
            <h3 className="text-xl leading-tight text-slate-100 mb-3">
              Available on your favorite platforms
            </h3>
            <Platforms type="available" />
          </>
        )}
      </div>
      <div className="lg:w-1/2">
        <img
          src={home.image}
          className="w-full h-full object-cover max-w-96 lg:max-w-[550px]"
        />
      </div>
    </section>
  );
}
