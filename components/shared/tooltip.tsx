import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

export const Tooltip = ({
  label,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
}: HintProps) => {
  return (
    <TooltipProvider>
      <UiTooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </UiTooltip>
    </TooltipProvider>
  );
};
