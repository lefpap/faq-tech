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
