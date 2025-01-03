import BrushSizePicker from "../../components/user/BrushSizePicker";
import ColorPicker from "../../components/user/ColorPicker";
import ColorActions from "../../components/user/ColorActions";
import PageColor from "../../components/user/PageColor";
import pageApi, { ReadResult } from "../../apis/pageApi";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import creditApi from "../../apis/creditApi";
import { alertStore } from "../../stores/alertStore";

interface LoaderProps {
  page: ReadResult;
}

export async function colorLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) return redirect("/pages/public");
  const page = await pageApi.read(Number(id));
  if (!page) return redirect("/pages/public");
  const credit = await creditApi.read();
  if (!credit) throw new Error("Failed to read credit");
  const canColorWithoutCredits = page.is_colored || page.is_owner;
  if (!canColorWithoutCredits && credit.public_page <= 0) {
    alertStore().replace(
      "danger",
      "No credits available. Upgrade your plan to continue.",
      true
    );
    return redirect("/checkout");
  }
  return { page };
}

export function Color() {
  const { page } = useLoaderData() as LoaderProps;

  return (
    <div className="flex flex-col items-center relative">
      <PageColor page={page} />
      <div className="absolute bottom-28 sm:bottom-16 left-1/2 -translate-x-1/2 z-50">
        <BrushSizePicker />
        <ColorPicker />
      </div>
      <div className="mt-6">
        <ColorActions pageId={page.id} />
      </div>
    </div>
  );
}
