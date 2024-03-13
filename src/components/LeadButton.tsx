"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import LeadForm from "@/components/LeadForm";

export default function LeadButton({
  actionType,
  children,
}: {
  actionType: "add" | "edit" | "close";
  children?: React.ReactNode;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getButtonByActionType = () => {
    switch (actionType) {
      case "add":
        return (
          <Button size="icon" variant="green">
            <PlusIcon className="h-6 w-6" />
          </Button>
        );
      case "edit":
        return <Button variant="secondary">{children}</Button>;
      case "close":
        return <Button variant="green">{children}</Button>;
      default:
        return null;
    }
  };

  const getDialogTitleByActionType = () => {
    switch (actionType) {
      case "add":
        return <DialogTitle>Add Lead</DialogTitle>;
      case "edit":
        return <DialogTitle>Edit Lead</DialogTitle>;
      case "close":
        return <DialogTitle>Close Lead</DialogTitle>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>{getButtonByActionType()}</DialogTrigger>
      <DialogContent>
        <DialogHeader>{getDialogTitleByActionType()}</DialogHeader>
        <LeadForm />
      </DialogContent>
    </Dialog>
  );
}
