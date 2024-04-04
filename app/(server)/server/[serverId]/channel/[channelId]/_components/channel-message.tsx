"use client";
import { ChannelMessageWithUser } from "@/types";
import { formatDistance } from "date-fns";

interface ChannelMessageProps {
  message: ChannelMessageWithUser;
}

// Convex
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Component
import { UserAvatar } from "@/components/shared/user-avatar";
import { RoleBadge } from "@/components/shared/role-badge";

export const ChannelMessage = ({ message }: ChannelMessageProps) => {
  if (message.user === null) {
    return null;
  }

  const role = useQuery(api.membership.getRole, {
    userId: message.user._id!,
    channelId: message.channelId,
  });

  return (
    <div className="group w-full px-3 py-6 transition hover:bg-[#F5F5F5]/50">
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
        </div>
      </div>
    </div>
  );
};
