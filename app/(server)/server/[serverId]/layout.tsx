"use client";

// Convex
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ServerLayoutProps {
  children: React.ReactNode;
}

const ServerLayout = ({ children }: ServerLayoutProps) => {
  const servers = useQuery(api.servers.get);
  return (
    <>
      <aside className="fixed h-full w-[75px]">SB</aside>
      <main className="pl-[75px]">{children}</main>
    </>
  );
};

export default ServerLayout;
