"use client";
import { useState } from "react";
import { RefreshCcw, UserRoundPlus } from "lucide-react";
import { toast } from "sonner";

interface InviteToServerProps {
  serverId: Id<"servers">;
}

// Convex
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Subitem } from "../subitem";

export const InviteToServer = ({ serverId }: InviteToServerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const generateNewCode = useMutation(api.server.generateInviteCode);
  const server = useQuery(api.server.get, {
    serverId: serverId as Id<"servers">,
  });
  if (!server) {
    return null;
  }

  const inviteUrl = `${window.location.origin}/invite/${server.inviteCode}`;

  const handleGenerateInviteLink = () => {
    setIsLoading(true);
    generateNewCode({ serverId: server._id });
    setIsLoading(false);
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    toast.success("Copied invite URL.");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Subitem>
          <span className="flex flex-row items-center justify-between">
            <UserRoundPlus size={16} className="mr-2" />
            Invite people
          </span>
        </Subitem>
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-medium text-[#2F3037]">
            Invite your friends
          </DialogTitle>
          <DialogDescription className="text-[13px] text-[#5E5F6E]">
            Copy the invite link below and send it to your friends to invite
            them into your server.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center gap-2">
          <Input
            placeholder="Invite code"
            value={isLoading ? "Creating new link..." : inviteUrl}
            readOnly
            className="h-[40px] w-full rounded-md border-[1px] border-[#D6D6D6] bg-white text-[13px] text-[#2F3037] placeholder:text-[#5E5F6E] focus:bg-[#D6D6D6]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="button"
            variant="primary-teal"
            aria-label="Generate a new invite link"
            className="group"
            onClick={handleGenerateInviteLink}
          >
            <RefreshCcw
              size={18}
              className="transition-all group-hover:rotate-45"
            />
          </Button>
        </div>
        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Close
            </Button>
          </DialogClose>
          <Button
            aria-label="Copy invite URL"
            onClick={handleCopyInviteLink}
            variant="primary-teal"
            type="button"
          >
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
