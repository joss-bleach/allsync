import * as z from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createServerFormSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a name for your server",
  }),
  image: z
    .any()
    .refine(
      (files) => files?.length == 1,
      "Please enter an image for your server",
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    ),
});
