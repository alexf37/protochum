"use client";

import { createContext, useState } from "react";

type SurveyContextType = {
  currentQuestion: number;
  setCurrentQuestion?: (index: number) => void;
  email: string;
  setEmail?: (email: string) => void;
};

const SurveyContext = createContext<SurveyContextType>({
  currentQuestion: 0,
  email: "",
});

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [email, setEmail] = useState("");
  return (
    <div className="flex max-w-96 flex-col gap-2 rounded-2xl bg-white p-8 text-black shadow-md">
      <SurveyContext.Provider
        value={{ currentQuestion, setCurrentQuestion, email, setEmail }}
      >
        {children}
      </SurveyContext.Provider>
    </div>
  );
}
