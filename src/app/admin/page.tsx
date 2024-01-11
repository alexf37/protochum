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

import { api } from "@/trpc/server";

export default async function Admin() {
  const questions = await api.survey.getQuestions.query();
  return (
    <>
      <div className="flex w-full max-w-screen-md flex-col gap-2 rounded-2xl bg-white p-8 text-black shadow-md">
        <h1 className="text-3xl font-bold">Admin Controls</h1>
        <p className="pb-2 font-sans text-slate-600">
          View, add, and edit questions.
        </p>
        <div className="flex flex-col gap-2">
          {questions.length === 0 ? (
            <div className="grid place-content-center">
              <p className="text-slate-600">
                You haven't added any questions yet!
              </p>
            </div>
          ) : (
            questions.map((q) => (
              <div className="flex items-center gap-2" key={q.id}>
                <p>{q.content}</p>
                <button className="border-slate-400">Edit</button>
                <button className="border-slate-400">Delete</button>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>+ Add Question</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Add Question</DialogTitle>
                <DialogDescription>
                  New questions will be added to the end of the survey. Click
                  save when you're done.
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
                        placeholder="Option"
                        className="col-span-3"
                      />
                    </div>

                    <div className="row-auto grid grid-cols-4 items-center gap-4">
                      <Button
                        variant="outline"
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
                        <SelectValue
                          defaultValue={"no"}
                          placeholder="❌ No (default)"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">✅ Yes</SelectItem>
                        <SelectItem value="no">❌ No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter className="pt-4">
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </TabsContent>
                <TabsContent value="frq">
                  <div className="grid place-content-center p-4">TBD</div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
