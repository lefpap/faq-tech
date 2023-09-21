import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";

const QuestionDetailsPage = () => {
  const { id } = useParams();

  return (
    <Container as={`section`} className="my-5">
      <Row className="justify-content-center">
        {/* Questions Column */}
        <Col xs={12} md={8} lg={7} className="mb-4 mb-lg-0 order-1 order-lg-0 mw-">
          <div>Question {id}</div>
        </Col>

        {/* Search and Popular Questions Column */}
        <Col xs={12} md={8} lg={5} className="order-0 order-lg-1">
          <Stack gap={3} className="sticky-form pb-4">
            <Button variant="primary" className="w-100">
              <Plus /> Answer Question
            </Button>
            <div>search here</div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionDetailsPage;
