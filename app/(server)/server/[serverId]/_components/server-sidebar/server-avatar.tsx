import Link from "next/link";

// Components
import { Tooltip } from "@/components/shared/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ServerAvatarProps {
  name: string;
  imageUrl: string | null;
  isActive: boolean;
  serverId: string;
}

export const ServerAvatar = ({
  name,
  imageUrl,
  isActive,
  serverId,
}: ServerAvatarProps) => {
  return (
    <Link
      href={`/server/${serverId}`}
      aria-label={`Open ${name}`}
      aria-disabled={isActive}
      className={cn(isActive ? "cursor-default" : "cursor-pointer")}
    >
      <Tooltip label={name} side="right" sideOffset={10}>
        <Avatar className="h-[45px] w-[45px] rounded-md bg-[#F7F7F8]">
          <AvatarImage src={imageUrl ? imageUrl : ""} alt={name} />
          <AvatarFallback className="text-[13px] font-bold text-[#2F3037]">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </Tooltip>
    </Link>
  );
};
