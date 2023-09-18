import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import QuestionSearch from "../components/QuestionSearch";
import TopQuestions from "../components/TopQuestions";
import QuestionsList from "../components/QuestionList";

const sampleQuestions = Array.from({ length: 10 }).map(() => ({
  id: Math.random(), // or some other unique value
  title: "Sample Title",
  text: "Sample Text",
  user: "Sample User",
  date: "Sample Date",
}));

const topQuestions = sampleQuestions.sort(() => 0.5 - Math.random()).slice(0, 3);

function HomePage() {
  return (
    <Container as={`section`} className="my-5">
      <Row className="justify-content-center">
        {/* Questions Column */}
        <Col xs={12} md={8} lg={7} className="mb-4 mb-lg-0 order-1 order-lg-0">
          <QuestionsList questions={sampleQuestions} />
        </Col>

        {/* Search and Popular Questions Column */}
        <Col xs={12} md={8} lg={5} className="order-0 order-lg-1">
          <Stack gap={3} className="sticky-form pb-4">
            <Button variant="primary" className="w-100">
              <Plus /> Ask a Question
            </Button>
            <QuestionSearch />
            <TopQuestions questions={topQuestions} />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
