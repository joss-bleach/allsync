// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  className?: string;
}

export const UserAvatar = ({
  firstName,
  lastName,
  imageUrl,
  className,
}: UserAvatarProps) => {
  return (
    <Avatar className={cn("rounded-full bg-[#F7F7F8]", className)}>
      <AvatarImage
        src={imageUrl ? imageUrl : ""}
        alt={firstName + " " + lastName}
      />
      <AvatarFallback className="text-[13px] font-bold text-[#2F3037]">
        {firstName.charAt(0) + lastName.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
