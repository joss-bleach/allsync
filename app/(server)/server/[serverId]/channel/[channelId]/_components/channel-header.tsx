import { Skeleton } from "@/components/ui/skeleton";
import { Hash, Mic, Webcam } from "lucide-react";

interface ChannelHeaderProps {
  name: string;
  type: "text" | "audio" | "video";
}

export const ChannelHeader = ({ name, type }: ChannelHeaderProps) => {
  return (
    <div className="flex w-full rounded-md bg-[#FAFAFB] px-5 py-5">
      <h1 className="flex flex-row items-center gap-2 text-[15px] font-medium text-[#2F3037]">
        {type === "audio" ? (
          <Mic size={16} className="text-[#2F3037]" />
        ) : type === "video" ? (
          <Webcam size={16} className="text-[#2F3037]" />
        ) : (
          <Hash size={16} className="text-[#2F3037]" />
        )}
        {name}
      </h1>
    </div>
  );
};

export const ChannelHeaderSkeleton = () => {
  return <Skeleton className="h-[60px] w-full rounded-md" />;
};
