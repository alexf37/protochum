"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const colours = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Indigo",
  "Violet",
];

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt must be at least 1 character.",
  }),
  options: z.array(
    z.string().min(1, {
      message: "Option must be at least 1 character.",
    }),
  ),
  includeOther: z.enum(["yes", "no"]),
});

function McqForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      options: [""],
      includeOther: "no",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid py-2">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Prompt</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What's your favorite color?"
                    className="col-span-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.getValues().options.map((_, i) => (
            <FormField
              key={i}
              control={form.control}
              name={`options.${i}`}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Option {i + 1}</FormLabel>
                  <FormControl>
                    <div className="col-span-3 flex gap-1">
                      <Input
                        placeholder={
                          colours[Math.floor(Math.random() * colours.length)]
                        }
                        className="col-span-8"
                        {...field}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              type="button"
                              className="aspect-square text-red-600"
                            >
                              *
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Require elaboration</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              type="button"
                              className="aspect-square"
                            >
                              –
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove option</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="row-auto grid grid-cols-4 items-center gap-4 pt-2">
            <Button
              variant="outline"
              type="button"
              className="col-span-3 col-start-2 justify-start text-slate-400"
              onClick={() => {
                form.watch("options");
                form.setValue("options", [...form.getValues().options, ""]);
              }}
            >
              + Add option
            </Button>
          </div>
        </div>
        <FormField
          control={form.control}
          name="includeOther"
          render={({ field }) => (
            <FormItem className="row-auto grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right leading-4">
                Include "Other"
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yes">✅ Yes</SelectItem>
                  <SelectItem value="no">❌ No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="pt-4">
          <Button type="submit">Save Question</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function AddQuestionDialog({ children }: React.PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Question</DialogTitle>
          <DialogDescription>
            New questions will be added to the end of the survey. Click save
            when you're done.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="mcq">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="mcq">
              Multiple Choice
            </TabsTrigger>
            <TabsTrigger className="w-full" value="frq">
              Free Response
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mcq" className="space-y-2">
            <McqForm />
          </TabsContent>
          <TabsContent value="frq">
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Prompt
                </Label>
                <Input
                  id="prompt"
                  placeholder="What's your mother's maiden name?"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit">Save Question</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
