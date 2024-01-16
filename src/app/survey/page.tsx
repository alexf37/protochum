"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SurveyContext } from "./layout";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function Survey() {
  const router = useRouter();

  const surveyCtx = useContext(SurveyContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { data, isLoading, isSuccess, isError, error } =
    api.survey.getQuestionByNumber.useQuery(1);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSuccess && data) {
      //this could break if the user navigates away from the page
      // or if for some reason the proper setters arent set on the context provider
      surveyCtx.setEmail(values.email);
      router.push(`/survey/${data.id}`);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold">Survey</h2>
      <p className="pb-2 font-sans text-slate-600">
        Please enter your name and email address to begin.
      </p>
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" asChild>
              <Link href={"/"}>Back</Link>
            </Button>
            <Button disabled={isLoading || isError}>Start</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
