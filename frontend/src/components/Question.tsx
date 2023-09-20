import { Card, Stack } from "react-bootstrap";
import { ChatFill } from "react-bootstrap-icons";

interface QuestionProps {
  id: number;
  title: string;
  text: string;
  username: string;
  createdAt: string;
}

function Question({ title, text, username, createdAt }: QuestionProps) {
  return (
    <Card className="shadow">
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body className="question-text">
        <Card.Text className="text-wrap">{text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal" className="justify-content-between">
          <Stack>
            <Card.Title>{username}</Card.Title>
            <Card.Subtitle className="text-body-secondary">{createdAt}</Card.Subtitle>
          </Stack>
          <Stack direction="horizontal" gap={2} className="align-items-strech">
            <span>132</span> {/* answer count */}
            <ChatFill />
          </Stack>
        </Stack>
      </Card.Footer>
    </Card>
  );
}

export default Question;
