import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubitemProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const Subitem = ({ children, isActive, onClick }: SubitemProps) => {
  return (
    <li className="w-full">
      <Button
        disabled={isActive}
        onClick={onClick}
        className={cn(
          "flex h-auto w-full flex-row justify-start rounded-md py-2 text-[13px] disabled:cursor-default",
          isActive
            ? "bg-white text-[#14B8A6] shadow-sm hover:bg-white disabled:opacity-100"
            : "bg-[#F7F7F8] text-[#5E5F6E] hover:bg-[#EBEBEB]/75",
        )}
      >
        {children}
      </Button>
    </li>
  );
};
