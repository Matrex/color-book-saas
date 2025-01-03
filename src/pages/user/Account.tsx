import ActivePlan from "../../components/user/ActivePlan";
import AccountUpdateForm from "../../components/AccountUpdateForm";
import creditApi, { CreditData } from "../../apis/creditApi";
import { useLoaderData } from "react-router-dom";

interface LoaderProps {
  credit: CreditData;
}

export async function userAccountLoader() {
  const credit = await creditApi.read();
  return { credit };
}

export function Account() {
  const { credit } = useLoaderData() as LoaderProps;

  return (
    <div className="grid grid-cols-10 gap-6">
      <div className="col-span-10 md:col-span-5 xl:col-span-4">
        <AccountUpdateForm heading="Account" />
      </div>
      <div className="col-span-10 md:col-span-5 xl:col-span-4">
        <ActivePlan credit={credit} />
      </div>
    </div>
  );
}
