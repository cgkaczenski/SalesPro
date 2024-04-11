import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function AsyncButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="green">
      Save
    </Button>
  );
}
