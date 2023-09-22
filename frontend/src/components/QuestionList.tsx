import { Stack } from "react-bootstrap";
import Question from "./Question";
import { IQuestion } from "../types/models";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export interface QuestionListProps {
  questions: IQuestion[] | undefined;
}

function QuestionsList({ questions }: QuestionListProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuestionClick = (id: number) => navigate(`/questions/details/${id}`);

  return (
    <Stack gap={4} className="scrollable-questions">
      {questions?.map((question) => (
        <Question
          className="question-item shadow"
          border={`${user?.id === question.user.id && "primary"}`}
          bodyClass="question-text"
          key={question.id}
          question={question}
          onClick={() => handleQuestionClick(question.id)}
        />
      ))}
    </Stack>
  );
}

export default QuestionsList;
