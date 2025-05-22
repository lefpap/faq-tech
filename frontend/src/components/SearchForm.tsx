import { Accordion, Button, Card, Form, FormProps, InputGroup } from "react-bootstrap";

interface SearchFormProps extends FormProps {
  title: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ title, className }) => {
  return (
    <Accordion className={className}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body className="p-0">
          <Form>
            <Card className="rounded-top-0">
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
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default SearchForm;
