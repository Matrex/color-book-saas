import PublicLayout from "../components/PublicLayout";
import Button from "../components/Button";
import { Undo2 } from "lucide-react";

export function NotFound() {
  return (
    <PublicLayout
      image="/assets/images/not-found.png"
      description="The page you are looking for was not found."
    >
      <Button
        type="primary"
        text="Return to sign in"
        icon={Undo2}
        hug={false}
        to="/sign-in"
        processing={false}
      />
    </PublicLayout>
  );
}
