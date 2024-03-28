interface SubitemsSidebarProps {
  serverId: string;
}

import { ScrollArea } from "@/components/ui/scroll-area";
import { SubitemChannelMenu } from "./subitem-channel-menu";
// Components
import { SubitemTopMenu } from "./subitem-top-menu";
import { SubitemMemberMenu } from "./subitem-member-menu";

export const SubitemsSidebar = ({ serverId }: SubitemsSidebarProps) => {
  return (
    <div className="flex h-full flex-col bg-[#F7F7F8]">
      <SubitemTopMenu serverId={serverId} />
      <ScrollArea className="flex-1">
        <SubitemChannelMenu serverId={serverId} />
        <SubitemMemberMenu serverId={serverId} />
      </ScrollArea>
    </div>
  );
};
