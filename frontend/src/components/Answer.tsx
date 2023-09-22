import React from "react";
import { Card } from "react-bootstrap";
import { IAnswer } from "../types/models";
import { formatDate } from "../utils/helper";

interface AnswerProps {
  answer: IAnswer;
}

const Answer: React.FC<AnswerProps> = ({ answer }) => {
  return (
    <Card as="div" className={`shadow`}>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p> {answer.text} </p>
          <footer className="blockquote-footer">
            {answer.user.username} {formatDate(answer.createdAt)}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default Answer;
