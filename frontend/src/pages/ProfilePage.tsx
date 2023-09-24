import { Button, Col, Container, Row } from "react-bootstrap";
import QuestionsList from "../components/QuestionList";
import Profile from "../components/Profile";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "react-query";
import { fetchUserQuestions } from "../api/questions";
import { Plus } from "react-bootstrap-icons";
import SearchForm from "../components/SearchForm";
import { useState } from "react";
import QuestionModal from "../components/QuestionModal";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  if (!user) {
    throw new Error("User not found");
  }

  const { data: questions } = useQuery(["questions", user.id], fetchUserQuestions);

  const [showModal, setShowModal] = useState(false);

  const handleAskQuestion = () => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      setShowModal(false);
    }

    setShowModal(true);
  };

  return (
    <>
      <QuestionModal show={showModal} onHide={() => setShowModal(false)} size="xl" />
      <Container as={`section`} className="my-5">
        <Row className="justify-content-center">
          {/* Questions Column */}
          <Col md={12} lg={7} className="d-flex flex-column justify-content-center h-100">
            <div className="sticky-top bg-body " style={{ paddingTop: "5rem" }}>
              <Button variant="primary" className="w-100 mb-3" onClick={handleAskQuestion}>
                <Plus /> Ask a Question
              </Button>
              <SearchForm title="Search Answers" className="mb-3" />
            </div>
            <QuestionsList gap={3} questions={questions} />
          </Col>

          {/* Top Questions Column */}
          <Col lg={5}>
            <div className="sticky-top" style={{ paddingTop: "5rem" }}>
              <Profile user={user} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
