import React from "react";
import { Card, Stack } from "react-bootstrap";
import { ChatFill } from "react-bootstrap-icons";

interface QuestionProps extends React.HTMLProps<HTMLDivElement> {
  questionId: number;
  title: string;
  text: string;
  username: string;
  createdAt: string;
  bodyClass?: string;
}

function Question({ title, text, username, createdAt, bodyClass, onClick }: QuestionProps) {
  return (
    <Card as="div" className="shadow" onClick={onClick}>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body className={bodyClass}>
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
