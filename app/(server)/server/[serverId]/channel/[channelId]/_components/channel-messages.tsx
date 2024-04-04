"use client";
import { ChannelMessageWithUser } from "@/types";

// Convex
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import { ChannelMessage } from "./channel-message";

interface ChannelMessagesProps {
  channel: Doc<"channels">;
}

export const ChannelMessages = ({ channel }: ChannelMessagesProps) => {
  const messages = useQuery(api.messages.getByChannel, {
    channelId: channel._id,
  });
  return (
    <section className="flex h-full flex-1 flex-col justify-end py-4">
      <div className="flex flex-col py-2">
        <h1 className="text-[30px] font-medium text-[#2F3037]">
          Welcome to #{channel.name}
        </h1>
        <p className="text-[13px] text-[#5E5F6E]">
          This is the start of the #{channel.name} channel. Drop a message and
          say hello!
        </p>
      </div>
      <section>
        {!messages || messages.length < 0 ? null : (
          <div>
            {messages.map((message) => {
              return (
                <ChannelMessage
                  message={message as ChannelMessageWithUser}
                  key={message._id}
                />
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
};
