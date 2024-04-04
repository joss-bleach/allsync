"use client";

// Convex
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import { ServerSidebar } from "./_components/server-sidebar";
import { SubitemsSidebar } from "./_components/subitems-sidebar";

interface ServerLayoutProps {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}

const ServerLayout = ({ children, params }: ServerLayoutProps) => {
  const servers = useQuery(api.servers.get);
  const server = servers?.find((server) => server._id === params.serverId);
  if (!server) {
    return null;
  }
  return (
    <div className="h-full">
      <aside className="fixed flex h-full flex-row">
        <nav className="w-[75px]">
          <ServerSidebar serverId={params.serverId} servers={servers} />
        </nav>
        <div className="w-[250px]">
          <SubitemsSidebar serverId={params.serverId} />
        </div>
      </aside>
      <main className="pl-[325px]">{children}</main>
    </div>
  );
};

export default ServerLayout;
