import { useState } from "react";
import useButton from "../../hooks/useButton";
import PageHeading from "../PageHeading";
import Input from "../Input";
import Button from "../Button";
import { Image, LayoutGrid } from "lucide-react";
import File from "../File";
import useAppStore from "../../stores/appStore";
import { useShallow } from "zustand/shallow";
import settingApi from "../../apis/settingApi";
import { every } from "lodash-es";
import useAlertStore from "../../stores/alertStore";
import { Link } from "react-router-dom";
import appApi from "../../apis/appApi";

export default function AppUpdateForm() {
  const app = useAppStore(
    useShallow((state) => {
      return {
        name: state.name,
        tagline: state.tagline,
        favicon: state.favicon,
      };
    })
  );

  const replaceStatus = useAppStore((state) => state.replaceStatus);

  const [name, setName] = useState(app.name);
  const [tagline, setTagline] = useState(app.tagline);
  const [favicon, setFavicon] = useState(app.favicon);
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [stripeWebhookSecret, setStripeWebhookSecret] = useState("");
  const [updating, startUpdating, stopUpdating] = useButton();
  const [updateName, updateTagline, updateFavicon] = useAppStore(
    useShallow((state) => [
      state.updateName,
      state.updateTagline,
      state.updateFavicon,
    ])
  );
  const [replaceAlert] = useAlertStore(useShallow((state) => [state.replace]));

  const handleInputChange = (name: string, value: string) => {
    if (name === "name") setName(value);
    else if (name === "tagline") setTagline(value);
    else if (name === "openaiApiKey") setOpenaiApiKey(value);
    else if (name === "stripeApiKey") setStripeApiKey(value);
    else if (name === "stripeWebhookSecret") setStripeWebhookSecret(value);
  };

  const handleFileChange = (name: string, value: string) => {
    if (name === "favicon") setFavicon(value);
  };

  const handleUpdateClick = async () => {
    startUpdating();
    const updates = [
      settingApi.update("app_name", { value: name }),
      settingApi.update("tagline", { value: tagline }),
      settingApi.update("favicon", { value: favicon }),
    ];
    if (openaiApiKey)
      updates.push(settingApi.update("openai_key", { value: openaiApiKey }));
    if (stripeApiKey)
      updates.push(settingApi.update("stripe_key", { value: stripeApiKey }));
    if (stripeWebhookSecret)
      updates.push(
        settingApi.update("stripe_webhook_secret", {
          value: stripeWebhookSecret,
        })
      );
    const results = await Promise.all(updates);
    stopUpdating();
    const isAllProcessed = every(results, (result) => result);
    if (!isAllProcessed) return;
    replaceAlert("success", "App settings have been updated");
    updateName(name);
    updateTagline(tagline);
    updateFavicon(favicon);
    const appStatus = await appApi.status();
    if (!appStatus) return;
    replaceStatus(appStatus);
  };

  return (
    <>
      <PageHeading heading="App settings" />
      <div className="grid gap-4">
        <Input
          type="text"
          label="Name"
          name="name"
          value={name}
          background="dark"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          label="Tagline"
          name="tagline"
          value={tagline}
          background="dark"
          onChange={handleInputChange}
        />
        <File
          accept="image/*"
          label="Favicon"
          name="favicon"
          value={favicon}
          background="dark"
          placeholder="Choose favicon"
          icon={Image}
          onChange={handleFileChange}
        />
        <Input
          type="text"
          label="OpenAI API key"
          name="openaiApiKey"
          value={openaiApiKey}
          background="dark"
          helper={
            <span>
              You can find your API key or create one from OpenAI platform from{" "}
              <Link
                className="text-yellow-400"
                to="https://platform.openai.com/settings/organization/api-keys"
                target="_blank"
              >
                API keys
              </Link>
              .
            </span>
          }
          onChange={handleInputChange}
        />
        <Input
          type="text"
          label="Stripe API secret key"
          name="stripeApiKey"
          value={stripeApiKey}
          background="dark"
          helper={
            <span>
              You can find your API secret key or create one from Stripe
              dashboard from{" "}
              <Link
                className="text-yellow-400"
                to="https://dashboard.stripe.com/apikeys"
                target="_blank"
              >
                API keys
              </Link>
              .
            </span>
          }
          onChange={handleInputChange}
        />
        <Input
          type="text"
          label="Stripe webhook signing secret"
          name="stripeWebhookSecret"
          value={stripeWebhookSecret}
          background="dark"
          helper={
            <span>
              You can find your webhook signing secret or create one from Stripe
              dashboard from{" "}
              <Link
                className="text-yellow-400"
                to="https://dashboard.stripe.com/webhooks"
                target="_blank"
              >
                Webhooks
              </Link>
              .
            </span>
          }
          onChange={handleInputChange}
        />
        <Button
          type="primary"
          text="Update app settings"
          icon={LayoutGrid}
          hug={false}
          processing={updating}
          onClick={handleUpdateClick}
        />
      </div>
    </>
  );
}
