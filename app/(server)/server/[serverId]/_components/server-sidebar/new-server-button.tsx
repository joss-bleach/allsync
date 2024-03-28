"use client";
import { Plus } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/shared/tooltip";

export const NewServerButton = () => {
  return (
    <Tooltip side="right" sideOffset={10} label="New server">
      <Button className="h-[45px] w-[45px] rounded-md border-[1px] border-[#D6D6D6] bg-white hover:bg-[#D6D6D6]/10">
        <Plus size={18} className="text-[#2F3037]" />
      </Button>
    </Tooltip>
  );
};
