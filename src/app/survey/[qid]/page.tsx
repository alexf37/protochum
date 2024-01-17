"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { useContext, useEffect, useState } from "react";
import { SurveyContext } from "../context";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function SurveyQuestion() {
  const router = useRouter();
  const params = useParams();
  const { email, currentQuestion, setCurrentQuestion } =
    useContext(SurveyContext);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const [elaboration, setElaboration] = useState("");

  const { data, isSuccess, isLoading, isError, error } =
    api.survey.getQuestionById.useQuery(
      {
        id: params.qid as string,
        email,
      },
      {
        enabled: !!email,
      },
    );
  useEffect(() => {
    if (isSuccess && data.response) {
      setAnswer(data.response.answerChoice?.id);
      setElaboration(data.response.textContent ?? "");
    }
  }, [isSuccess, data?.response]);

  if (!email) {
    router.push("/survey");
    return <p>Redirecting...</p>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    console.log(error);
    return <p>Error</p>;
  }
  if (!data) return <p>This question does not exist</p>;

  function onSubmit() {
    if (!!data) {
      if (data.nextQuestion) {
        router.push(`/survey/${data.nextQuestion.id}`);
      } else {
        router.push(`/survey/thanks`);
      }
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  if (data.type === "mcq")
    return (
      <>
        <h2 className="text-2xl font-bold">Question {currentQuestion}</h2>
        <p className="pb-2 font-sans">{data.content}</p>
        <RadioGroup
          onValueChange={(val) => setAnswer(val)}
          value={answer}
          defaultValue={data.response?.answerChoice?.id}
        >
          {data.answerChoices
            ?.sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
            .map((choice) => (
              <div key={choice.id} className="flex items-center gap-2">
                <RadioGroupItem
                  value={choice.id}
                  id={choice.id}
                  className="border-slate-400"
                />
                <Label className="text-base" htmlFor={choice.id}>
                  {choice.content}
                </Label>
              </div>
            ))}
        </RadioGroup>
        {data.answerChoices &&
          answer &&
          data.answerChoices.find((c) => c.id === answer)
            ?.requireElaboration && (
            <div className="space-y-2 pt-2">
              <Label htmlFor="elaboration">Elaborate:</Label>
              <Textarea
                id="elaboration"
                value={elaboration}
                onChange={(e) => setElaboration(e.target.value)}
              />
            </div>
          )}
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Back
          </Button>
          <Button
            type="button"
            disabled={
              !answer ||
              (data?.answerChoices?.find((c) => c.id === answer)
                ?.requireElaboration &&
                !elaboration)
            }
            onClick={() => onSubmit()}
          >
            Next
          </Button>
        </div>
      </>
    );
  else if (data.type === "frq")
    return (
      <>
        <h2 className="text-2xl font-bold">Question {currentQuestion}</h2>
        <p className="pb-2 font-sans">{data.content}</p>
        <Textarea
          id="elaboration"
          value={elaboration}
          onChange={(e) => setElaboration(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Back
          </Button>
          <Button
            type="button"
            disabled={!elaboration}
            onClick={() => onSubmit()}
          >
            Next
          </Button>
        </div>
      </>
    );
}
