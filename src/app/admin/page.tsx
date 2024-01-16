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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/LoginForm";

import { api } from "@/trpc/server";
import React from "react";
import { getServerAuthSession } from "@/server/auth";
import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";

const colours = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Indigo",
  "Violet",
];

function AddQuestionDialog({ children }: React.PropsWithChildren) {
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
                  placeholder={
                    colours[Math.floor(Math.random() * colours.length)]
                  }
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
              <Button type="submit">Save Question</Button>
            </DialogFooter>
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

export default async function Admin() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    return (
      <Card className="max-w-sm p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold tracking-wide">
            Administrator Login
          </CardTitle>
          <CardDescription className="text-center">
            You must be a Chum administrator to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <LoginForm />
        </CardContent>
      </Card>
    );
  }
  if (!session.user.email?.endsWith("@sinandex.com")) {
    return (
      <div className="flex flex-col items-center gap-2 text-foreground">
        <p>Not authorized</p>
        <Link href={"/"} passHref>
          <Button variant={"outline"} className="text-foreground">
            Home
          </Button>
        </Link>
        <LogoutButton />
      </div>
    );
  }
  const questions = await api.survey.getQuestions.query();
  return (
    <>
      <div className="flex w-full max-w-screen-md flex-col gap-2 rounded-2xl bg-white p-8 text-black shadow-md">
        <h1 className="text-3xl font-bold">Admin Controls</h1>
        <p className="pb-2 font-sans text-slate-600">
          View, add, and edit questions.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Index</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Question</TableHead>
              <TableHead className="text-right">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.length === 0 ? (
              <div className="flex flex-col gap-2">
                <div className="grid place-content-center">
                  <p className="text-slate-600">
                    You haven't added any questions yet!
                  </p>
                </div>
              </div>
            ) : (
              questions.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-medium">{q.index}</TableCell>
                  <TableCell>{q.type.toLocaleUpperCase()}</TableCell>
                  <TableCell>{q.content}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button>Edit</Button>
                    <Button variant="destructive">Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex justify-center gap-4 pt-2">
          <AddQuestionDialog>
            <Button>+ Add Question</Button>
          </AddQuestionDialog>
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
