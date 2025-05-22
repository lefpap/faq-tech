import { Card, CardProps, ListGroup } from "react-bootstrap";
import { useQuery } from "react-query";
import { fetchTopQuestions } from "../api/questions";
import { Link } from "react-router-dom";
import { useState } from "react";

interface TopQuestionsProps extends CardProps {
  limit: number;
}

function TopQuestions({ limit }: TopQuestionsProps) {
  const { data: questions } = useQuery(["questions", "top", limit], fetchTopQuestions);

  // State to track which item is being hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Card className="d-none d-lg-block">
      <Card.Header>Top Questions</Card.Header>
      <ListGroup variant="flush">
        {questions?.map((question, index) => (
          <ListGroup.Item
            key={index}
            as={Link}
            to={`/questions/details/${question.id}`}
            active={index === hoveredIndex}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {question.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default TopQuestions;
