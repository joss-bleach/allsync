"use client";
import { redirect } from "next/navigation";
import { Settings } from "lucide-react";

interface SubitemMemberMenuProps {
  serverId: string;
}

// Convex
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import { Subitem } from "./subitem";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useUser } from "@clerk/nextjs";

export const SubitemMemberMenu = ({ serverId }: SubitemMemberMenuProps) => {
  const members = useQuery(api.memberships.getByServer, {
    serverId: serverId as Id<"servers">,
  });
  const { user } = useUser();

  if (members === undefined) {
    return (
      <ul className="flex w-full flex-col space-y-2 px-3 pt-6">
        <li className="w-full">
          <Skeleton className="h-[35px] w-full rounded-md bg-black/5" />
        </li>
        <li className="w-full">
          <Skeleton className="h-[35px] w-full rounded-md bg-black/5" />
        </li>
        <li className="w-full">
          <Skeleton className="h-[35px] w-full rounded-md bg-black/5" />
        </li>
        <li className="w-full">
          <Skeleton className="h-[35px] w-full rounded-md bg-black/5" />
        </li>
      </ul>
    );
  }

  if (!members || members.length < 0) {
    return redirect("/");
  }

  return (
    <ul className="w-full px-3 pt-6">
      <li className="flex flex-row justify-between px-4 pb-1 text-[12px] font-semibold text-[#5E5F6E]">
        Members
        <Settings size={16} />
      </li>
      {members.map((member) => {
        if (user?.id === member.user?.clerkUser.id) {
          return null;
        }
        return (
          <Subitem key={member._id}>
            <span className="flex flex-row items-center gap-2">
              <UserAvatar
                firstName={member.user?.clerkUser.first_name!}
                lastName={member.user?.clerkUser.last_name!}
                imageUrl={member.user?.clerkUser.image_url!}
                className="h-[20px] w-[20px]"
              />
              {`${member.user?.clerkUser.first_name} ${member.user?.clerkUser.last_name}`}
            </span>
          </Subitem>
        );
      })}
    </ul>
  );
};
