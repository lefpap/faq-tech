import { Card, CardProps, Stack } from "react-bootstrap";
import { ChatFill } from "react-bootstrap-icons";
import { IQuestion } from "../types/models";
import { formatDate } from "../utils/helper";

interface QuestionProps extends CardProps {
  question: IQuestion;
  bodyClass?: string;
}

function Question({ question, bodyClass, onClick, className, border, style }: QuestionProps) {
  const answerCount = Array.isArray(question.answers) ? question.answers.length : question.answers;

  return (
    <Card className={className} border={border} style={style} onClick={onClick}>
      <Card.Header>
        <Card.Title>{question.title}</Card.Title>
      </Card.Header>
      <Card.Body className={bodyClass}>
        <Card.Text className="text-wrap">{question.text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal" className="justify-content-between">
          <Stack>
            <Card.Title>{question.user.username}</Card.Title>
            <Card.Subtitle className="text-body-secondary">{formatDate(question.createdAt)}</Card.Subtitle>
          </Stack>
          <Stack direction="horizontal" gap={2} className="align-items-strech">
            <span>{answerCount}</span>
            <ChatFill />
          </Stack>
        </Stack>
      </Card.Footer>
    </Card>
  );
}

export default Question;
