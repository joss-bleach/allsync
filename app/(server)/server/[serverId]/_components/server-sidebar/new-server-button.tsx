"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Validation
import { createServerFormSchema } from "@/lib/form-schemas";

// Convex
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Components
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/shared/tooltip";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const NewServerButton = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

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
      router.push(`/server/${server}`);
      toast.success(`Successfully created ${values.name}`);
    } catch (err) {
      toast.error("Error creating server. Please try again.");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex h-[45px] w-[45px] items-center justify-center rounded-md border-[1px] border-[#D6D6D6] bg-white hover:bg-[#D6D6D6]/10">
          <Tooltip side="right" sideOffset={10} label="New server">
            <Plus size={18} className="text-[#2F3037]" />
          </Tooltip>
        </DialogTrigger>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle className="text-[24px] font-medium text-[#2F3037]">
              Create a server
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-6">
                <Button variant="primary-teal" type="submit">
                  {form.formState.isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
