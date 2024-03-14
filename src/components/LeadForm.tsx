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
  actionType: "add" | "edit" | "updateStage";
  onBtnClick: () => void;
};

export default function LeadForm({ actionType, onBtnClick }: LeadFormProps) {
  const leadContext = useLeadContext();
  if (!leadContext) {
    return <div>Loading...</div>;
  }
  const { selectedLead, handleAddLead, handleEditLead, handleUpdateStage } =
    leadContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (actionType === "add" || actionType === "edit") {
      const formData = new FormData(e.currentTarget);
      const formEntries = Array.from(formData.entries());
      const formObject = formEntries.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {}
      ) as Partial<Lead> & {
        name: string;
        email: string;
        amount: number;
        title: string;
        company: string;
      };

      if (actionType === "add") {
        handleAddLead(formObject);
      } else if (actionType === "edit") {
        handleEditLead(selectedLead!.id, formObject);
      }
    }

    if (actionType === "updateStage") {
      const formData = new FormData(e.currentTarget);
      const formEntries = Array.from(formData.entries());
      const formObject = formEntries.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {}
      ) as { status: string };
      handleUpdateStage(selectedLead!.id, formObject.status);
    }

    onBtnClick();
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onBtnClick();
  };

  if (actionType === "updateStage") {
    return (
      <form onSubmit={handleSubmit}>
        <Label htmlFor="status">Stage</Label>
        <Select name="status" defaultValue={selectedLead?.stage} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select new stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Nurturing">Nurturing</SelectItem>
            <SelectItem value="Proposal">Proposal</SelectItem>
            <SelectItem value="Closed Won">Closed Won</SelectItem>
            <SelectItem value="Closed Lost">Closed Lost</SelectItem>
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
      <Label htmlFor="name">Amount</Label>
      <Input
        id="amount"
        type="number"
        name="amount"
        required
        defaultValue={actionType === "edit" ? selectedLead?.amount : ""}
      />
      <Label htmlFor="name">Title</Label>
      <Input
        id="title"
        type="text"
        name="title"
        required
        defaultValue={actionType === "edit" ? selectedLead?.title : ""}
      />
      <Label htmlFor="name">Company</Label>
      <Input
        id="company"
        type="text"
        name="company"
        required
        defaultValue={actionType === "edit" ? selectedLead?.company : ""}
      />
      <div className="flex justify-end space-x-2 pt-4">
        <Button onClick={() => onBtnClick()}>Cancel</Button>
        <Button type="submit" variant="green">
          Save
        </Button>
      </div>
    </form>
  );
}