import { Button } from "@/components/ui/button";

export default function LeadForm() {
  return (
    <form>
      Form here ...
      <div className="flex justify-end space-x-2">
        <Button onClick={() => console.log("close")}>Cancel</Button>
        <Button variant="green">Save</Button>
      </div>
    </form>
  );
}
