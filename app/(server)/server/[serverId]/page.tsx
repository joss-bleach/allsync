"use client";
import { redirect } from "next/navigation";

// Convex
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// Components
import { FullPageLoader } from "@/components/shared/full-page-loader";

interface ServerPageProps {
  params: {
    serverId: string;
  };
}

const ServerPage = ({ params }: ServerPageProps) => {
  const generalChannel = useQuery(api.channels.getGeneral, {
    serverId: params.serverId as Id<"servers">,
  });

  if (generalChannel === undefined) {
    return <FullPageLoader />;
  }
  if (!generalChannel || generalChannel === null) {
    return redirect("/");
  }
  return redirect(
    `/server/${generalChannel.serverId}/channel/${generalChannel._id}`,
  );
};

export default ServerPage;
