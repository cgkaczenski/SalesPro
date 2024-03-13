import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function LeadButton({
  actionType,
  children,
}: {
  actionType: "add" | "edit" | "close";
  children?: React.ReactNode;
}) {
  if (actionType === "add") {
    return (
      <Button size="icon" variant="green">
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  }

  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "close") {
    return <Button variant="green">{children}</Button>;
  }

  return <Button>Lead Button</Button>;
}
