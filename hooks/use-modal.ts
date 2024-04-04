import { create } from "zustand";

import { Doc, Id } from "@/convex/_generated/dataModel";

export type ModalType = "invite" | "createChannel" | "manageMembers";

interface ModalData {
  server?: Id<"servers"> | Doc<"servers">;
  channelType?: "text" | "audio" | "video";
  channel?: Id<"channels"> | Doc<"channels">;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
