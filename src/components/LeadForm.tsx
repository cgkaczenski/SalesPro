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
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type LeadFormProps = {
  actionType: "add" | "edit" | "updateStage" | "delete";
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
    defaultValues:
      actionType === "add"
        ? undefined
        : {
            name: leadContext?.selectedLead?.name,
            email: leadContext?.selectedLead?.email,
            phone: leadContext?.selectedLead?.phone ?? "",
            amount: leadContext?.selectedLead?.amount,
            title: leadContext?.selectedLead?.title,
            company: leadContext?.selectedLead?.company,
          },
  });
  if (!leadContext) {
    return <div>Loading...</div>;
  }
  const {
    selectedLead,
    handleAddLead,
    handleEditLead,
    handleUpdateStage,
    handleDeleteLead,
  } = leadContext;

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

  if (actionType === "delete") {
    return (
      <>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Delete lead
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete your lead? This action cannot be
                undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <Button
            variant="destructive"
            onClick={async () =>
              selectedLead?.id && (await handleDeleteLead(selectedLead.id))
            }
            className="mx-2"
          >
            Delete
          </Button>
          <Button onClick={(e) => handleClose(e)}>Cancel</Button>
        </div>
      </>
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
