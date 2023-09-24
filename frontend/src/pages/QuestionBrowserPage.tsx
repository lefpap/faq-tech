import { Button, Col, Container, Row } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import TopQuestions from "../components/TopQuestions";
import QuestionsList from "../components/QuestionList";
import { useQuery } from "react-query";
import { fetchQuestions } from "../api/questions";
import QuestionModal from "../components/QuestionModal";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";

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
  const topQuestions = questions?.slice(0, 3);

  return (
    <>
      <QuestionModal show={showModal} onHide={() => setShowModal(false)} size="xl" />

      <Container as={`section`} className="my-5">
        <Row className="justify-content-center">
          {/* Questions Column */}
          <Col xs={12} md={8} lg={7} className="d-flex flex-column justify-content-center h-100">
            <div className="sticky-top bg-body " style={{ paddingTop: "5rem" }}>
              <Button variant="primary" className="w-100 mb-3" onClick={handleAskQuestion}>
                <Plus /> Ask a Question
              </Button>
              <SearchForm title="Search Questions" className="mb-3" />
            </div>
            <QuestionsList questions={questions} gap={3} className="flex-grow-1 overflow-auto" highlightOwned />
          </Col>

          {/* Top Questions Column */}
          <Col md={4} className="d-none d-lg-block">
            <div className="sticky-top" style={{ paddingTop: "5rem" }}>
              <TopQuestions questions={topQuestions} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default QuestionBrowserPage;
