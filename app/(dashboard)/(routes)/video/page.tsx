"use client";

import Heading from "@/components/Heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FileAudio, Music } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";
import { Empty } from "@/components/Empty";
import toast from "react-hot-toast";
import { useProModal } from "@/hooks/useProModal";

type Props = {};

export default function ConversationPage({}: Props) {
  const [video, setVideo] = useState<string>("");
  const router = useRouter();
  const proModal = useProModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo("");
      const response = await axios.post("/api/v1/video", values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <main>
      <Heading
        title="Video Generation"
        description="Turn your prompt into video."
        icon={FileAudio}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <main className="px-4 mt-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="p-0 m-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isSubmitting}
                      placeholder="How do I calculate the radius of a circle?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="w-full col-span-12 lg:col-span-2"
              type="submit"
              disabled={isSubmitting}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
        <section className="mt-4 space-y-4">
          {isSubmitting && (
            <div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
              <Loader />
            </div>
          )}
          {!video && !isSubmitting && <Empty label="No video generated." />}
          {video && (
            <video
              controls
              className="w-full mt-8 bg-black border rounded-lg aspect-video"
            >
              <source src={video} />
            </video>
          )}
        </section>
      </main>
    </main>
  );
}
