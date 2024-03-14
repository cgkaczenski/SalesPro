"use client";

import { useLeadContext } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
  const { selectedLead, handleAddLead, handleEditLead, handleCloseLead } =
    leadContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (actionType === "add" || actionType === "edit") {
      const formData = new FormData(e.currentTarget);
      const formEntries = Array.from(formData.entries());
      const formObject = formEntries.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {}
      ) as Partial<Lead> & { name: string; email: string };

      if (actionType === "add") {
        handleAddLead(formObject);
      } else if (actionType === "edit") {
        handleEditLead(selectedLead!.id, formObject);
      }
    }

    if (actionType === "close") {
      const formData = new FormData(e.currentTarget);
      const formEntries = Array.from(formData.entries());
      const formObject = formEntries.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {}
      ) as { status: string };
      handleCloseLead(selectedLead!.id, formObject.status);
    }

    onBtnClick();
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onBtnClick();
  };

  if (actionType === "close") {
    return (
      <form onSubmit={handleSubmit}>
        <Label htmlFor="status">Close Status</Label>
        <Select name="status" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select close status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="closed_won">Closed Won</SelectItem>
            <SelectItem value="closed_lost">Closed Lost</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex justify-end space-x-2 pt-4">
          <Button onClick={(e) => handleClose(e)}>Cancel</Button>
          <Button type="submit" variant="green">
            Save
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        type="text"
        name="name"
        required
        defaultValue={actionType === "edit" ? selectedLead?.name : ""}
      />
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        name="email"
        required
        defaultValue={actionType === "edit" ? selectedLead?.email : ""}
      />
      <Label htmlFor="phone">Phone</Label>
      <Input
        id="phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="xxx-xxx-xxxx"
        name="phone"
        defaultValue={actionType === "edit" ? selectedLead?.phone : ""}
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
