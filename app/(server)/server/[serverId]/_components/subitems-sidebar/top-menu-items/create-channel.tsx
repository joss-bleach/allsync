"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateChannelProps {
  serverId: Id<"servers">;
}

// Validation
import { ChannelType, createChannelFormSchema } from "@/lib/form-schemas";

// Convex
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CreateChannel = ({ serverId }: CreateChannelProps) => {
  const form = useForm({
    resolver: zodResolver(createChannelFormSchema),
    defaultValues: {
      name: "",
      channelType: ChannelType.Text,
    },
  });

  const create = useMutation(api.channel.create);
  const router = useRouter();

  const handleOnSubmit = async (
    values: z.infer<typeof createChannelFormSchema>,
  ) => {
    try {
      const channel = await create({
        serverId,
        name: values.name,
        channelType: values.channelType,
      });

      form.reset();
      router.push(`/server/${serverId}/channel/${channel}`);
      toast.success(`Successfully created ${values.name}`);
    } catch {
      toast.error("Error creating channel. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Subitem>
          <span className="flex flex-row items-center justify-between">
            <Plus size={16} className="mr-2" />
            Create channel
          </span>
        </Subitem>
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
          <form className="gap-6" onSubmit={form.handleSubmit(handleOnSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Channel name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a name for your channel"
                      className="h-[40px] w-full rounded-md border-[1px] border-[#D6D6D6] bg-white text-[13px] text-[#2F3037] placeholder:text-[#5E5F6E] focus:bg-[#D6D6D6]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="channelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Channel type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-[40px] w-full rounded-md border-[1px] border-[#D6D6D6] bg-white text-[13px] text-[#2F3037] placeholder:text-[#5E5F6E] focus:bg-[#D6D6D6]/10 focus-visible:ring-0 focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select a channel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ChannelType.Text}>Text</SelectItem>
                      <SelectItem value={ChannelType.Audio}>Audio</SelectItem>
                      <SelectItem value={ChannelType.Video}>Video</SelectItem>
                    </SelectContent>
                  </Select>
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
  );
};
