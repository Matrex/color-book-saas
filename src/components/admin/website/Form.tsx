import { ReactNode } from "react";
import FormButtons from "./FormButtons";
import useButton from "../../../hooks/useButton";
import useAlertStore from "../../../stores/alertStore";
import useAppStore from "../../../stores/appStore";
import { useShallow } from "zustand/shallow";
import settingApi from "../../../apis/settingApi";
import FormRow from "./FormRow";
import stringUtil from "../../../utils/stringUtil";

interface Props<Data> {
  section: string;
  path: string;
  data: Data;
  children: ReactNode;
}

export default function Form<Data>(props: Props<Data>) {
  const [updating, startUpdating, stopUpdating] = useButton();
  const replaceAlert = useAlertStore((state) => state.replace);
  const [readByPath, updateByPath] = useAppStore(
    useShallow((state) => [state.readByPath, state.updateByPath])
  );

  const handleUpdateClick = async () => {
    startUpdating();
    updateByPath(props.path, props.data);
    const website = readByPath("website");
    const result = await settingApi.update("website", { value: website });
    stopUpdating();
    if (!result) return;
    replaceAlert(
      "success",
      `${stringUtil.uppercaseFirst(props.section)} successfully updated`
    );
  };

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-10 xl:col-span-8 grid gap-y-4">
        {props.children}
        <FormRow>
          <FormButtons
            section={props.section}
            updating={updating}
            onUpdate={handleUpdateClick}
          />
        </FormRow>
      </div>
    </div>
  );
}
