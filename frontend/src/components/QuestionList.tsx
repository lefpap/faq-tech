import { Stack } from "react-bootstrap";
import Question, { QuestionProps } from "./Question";

export interface QuestionListProps {
  questions: QuestionProps[];
}

function QuestionsList({ questions }: QuestionListProps) {
  return (
    <Stack gap={4} className="scrollable-questions">
      {questions.map((question) => (
        <Question
          key={question.id}
          id={question.id}
          title={question.title}
          text={question.text}
          user={question.user}
          date={question.date}
        />
      ))}
    </Stack>
  );
}

export default QuestionsList;
