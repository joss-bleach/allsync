"use client";

interface SubitemTopMenuProps {
  serverId: string;
}

// Components
import {
  Plus,
  Search,
  Settings,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { Subitem } from "./subitem";

export const SubitemTopMenu = ({ serverId }: SubitemTopMenuProps) => {
  return (
    <ul className="w-full border-b-[1px] border-[#E3E3E8]/80 px-3 py-3 shadow-sm shadow-white">
      <Subitem>
        <span className="flex flex-row items-center justify-between">
          <Search size={16} className="mr-2" />
          Search
        </span>
      </Subitem>
      <Subitem>
        <span className="flex flex-row items-center justify-between">
          <Settings size={16} className="mr-2" />
          Server settings
        </span>
      </Subitem>
      <Subitem>
        <span className="flex flex-row items-center justify-between">
          <UserRoundPlus size={16} className="mr-2" />
          Invite people
        </span>
      </Subitem>
      <Subitem>
        <span className="flex flex-row items-center justify-between">
          <UsersRound size={16} className="mr-2" />
          Manage members
        </span>
      </Subitem>
      <Subitem>
        <span className="flex flex-row items-center justify-between">
          <Plus size={16} className="mr-2" />
          Create channel
        </span>
      </Subitem>
    </ul>
  );
};