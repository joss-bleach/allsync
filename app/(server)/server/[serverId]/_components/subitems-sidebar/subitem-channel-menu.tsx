"use client";

interface SubitemChannelMenuProps {
  serverId: string;
}

// Hooks
import { useParams } from "next/navigation";

// Convex
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import { Hash, Lock, Mic, Plus, Webcam } from "lucide-react";
import { Subitem } from "./subitem";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";

export const SubitemChannelMenu = ({ serverId }: SubitemChannelMenuProps) => {
  const channels: Doc<"channels">[] | undefined | [] = useQuery(
    api.channels.getByServer,
    {
      serverId: serverId as Id<"servers">,
    },
  );

  const params = useParams();
  console.log(params);

  if (channels === undefined) {
    return (
      <ul className="flex w-full flex-col space-y-2 px-3 pt-6">
        <li className="w-full">
          <Skeleton className="h-[35px] w-full rounded-md bg-black/5" />
        </li>
        <li className="w-full">
          <Skeleton className="h-[35px] w-full rounded-md bg-black/5" />
        </li>
        <li className="w-full">
          <Skeleton className="h-[35px] w-full rounded-md bg-black/5" />
        </li>
        <li className="w-full">
          <Skeleton className="h-[35px] w-full rounded-md bg-black/5" />
        </li>
      </ul>
    );
  }

  if (!channels || channels.length < 0) {
    return redirect("/");
  }

  const textChannels = channels.filter(
    (channel) => channel.channelType === "text",
  );
  const audioChannels = channels.filter(
    (channel) => channel.channelType === "audio",
  );
  const videoChannels = channels.filter(
    (channel) => channel.channelType === "video",
  );

  return (
    <>
      <ul className="w-full px-3 pt-6">
        <li className="flex flex-row justify-between px-4 pb-1 text-[12px] font-semibold text-[#5E5F6E]">
          Text Channels
          <Plus size={16} />
        </li>
        {textChannels.map((channel) => {
          return (
            <Subitem
              key={channel._id}
              isActive={params.channelId === channel._id}
            >
              <span className="flex flex-1 flex-row items-center justify-between">
                <span className="flex flex-row items-center">
                  <Hash size={16} className="mr-2" />
                  {channel.name}
                </span>
              </span>
              {channel.name === "general" && <Lock size={16} />}
            </Subitem>
          );
        })}
      </ul>
      {audioChannels.length > 0 && (
        <ul className="w-full px-3 pt-6">
          <li className="flex flex-row justify-between px-4 pb-1 text-[12px] font-semibold text-[#5E5F6E]">
            Audio Channels
            <Plus size={16} />
          </li>
          {audioChannels.map((channel) => {
            return (
              <Subitem
                key={channel._id}
                isActive={params.channelId === channel._id}
              >
                <span className="flex flex-1 flex-row items-center justify-between">
                  <span className="flex flex-row items-center">
                    <Mic size={16} className="mr-2" />
                    {channel.name}
                  </span>
                </span>
                {channel.name === "general" && <Lock size={16} />}
              </Subitem>
            );
          })}
        </ul>
      )}
      {videoChannels.length > 0 && (
        <ul className="w-full px-3 pt-6">
          <li className="flex flex-row justify-between px-4 pb-1 text-[12px] font-semibold text-[#5E5F6E]">
            Video Channels
            <Plus size={16} />
          </li>
          {videoChannels.map((channel) => {
            return (
              <Subitem
                key={channel._id}
                isActive={params.channelId === channel._id}
              >
                <span className="flex flex-1 flex-row items-center justify-between">
                  <span className="flex flex-row items-center">
                    <Webcam size={16} className="mr-2" />
                    {channel.name}
                  </span>
                </span>
                {channel.name === "general" && <Lock size={16} />}
              </Subitem>
            );
          })}
        </ul>
      )}
    </>
  );
};
