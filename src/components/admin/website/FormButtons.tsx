import { Save } from "lucide-react";
import Button from "../../Button";
import ButtonCancel from "../ButtonCancel";

interface Props {
  section: string;
  updating: boolean;
  onUpdate: VoidFunction;
}

export default function FormButtons(props: Props) {
  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-y-3">
        <Button
          type="primary"
          text={`Update ${props.section}`}
          icon={Save}
          hug={false}
          processing={props.updating}
          onClick={props.onUpdate}
        />
        <ButtonCancel hug={false} />
      </div>
    </div>
  );
}
