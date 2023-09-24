import { Col, Container, Row, Stack } from "react-bootstrap";
import QuestionsList from "../components/QuestionList";
import SearchForm from "../components/SearchForm";
import Profile from "../components/Profile";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "react-query";
import { fetchUserQuestions } from "../api/questions";

const ProfilePage = () => {
  const { user } = useAuth();
  if (!user) {
    throw new Error("User not found");
  }

  const { data: questions } = useQuery(["questions", user.id], fetchUserQuestions);

  return (
    <Container as={`section`} className="my-5">
      <Row className="justify-content-center">
        {/* Questions Column */}
        <Col xs={12} md={8} lg={7} className="mb-4 mb-lg-0 order-1 order-lg-0 mw-">
          <Profile user={user} />
          <QuestionsList questions={questions} />
        </Col>

        {/* Search and Popular Questions Column */}
        <Col xs={12} md={8} lg={5} className="order-0 order-lg-1">
          <Stack gap={3} className="sticky-form pb-4">
            <SearchForm title="Search Questions" />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
