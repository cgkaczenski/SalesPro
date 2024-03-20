"use client";

import { useLeadContext } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import { TLeadForm, leadFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
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
import AsyncButton from "./AsyncButton";

type LeadFormProps = {
  actionType: "add" | "edit" | "updateStage";
  onClick: () => void;
};

export default function LeadForm({ actionType, onClick }: LeadFormProps) {
  const leadContext = useLeadContext();
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<TLeadForm>({
    resolver: zodResolver(leadFormSchema),
  });
  if (!leadContext) {
    return <div>Loading...</div>;
  }
  const { selectedLead, handleAddLead, handleEditLead, handleUpdateStage } =
    leadContext;

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  if (actionType === "updateStage") {
    return (
      <form
        action={async (formData) => {
          if (!selectedLead?.id) return;
          const error = await handleUpdateStage(selectedLead?.id, formData);
          if (!error) {
            onClick();
          }
        }}
      >
        <Label htmlFor="stage">Stage</Label>
        <Select name="stage" defaultValue={selectedLead?.stage} required>
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
          <AsyncButton />
        </div>
      </form>
    );
  }

  return (
    <form
      action={async (formData) => {
        const result = await trigger();
        if (!result) return;
        const error = await (actionType === "add"
          ? handleAddLead(formData)
          : actionType === "edit" && selectedLead?.id
          ? handleEditLead(selectedLead.id, formData)
          : { error: new Error("Invalid action type") });

        if (!error) {
          onClick();
        }
      }}
    >
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register("phone")} />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        <Label htmlFor="name">Amount</Label>
        <Input id="amount" {...register("amount")} />
        {errors.amount && (
          <p className="text-red-500">{errors.amount.message}</p>
        )}
        <Label htmlFor="name">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <Label htmlFor="name">Company</Label>
        <Input id="company" {...register("company")} />
        {errors.company && (
          <p className="text-red-500">{errors.company.message}</p>
        )}
      </>
      <div className="flex justify-end space-x-2 pt-4">
        <Button onClick={() => onClick()}>Cancel</Button>
        <AsyncButton />
      </div>
    </form>
  );
}
