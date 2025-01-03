import { useLoaderData } from "react-router-dom";
import appApi, { StatusResult } from "../../apis/appApi";
import AccountUpdateForm from "../../components/AccountUpdateForm";
import AppSetupStatus from "../../components/admin/AppSetupStatus";
import AppUpdateForm from "../../components/admin/AppUpdateForm";
import { useEffect } from "react";
import useAppStore from "../../stores/appStore";

interface LoaderData {
  appStatus: StatusResult;
}

export async function adminAccountLoader() {
  const appStatus = await appApi.status();
  return { appStatus };
}

export function Account() {
  const { appStatus } = useLoaderData() as LoaderData;
  const replaceStatus = useAppStore((state) => state.replaceStatus);

  useEffect(() => {
    replaceStatus(appStatus);
  }, []);

  return (
    <div className="grid grid-cols-10 gap-6">
      <div className="col-span-10 lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
        <AppSetupStatus />
        <AccountUpdateForm heading="Admin account" />
      </div>
      <div className="col-span-10 lg:col-span-5 xl:col-span-4">
        <AppUpdateForm />
      </div>
    </div>
  );
}
