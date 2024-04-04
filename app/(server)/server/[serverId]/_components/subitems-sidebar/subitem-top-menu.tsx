"use client";
import {
  Plus,
  Search,
  Settings,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";

interface SubitemTopMenuProps {
  serverId: string;
}

// Convex
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

// Components
import { Subitem } from "./subitem";
import { InviteToServer } from "./top-menu-items/invite-to-server";
import { CreateChannel } from "./top-menu-items/create-channel";
import { Skeleton } from "@/components/ui/skeleton";

export const SubitemTopMenu = ({ serverId }: SubitemTopMenuProps) => {
  const role = useQuery(api.membership.getGuestRole, {
    serverId: serverId as Id<"servers">,
  });

  if (role === undefined) {
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
        <li className="w-full">
          <Skeleton className="h-[35px] w-full rounded-md bg-black/5" />
        </li>
      </ul>
    );
  }

  return (
    <ul className="w-full border-b-[1px] border-[#E3E3E8]/80 px-3 py-3 shadow-sm shadow-white">
      <Subitem>
        <span className="flex flex-row items-center justify-between">
          <Search size={16} className="mr-2" />
          Search
        </span>
      </Subitem>
      {role === false && (
        <>
          <Subitem>
            <span className="flex flex-row items-center justify-between">
              <Settings size={16} className="mr-2" />
              Server settings
            </span>
          </Subitem>
          <InviteToServer serverId={serverId as Id<"servers">} />
          <Subitem>
            <span className="flex flex-row items-center justify-between">
              <UsersRound size={16} className="mr-2" />
              Manage members
            </span>
          </Subitem>
          <CreateChannel serverId={serverId as Id<"servers">} />
        </>
      )}
    </ul>
  );
};
