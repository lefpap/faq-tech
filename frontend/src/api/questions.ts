import { QueryFunctionContext } from "react-query";
import { IQuestion } from "../types/models";
import axios from "./index";

export const fetchQuestions = async (): Promise<IQuestion[]> => {
  try {
    const response = await axios.get<IQuestion[]>("/questions");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchQuestionWithId = async ({ queryKey }: QueryFunctionContext): Promise<IQuestion> => {
  const [, id] = queryKey;
  try {
    const response = await axios.get<IQuestion>(`/questions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

type QuestionCreateRequest = {
  title: string;
  text: string;
  userId: number;
};

export const createQuestion = async (request: QuestionCreateRequest): Promise<number> => {
  try {
    const response = await axios.post("/questions", request);
    return response.status;
  } catch (error) {
    throw error;
  }
};
