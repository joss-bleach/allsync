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
import { ChannelMessages } from "./_components/channel-messages";
import { ChannelMessageInput } from "./_components/channel-message-input";

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
    <section className="flex h-full flex-col px-8 py-6">
      <ChannelHeader name={channel.name} type={channel.channelType} />
      <ChannelMessages name={channel.name} />
      <ChannelMessageInput channel={channel} />
    </section>
  );
};

export default ChannelPage;
