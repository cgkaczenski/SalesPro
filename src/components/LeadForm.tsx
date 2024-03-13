"use client";

import { useLeadContext } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Lead } from "@/lib/types";

type LeadFormProps = {
  actionType: "add" | "edit" | "close";
  onBtnClick: () => void;
};

export default function LeadForm({ actionType, onBtnClick }: LeadFormProps) {
  const leadContext = useLeadContext();
  if (!leadContext) {
    return <div>Loading...</div>;
  }
  const { handleAddLead } = leadContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formEntries = Array.from(formData.entries());
    const formObject = formEntries.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    ) as Partial<Lead> & { name: string; email: string };
    handleAddLead(formObject);
    onBtnClick();
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onBtnClick();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input id="name" type="text" name="name" required />
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" name="email" required />
      <Label htmlFor="phone">Phone</Label>
      <Input
        id="phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="xxx-xxx-xxxx"
        name="phone"
      />
      <div className="flex justify-end space-x-2 pt-4">
        <Button onClick={(e) => handleClose(e)}>Cancel</Button>
        <Button type="submit" variant="green">
          Save
        </Button>
      </div>
    </form>
  );
}
