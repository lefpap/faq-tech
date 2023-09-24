import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchQuestionWithId } from "../api/questions";
import { IQuestion } from "../types/models";
import Question from "../components/Question";
import SearchForm from "../components/SearchForm";
import Answer from "../components/Answer";

const QuestionDetailsPage = () => {
  const { id } = useParams();

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
    <Container as={`section`} className="my-5">
      <Row className="justify-content-center">
        {/* Questions Column */}
        <Col md={12} lg={7} className="d-flex flex-column justify-content-center h-100">
          <div className="sticky-top" style={{ paddingTop: "5rem" }}>
            <Question question={question} className="h-100" />
          </div>
        </Col>

        {/* Top Questions Column */}
        <Col lg={5}>
          <div className="sticky-top bg-body " style={{ paddingTop: "5rem" }}>
            <Button variant="primary" className="w-100 mb-3">
              <Plus /> Answer the Question
            </Button>
            <SearchForm title="Search Answers" className="mb-3" />
          </div>
          <Stack className="scrollable-questions my-3">
            {Array.isArray(question.answers) &&
              question.answers.map((answer) => <Answer key={answer.id} answer={answer} />)}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionDetailsPage;
