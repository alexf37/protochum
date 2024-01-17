import { createContext } from "react";

export type SurveyContextType = {
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
  email: string;
  setEmail: (email: string) => void;
};

export const SurveyContext = createContext<SurveyContextType>({
  currentQuestion: 0,
  setCurrentQuestion: () => {
    return;
  },
  email: "",
  setEmail: () => {
    return;
  },
});
