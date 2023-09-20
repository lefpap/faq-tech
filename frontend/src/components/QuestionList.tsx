import { Stack } from "react-bootstrap";
import Question from "./Question";
import { IQuestion } from "../types/models";

export interface QuestionListProps {
  questions: IQuestion[] | undefined;
}

function QuestionsList({ questions }: QuestionListProps) {
  return (
    <Stack gap={4} className="scrollable-questions">
      {questions?.map((question) => (
        <Question
          key={question.id}
          id={question.id}
          title={question.title}
          text={question.text}
          username={question.user.username}
          createdAt={question.createdAt}
        />
      ))}
    </Stack>
  );
}

export default QuestionsList;
