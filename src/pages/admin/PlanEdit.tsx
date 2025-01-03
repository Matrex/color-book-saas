import { WalletMinimal } from "lucide-react";
import Button from "../../components/Button";
import PageHeading from "../../components/PageHeading";
import useButton from "../../hooks/useButton";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import planApi, { PlanData, PlanUpdatePayload } from "../../apis/planApi";
import {
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import useAlertStore from "../../stores/alertStore";
import { useShallow } from "zustand/shallow";
import ButtonCancel from "../../components/admin/ButtonCancel";

interface LoaderProps {
  plan: PlanData;
}

export async function planEditLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) return redirect("/admin/plans");
  const plan = await planApi.read(Number(id));
  if (!plan) return redirect("/admin/plans");
  return { plan };
}

export function PlanEdit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stripePriceId, setStripePriceId] = useState("");
  const [publicPageLimit, setPublicPageLimit] = useState("");
  const [pageCreateLimit, setPageCreateLimit] = useState("");
  const [processing, startProcessing, stopProcessing] = useButton();
  const { plan } = useLoaderData() as LoaderProps;
  const [replaceAlert] = useAlertStore(useShallow((state) => [state.replace]));

  const handleInputChange = (name: string, value: string) => {
    if (name === "title") setTitle(value);
    else if (name === "description") setDescription(value);
    else if (name === "price") setPrice(value);
    else if (name === "stripePriceId") setStripePriceId(value);
    else if (name === "publicPageLimit") setPublicPageLimit(value);
    else if (name === "pageCreateLimit") setPageCreateLimit(value);
  };

  const handleUpdateClick = async () => {
    const payload: PlanUpdatePayload = {
      name: plan.name,
      title,
      description,
      price: Number(price),
      publicPageLimit: Number(publicPageLimit),
      pageCreationLimit: Number(pageCreateLimit),
    };
    if (plan.paid) {
      payload.stripePriceId = stripePriceId;
    }
    startProcessing();
    const result = await planApi.update(payload, plan.id);
    stopProcessing();
    if (result && result.updated)
      replaceAlert("success", "Plan has been updated");
  };

  useEffect(() => {
    setTitle(plan.title);
    setDescription(plan.description);
    setPrice(String(plan.price));
    setStripePriceId(plan.stripe_price_id || "");
    setPublicPageLimit(String(plan.public_page_limit));
    setPageCreateLimit(String(plan.page_creation_limit));
  }, [plan]);

  return (
    <div>
      <PageHeading heading="Edit plan" />
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-10 lg:col-span-5 xl:col-span-4 grid gap-4">
          <Input
            type="text"
            label="Title"
            name="title"
            value={title}
            background="dark"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Description"
            name="description"
            value={description}
            background="dark"
            onChange={handleInputChange}
          />
          {plan.paid && (
            <Input
              type="number"
              label="Price"
              name="price"
              value={price}
              background="dark"
              onChange={handleInputChange}
            />
          )}
          {plan.paid && (
            <Input
              type="text"
              label="Stripe price ID"
              name="stripePriceId"
              value={stripePriceId}
              background="dark"
              helper={
                <span>
                  You can find the price ID from Pricing section of the Product
                  from{" "}
                  <Link
                    className="text-yellow-400"
                    to="https://dashboard.stripe.com/products"
                    target="_blank"
                  >
                    Product catalog
                  </Link>
                  .
                </span>
              }
              onChange={handleInputChange}
            />
          )}
          <Input
            type="number"
            label="Limit on public pages"
            name="publicPageLimit"
            value={publicPageLimit}
            background="dark"
            onChange={handleInputChange}
          />
          <Input
            type="number"
            label="Limit on create pages"
            name="pageCreateLimit"
            value={pageCreateLimit}
            background="dark"
            onChange={handleInputChange}
          />
          <div className="flex flex-col gap-y-3">
            <Button
              type="primary"
              text="Update plan"
              icon={WalletMinimal}
              hug={false}
              processing={processing}
              onClick={handleUpdateClick}
            />
            <ButtonCancel hug={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
