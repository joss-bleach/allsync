"use client";

// Convex
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import { ServerSidebar } from "./_components/server-sidebar";
import { SubitemsSidebar } from "./_components/subitems-sidebar";

interface ServerLayoutProps {
  children: React.ReactNode;
}

const ServerLayout = ({ children }: ServerLayoutProps) => {
  const servers = useQuery(api.servers.get);
  return (
    <div className="h-full">
      <aside className="fixed flex h-full flex-row">
        <nav className="w-[75px]">
          <ServerSidebar />
        </nav>
        <div className="w-[250px]">
          <SubitemsSidebar />
        </div>
      </aside>
      <main className="pl-[325px]">{children}</main>
    </div>
  );
};

export default ServerLayout;
