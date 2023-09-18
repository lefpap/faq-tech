import { Button, Card, Form, InputGroup } from "react-bootstrap";

function QuestionSearch() {
  return (
    <Form>
      <Card>
        <Card.Header>Search Questions</Card.Header>
        <Card.Body>
          <Form.Group className="mb-2" controlId="searchText">
            <Form.Control type="text" placeholder="Text..." />
          </Form.Group>
          <Form.Group className="mb-2" controlId="searchUser">
            <Form.Control type="text" placeholder="Username..." />
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <InputGroup.Text>From</InputGroup.Text>
              <Form.Control type="date" placeholder="From" />
              <InputGroup.Text>To</InputGroup.Text>
              <Form.Control type="date" placeholder="To" />
            </InputGroup>
          </Form.Group>
        </Card.Body>
        <Card.Footer>
          <Button variant="outline-secondary" type="submit" className="w-100">
            Search
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  );
}

export default QuestionSearch;
