import { Doc } from "@/convex/_generated/dataModel";

export type ServerWithImageUrl = Doc<"servers"> & {
  imageUrl: string | null;
};
