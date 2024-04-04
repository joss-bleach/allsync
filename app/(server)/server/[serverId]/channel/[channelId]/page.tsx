"use client";

import { redirect, useParams } from "next/navigation";

// Convex
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import {
  ChannelHeader,
  ChannelHeaderSkeleton,
} from "./_components/channel-header";

const ChannelPage = () => {
  const params = useParams();

  const channel = useQuery(api.channel.get, {
    channelId: params.channelId as Id<"channels">,
  });

  if (channel === undefined) {
    return (
      <section className="flex h-full flex-col px-8 py-3">
        <ChannelHeaderSkeleton />
      </section>
    );
  }

  if (!channel) {
    return null;
  }

  return (
    <section className="flex h-full flex-col px-8 py-3">
      <ChannelHeader name={channel.name} type={channel.channelType} />
    </section>
  );
};

export default ChannelPage;
