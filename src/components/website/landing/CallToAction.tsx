import { LogIn } from "lucide-react";
import Button from "../../Button";
import useAppStore, { CallToActionSection } from "../../../stores/appStore";
import { useShallow } from "zustand/shallow";

export default function CallToAction() {
  const [readByPath] = useAppStore(useShallow((state) => [state.readByPath]));
  const callToAction = readByPath<CallToActionSection>(
    "website.landing.callToAction"
  );
  if (!callToAction.visibility) return null;

  return (
    <section id="call-to-action" className="pt-36">
      <div className="flex gap-7 md:items-center p-8 sm:p-10 justify-between bg-slate-800 rounded-3xl max-w-[830px] mx-auto flex-col md:flex-row">
        <div>
          <h3 className="mb-3 font-semibold text-slate-100 text-2xl leading-tight">
            {callToAction.heading}
          </h3>
          <p className="text-lg font-medium text-slate-300 leading-7">
            {callToAction.description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button
            type="primary"
            text="Get started"
            icon={LogIn}
            to="/sign-up"
            hug={true}
            processing={false}
          />
        </div>
      </div>
    </section>
  );
}
