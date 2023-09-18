import { Card, ListGroup } from "react-bootstrap";
import { QuestionListProps } from "./QuestionList";

function TopQuestions({ questions }: QuestionListProps) {
  return (
    <Card className="d-none d-lg-block">
      <Card.Header>Top Questions</Card.Header>
      <ListGroup variant="flush">
        {questions.map((question, index) => (
          <ListGroup.Item key={index}>{question.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default TopQuestions;
