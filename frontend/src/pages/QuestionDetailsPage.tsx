import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchQuestionWithId } from "../api/questions";
import { IQuestion } from "../types/models";
import Question from "../components/Question";
import SearchForm from "../components/SearchForm";
import Answer from "../components/Answer";
import AnswerModal from "../components/AnswerModal";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const QuestionDetailsPage = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const {
    data: question,
    isLoading,
    isError,
    error,
  } = useQuery<IQuestion, Error>(["questions", id], fetchQuestionWithId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !question) {
    return <div>{error?.message}</div>;
  }

  return (
    <>
      <AnswerModal question={question} show={showModal} onHide={() => setShowModal(false)} size="xl" />
      <Container as={`section`} className="my-5">
        <Row className="justify-content-center">
          {/* Top Questions Column */}
          <Col lg={10}>
            <div className="sticky-top bg-body " style={{ paddingTop: "5rem" }}>
              <Question question={question} className="mb-3 h-100" />
              <Button variant="primary" className="w-100 mb-3" onClick={() => setShowModal(true)}>
                <Plus /> Answer the Question
              </Button>
              <SearchForm title="Search Answers" className="mb-3" />
            </div>
            <Stack className="scrollable-questions my-3" gap={3}>
              {Array.isArray(question.answers) &&
                question.answers.map((answer) => (
                  <Answer
                    key={answer.id}
                    id={`answer-${answer.id}`}
                    answer={answer}
                    border={`${answer.user.id === user?.id && "primary"}`}
                  />
                ))}
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default QuestionDetailsPage;
