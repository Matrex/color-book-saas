import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { ArrowLeft } from "lucide-react";

interface Props {
  hug: boolean;
}

export default function ButtonCancel(props: Props) {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate(-1);
  };

  return (
    <Button
      type="secondary"
      text="Cancel"
      icon={ArrowLeft}
      hug={props.hug}
      processing={false}
      onClick={handleCancelClick}
    />
  );
}
