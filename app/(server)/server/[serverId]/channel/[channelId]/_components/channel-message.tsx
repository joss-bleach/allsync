"use client";
import { ChannelMessageWithUser } from "@/types";
import { formatDistance } from "date-fns";

interface ChannelMessageProps {
  message: ChannelMessageWithUser;
}

// Convex
import { useQuery } from "convex/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Component
import { UserAvatar } from "@/components/shared/user-avatar";
import { RoleBadge } from "@/components/shared/role-badge";

// Clerk
import { useUser } from "@clerk/nextjs";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ChannelMessage = ({ message }: ChannelMessageProps) => {
  if (message.user === null) {
    return null;
  }

  const role = useQuery(api.membership.getRole, {
    userId: message.user._id!,
    channelId: message.channelId,
  });

  const { user } = useUser();
  const remove = useMutation(api.message.remove);

  return (
    <div className="group relative w-full px-3 py-6 transition hover:bg-[#F5F5F5]/50">
      <div className="flex flex-row items-center gap-2">
        <UserAvatar
          className="h-[40px] w-[40px]"
          firstName={message.user?.clerkUser?.first_name}
          lastName={message.user?.clerkUser.last_name}
          imageUrl={message.user?.clerkUser.image_url}
        />
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-[16px] font-medium text-[#2F3037]">{`${message.user?.clerkUser?.first_name} ${message.user?.clerkUser.last_name}`}</h2>
            <RoleBadge role={role} />
            <p className="text-[12px] text-[#5E5F6E] opacity-0 transition group-hover:opacity-100">
              {formatDistance(new Date(message._creationTime), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
          <p className="text-[13px] text-[#5E5F6E]">{message.content}</p>
          {message.user.clerkUser.id === user?.id && (
            <div className="absolute -top-6 right-5 rounded-md border-[1px] border-[#D6D6D6] bg-white p-1 opacity-0 shadow-sm transition group-hover:opacity-100">
              <ul className="flex flex-row items-center gap-1">
                <li>
                  <Button size="icon" variant="ghost" className="p-1">
                    <Pencil size={16} className="text-[#5E5F6E]" />
                  </Button>
                </li>
                <li>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="p-1"
                    aria-label="Delete message"
                    onClick={() => remove({ id: message._id })}
                  >
                    <Trash size={16} className="text-[#5E5F6E]" />
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
