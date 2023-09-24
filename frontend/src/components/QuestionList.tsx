import { Stack, StackProps } from "react-bootstrap";
import Question from "./Question";
import { IQuestion } from "../types/models";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export interface QuestionListProps extends StackProps {
  questions: IQuestion[] | undefined;
  highlightOwned?: boolean | false;
}

function QuestionsList({ questions, highlightOwned, className, gap }: QuestionListProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuestionClick = (id: number) => navigate(`/questions/details/${id}`);

  return (
    <Stack gap={gap} className={className}>
      {questions?.map((question) => (
        <Question
          key={question.id}
          className="question-item shadow"
          bodyClass="question-text"
          border={`${highlightOwned && user?.id === question.user.id && "primary"}`}
          question={question}
          onClick={() => handleQuestionClick(question.id)}
        />
      ))}
    </Stack>
  );
}

export default QuestionsList;
