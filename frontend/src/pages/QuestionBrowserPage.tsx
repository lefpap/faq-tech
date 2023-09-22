import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import SearchForm from "../components/SearchForm";
import TopQuestions from "../components/TopQuestions";
import QuestionsList from "../components/QuestionList";
import { useQuery } from "react-query";
import { fetchQuestions } from "../api/questions";
import QuestionModal from "../components/QuestionModal";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function QuestionBrowserPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleAskQuestion = () => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      setShowModal(false);
      navigate("/login");
    }

    setShowModal(true);
  };

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
    <>
      <QuestionModal show={showModal} onHide={() => setShowModal(false)} size="xl" />

      <Container as={`section`} className="my-5">
        <Row className="justify-content-center">
          {/* Questions Column */}
          <Col xs={12} md={8} lg={7} className="mb-4 mb-lg-0 order-1 order-lg-0 mw-">
            <QuestionsList questions={questions} />
          </Col>

          {/* Search and Popular Questions Column */}
          <Col xs={12} md={8} lg={5} className="order-0 order-lg-1">
            <Stack gap={3} className="sticky-form pb-4">
              <Button variant="primary" className="w-100" onClick={handleAskQuestion}>
                <Plus /> Ask a Question
              </Button>
              <SearchForm title="Search Questions" />
              <TopQuestions questions={topQuestions} />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default QuestionBrowserPage;
