"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, SendHorizonal } from "lucide-react";

// Validation
import { channelMessageFormSchema } from "@/lib/form-schemas";

// Components
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Convex
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ChannelMessageInputProps {
  channel: Doc<"channels">;
}

export const ChannelMessageInput = ({ channel }: ChannelMessageInputProps) => {
  const create = useMutation(api.message.create);

  const form = useForm({
    resolver: zodResolver(channelMessageFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleOnSubmit = async (
    values: z.infer<typeof channelMessageFormSchema>,
  ) => {
    try {
      form.reset();
    } catch (err) {
      toast.error("Error creating server. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <div className="relative w-full">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">
                  Send a message to the channel
                </FormLabel>
                <Input
                  type="text"
                  {...field}
                  placeholder={`Message #${channel.name}`}
                  className="h-[40px] w-full rounded-md border-[1px] border-[#D6D6D6] bg-white text-[13px] text-[#2F3037] placeholder:text-[#5E5F6E] focus:bg-[#D6D6D6]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormItem>
            )}
          />
          <Button className="absolute right-1 top-0" variant="link">
            {form.formState.isSubmitting ? (
              <Loader2 size={16} className="animate-spin text-[#5E5F6E]/30" />
            ) : (
              <SendHorizonal size={16} className="text-[#5E5F6E]" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
