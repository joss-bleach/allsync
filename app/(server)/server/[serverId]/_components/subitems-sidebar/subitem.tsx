import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SubitemProps {
  children: React.ReactNode;
}

export const Subitem = ({ children }: SubitemProps) => {
  return (
    <li className="w-full">
      <Button className="flex h-auto w-full flex-row justify-start rounded-md bg-[#F7F7F8] py-2 text-[13px] text-[#5E5F6E] hover:bg-[#EBEBEB]/75">
        {children}
      </Button>
    </li>
  );
};
