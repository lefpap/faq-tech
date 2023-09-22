import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import SearchForm from "../components/SearchForm";
import TopQuestions from "../components/TopQuestions";
import QuestionsList from "../components/QuestionList";
import { useQuery } from "react-query";
import { fetchQuestions } from "../api/questions";

function QuestionBrowserPage() {
  const { data: questions, isLoading, isError } = useQuery("questions", fetchQuestions);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // For top questions, shuffle and take the first 3
  const shuffled = questions?.sort(() => 0.5 - Math.random());
  const topQuestions = shuffled?.slice(0, 3);

  return (
    <Container as={`section`} className="my-5">
      <Row className="justify-content-center">
        {/* Questions Column */}
        <Col xs={12} md={8} lg={7} className="mb-4 mb-lg-0 order-1 order-lg-0 mw-">
          <QuestionsList questions={questions} />
        </Col>

        {/* Search and Popular Questions Column */}
        <Col xs={12} md={8} lg={5} className="order-0 order-lg-1">
          <Stack gap={3} className="sticky-form pb-4">
            <Button variant="primary" className="w-100">
              <Plus /> Ask a Question
            </Button>
            <SearchForm title="Search Questions" />
            <TopQuestions questions={topQuestions} />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default QuestionBrowserPage;
