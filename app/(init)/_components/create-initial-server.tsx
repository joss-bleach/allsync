"use client";
import { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Validation
import { createServerFormSchema } from "@/lib/form-schemas";

// Convex
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CreateInitialServer = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createServerFormSchema),
    defaultValues: {
      name: "",
      image: [],
    },
  });

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const create = useMutation(api.server.create);

  const imageRef = form.register("image");
  const handleOnSubmit = async (
    values: z.infer<typeof createServerFormSchema>,
  ) => {
    try {
      console.log(values);
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": values.image[0]!.type },
        body: values.image[0],
      });
      const { storageId } = await result.json();

      const server = await create({
        name: values.name,
        storageId,
      });

      form.reset();
      toast.success(`Successfully created ${values.name}`);
    } catch (err) {
      toast.error("Error creating server. Please try again.");
    }
  };

  if (!isMounted) {
    return null;
  } else {
    return (
      <Dialog defaultOpen={true}>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle className="text-[24px] font-medium text-[#2F3037]">
              Create your first server
            </DialogTitle>
            <DialogDescription className="text-[13px] text-[#5E5F6E]">
              Give your server a personality with a name and an icon. You can
              always change these later.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="gap-6"
              onSubmit={form.handleSubmit(handleOnSubmit)}
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Server image</FormLabel>
                    <Input
                      type="file"
                      {...imageRef}
                      placeholder="Upload an image for your server"
                      className="h-[40px] w-full cursor-pointer rounded-md border-[1px] border-[#D6D6D6] bg-white text-[13px] text-[#2F3037] placeholder:text-[#5E5F6E] focus:bg-[#D6D6D6]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Server name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a name for your server"
                        className="h-[40px] w-full rounded-md border-[1px] border-[#D6D6D6] bg-white text-[13px] text-[#2F3037] placeholder:text-[#5E5F6E] focus:bg-[#D6D6D6]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-6">
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
};
