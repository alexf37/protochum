import { Button } from "@/components/ui/button";

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
import { AddQuestionDialog } from "./AddQuestionDialog";

import { api } from "@/trpc/server";
import React from "react";
import { getServerAuthSession } from "@/server/auth";
import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";
import { DeleteQuestionButton } from "./DeleteQuestionButton";

function LoginCard() {
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

function NotAuthorizedCard() {
  return (
    <Card className="max-w-sm p-6">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold tracking-wide">
          Not Authorized
        </CardTitle>
        <CardDescription className="text-center">
          Make sure to log in with your company Google account. If not given a
          choice, clear your cookies or try another browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center gap-2">
        <Link href={"/"} passHref>
          <Button>Home</Button>
        </Link>
        <LogoutButton variant={"destructive"} />
      </CardContent>
    </Card>
  );
}

export default async function Admin() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    return <LoginCard />;
  }
  if (!session.user.email?.endsWith("@sinandex.com")) {
    return <NotAuthorizedCard />;
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
              <TableHead>Index</TableHead>
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
                  <TableCell className="font-medium">{"N/A"}</TableCell>
                  <TableCell>{q.type.toLocaleUpperCase()}</TableCell>
                  <TableCell>{q.content}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button>Edit</Button>
                    <DeleteQuestionButton questionId={q.id} />
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
