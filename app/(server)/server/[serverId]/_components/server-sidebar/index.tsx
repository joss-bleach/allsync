import { ServerWithImageUrl } from "@/types";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

// Components
import { ServerAvatar } from "./server-avatar";
import { NewServerButton } from "./new-server-button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ServerSidebarProps {
  servers: ServerWithImageUrl[] | undefined | null;
  serverId: string;
}

export const ServerSidebar = ({ servers, serverId }: ServerSidebarProps) => {
  if (servers === undefined) {
    return (
      <div className="flex h-full w-full flex-col items-center border-r-[1px] border-[#E3E3E8]/80 py-3">
        <ul className="flex flex-1 flex-col gap-4">
          <li className="relative flex h-[45px] w-[75px] flex-col items-center justify-center">
            <Skeleton className="h-[45px] w-[45px]" />
          </li>
          <li className="relative flex h-[45px] w-[75px] flex-col items-center justify-center">
            <Skeleton className="h-[45px] w-[45px]" />
          </li>
          <li className="relative flex h-[45px] w-[75px] flex-col items-center justify-center">
            <Skeleton className="h-[45px] w-[45px]" />
          </li>
          <li className="relative flex h-[45px] w-[75px] flex-col items-center justify-center">
            <Skeleton className="h-[45px] w-[45px]" />
          </li>
        </ul>
        <Skeleton className="h-[45px] w-[45px]" />
      </div>
    );
  }
  if (servers === null) {
    return redirect("/");
  }
  return (
    <div className="flex h-full w-full flex-col items-center border-r-[1px] border-[#E3E3E8]/80 py-3">
      <ScrollArea className="flex-1">
        <ul className="flex flex-1 flex-col gap-4">
          {servers.map((server) => {
            const isActive = serverId === server._id;
            return (
              <li
                key={server._id}
                className="relative flex h-[45px] w-[75px] flex-col items-center justify-center"
              >
                <ServerAvatar
                  name={server.name}
                  imageUrl={server.imageUrl}
                  serverId={server._id}
                  isActive={isActive}
                />
                {isActive && (
                  <div className="absolute -right-1 h-[10px] w-[10px] rotate-45 rounded-[2px] border-b-[1px] border-l-[1px] border-[#E3E3E8]/80 bg-[#F7F7F8]" />
                )}
              </li>
            );
          })}
          <li className="relative flex h-[45px] w-[75px] flex-col items-center justify-center">
            <NewServerButton />
          </li>
        </ul>
      </ScrollArea>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-[45px] w-[45px] rounded-md",
          },
        }}
      />
    </div>
  );
};
