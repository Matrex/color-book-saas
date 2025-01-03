import { CirclePlus } from "lucide-react";
import Button from "../../components/Button";
import InputPrompt from "../../components/user/InputPrompt";
import { useState } from "react";
import useButton from "../../hooks/useButton";
import pageApi, { CreatePayload } from "../../apis/pageApi";
import { redirect, useNavigate } from "react-router-dom";
import creditApi from "../../apis/creditApi";
import { alertStore } from "../../stores/alertStore";

export async function userPageCreateLoader() {
  const credit = await creditApi.read();
  if (!credit) throw new Error("Failed to read credit");
  if (credit.page_creation <= 0) {
    alertStore().replace(
      "danger",
      "No credits available. Upgrade your plan to continue.",
      true
    );
    return redirect("/checkout");
  }
  return null;
}

export function PageCreate() {
  const [description, setDescription] = useState("");
  const [processing, startProcessing, stopProcessing] = useButton();
  const navigate = useNavigate();

  const handleCreatePageClick = async () => {
    startProcessing();
    const payload: CreatePayload = { prompt: description };
    const page = await pageApi.create(payload);
    stopProcessing();
    if (!page) return;
    navigate(`/pages/${page.id}/color`);
  };

  const handleInputChange = (name: string, value: string) => {
    if (name === "description") setDescription(value);
  };

  const handleGenerateClick = async (done: VoidFunction) => {
    const result = await pageApi.generatePrompt();
    done();
    if (!result) return;
    setDescription(result.prompt);
  };

  return (
    <div className="max-w-96 mx-auto">
      <div className="max-w-64 mx-auto mb-7">
        <img
          src="/assets/images/create-page.png"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid gap-4">
        <InputPrompt
          name="description"
          value={description}
          label="Describe the illustration"
          placeholder="Sunrise over rolling hills with rays and clouds"
          onChange={handleInputChange}
          onGenerate={handleGenerateClick}
        />
        <Button
          type="primary"
          text="Create page"
          icon={CirclePlus}
          hug={false}
          processing={processing}
          onClick={handleCreatePageClick}
        />
      </div>
    </div>
  );
}
