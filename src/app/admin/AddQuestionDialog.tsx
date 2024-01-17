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
  includeOther: z.boolean(),
});

function McqForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="grid gap-4 py-2">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Prompt
          </Label>
          <Input
            id="prompt"
            placeholder="What's your favorite color?"
            className="col-span-3"
          />
        </div>
        <div className="row-auto grid grid-cols-4 items-center gap-4">
          <Label htmlFor="option" className="text-right">
            Option 1
          </Label>
          <Input
            id="option"
            placeholder={colours[Math.floor(Math.random() * colours.length)]}
            className="col-span-3"
          />
        </div>

        <div className="row-auto grid grid-cols-4 items-center gap-4">
          <Button
            variant="outline"
            type="button"
            className="col-span-3 col-start-2 justify-start text-slate-400"
          >
            + Add option
          </Button>
        </div>
      </div>
      <div className="row-auto grid grid-cols-4 items-center gap-4">
        <Label htmlFor="other" className="text-right leading-4">
          Include "Other"
        </Label>
        <Select>
          <SelectTrigger className="col-span-3">
            <SelectValue defaultValue={"no"} placeholder="❌ No (default)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">✅ Yes</SelectItem>
            <SelectItem value="no">❌ No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter className="pt-4">
        <Button type="submit">Save Question</Button>
      </DialogFooter>
    </form>
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
