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
        <Col xs={12} md={8} lg={7} className="mb-4 mb-lg-0 order-1 order-lg-0 mw-">
          <Question question={question} className="shadow h-100" />
          <Stack className="scrollable-questions my-3">
            {Array.isArray(question.answers) && question.answers.map((answer) => <Answer answer={answer} />)}
          </Stack>
        </Col>

        {/* Search and Popular Questions Column */}
        <Col xs={12} md={8} lg={5} className="order-0 order-lg-1">
          <Stack gap={3} className="sticky-form pb-4">
            <Button variant="primary" className="w-100">
              <Plus /> Answer Question
            </Button>
            <SearchForm title="Search Answers" />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionDetailsPage;
