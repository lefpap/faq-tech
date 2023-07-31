import React from "react";
import { Card } from "react-bootstrap";
import { CaretUpFill, CaretDownFill, ChatFill } from "react-bootstrap-icons";

interface QuestionProps {
  title: string;
  body: string;
  user: string;
  date: string;
}

function Question({ title, body, user, date }: QuestionProps) {
  return (
    <Card className="shadow">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title>{title}</Card.Title>
        <VoteArrows />
      </Card.Header>
      <Card.Body>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <span>{user}</span>
            <span>{date}</span>
          </div>
          <ChatFill />
        </div>
      </Card.Footer>
    </Card>
  );
}

function VoteArrows() {
  return (
    <div className="d-flex align-items-center gap-3">
      <span>100</span>

      <div className="d-flex flex-column">
        <CaretUpFill />
        <CaretDownFill />
      </div>
    </div>
  );
}

export default Question;
