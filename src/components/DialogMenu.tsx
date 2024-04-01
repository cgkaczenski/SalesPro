import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import LeadExpandedDetails from "@/components/LeadExpandedDetails";

type MenuItemType = "EDIT" | "VIEW" | "DELETE";

export default function DialogMenu() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | null>(
    null
  );

  const handleMenuItemClick = (menuItemType: MenuItemType) => {
    setSelectedMenuItem(menuItemType);
    setIsFormOpen(true);
  };

  const renderDialogContent = () => {
    switch (selectedMenuItem) {
      case "EDIT":
        return (
          <LeadForm actionType="edit" onClick={() => setIsFormOpen(false)} />
        );
      case "VIEW":
        return <LeadExpandedDetails />;
      case "DELETE":
        return (
          <LeadForm actionType="delete" onClick={() => setIsFormOpen(false)} />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVerticalIcon className="h-8 w-8 text-gray-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleMenuItemClick("VIEW")}
            >
              <span>View</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleMenuItemClick("EDIT")}
            >
              <span>Edit</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleMenuItemClick("DELETE")}
            >
              <span>Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>{renderDialogContent()}</DialogContent>
    </Dialog>
  );
}
