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
import UserInfoModal from "../components/UserInfoModal";
import UserDeleteModal from "../components/UserDeleteModal";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  if (!user) {
    throw new Error("User not found");
  }

  const { data: questions } = useQuery(["questions", user.id], fetchUserQuestions);

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showUserDeleteModal, setShowUserDeleteModal] = useState(false);

  const handleAskQuestion = () => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      setShowQuestionModal(false);
    }

    setShowQuestionModal(true);
  };

  return (
    <>
      <QuestionModal show={showQuestionModal} onHide={() => setShowQuestionModal(false)} size="xl" />
      <UserInfoModal show={showUserInfoModal} onHide={() => setShowUserInfoModal(false)} />
      <UserDeleteModal show={showUserDeleteModal} onHide={() => setShowUserDeleteModal(false)} />

      <Container as={`section`} className="my-5">
        <Row className="justify-content-center">
          {/* Questions Column */}
          <Col md={12} lg={7} className="d-flex flex-column justify-content-center h-100 order-2 order-lg-1">
            <div className="sticky-top bg-body " style={{ paddingTop: "5rem" }}>
              <Button variant="primary" className="w-100 mb-3" onClick={handleAskQuestion}>
                <Plus /> Ask a Question
              </Button>
              <SearchForm title="Search Questions" className="mb-3" />
            </div>
            <QuestionsList gap={3} questions={questions} />
          </Col>

          {/* Profile Column */}
          <Col lg={5} className="order-1 order-lg-2">
            <div className="sticky-top" style={{ paddingTop: "5rem" }}>
              <Profile
                onUpdateInfo={() => setShowUserInfoModal(true)}
                onDelete={() => {
                  setShowUserDeleteModal(true);
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
