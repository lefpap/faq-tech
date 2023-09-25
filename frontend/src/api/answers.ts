import axios from "./index";

interface ICreateAnswerRequest {
  text: string;
  userId: number;
  questionId: number;
}

export const createAnswer = async (request: ICreateAnswerRequest): Promise<number> => {
  try {
    const response = await axios.post("/answers", request);
    return response.status;
  } catch (error) {
    throw error;
  }
};
