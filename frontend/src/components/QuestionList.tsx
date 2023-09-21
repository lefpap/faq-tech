import { Stack } from "react-bootstrap";
import Question from "./Question";
import { IQuestion } from "../types/models";
import { useNavigate } from "react-router-dom";

export interface QuestionListProps {
  questions: IQuestion[] | undefined;
}

function QuestionsList({ questions }: QuestionListProps) {
  const navigate = useNavigate();

  const handleQuestionClick = (id: number) => navigate(`/questions/details/${id}`);

  return (
    <Stack gap={4} className="scrollable-questions">
      {questions?.map((question) => (
        <Question
          bodyClass="question-text"
          key={question.id}
          questionId={question.id}
          title={question.title}
          text={question.text}
          username={question.user.username}
          createdAt={question.createdAt}
          onClick={() => handleQuestionClick(question.id)}
        />
      ))}
    </Stack>
  );
}

export default QuestionsList;
