import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button, Card, Col, Container, FloatingLabel, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  // Form elements
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  // Login from auth hook
  const { login } = useAuth();

  // Location and navigate
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.type === "text") {
      setUsername(value);
    } else {
      setPassword(value);
    }
    setValidated(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    try {
      await login({ username, password });
      const from = location.state?.from || "/";
      navigate(from);
    } catch (error) {
      setError("Access Denied!");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <Container fluid="lg" className="vh-100 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={12} md={10} lg={10} xl={6} xxl={6}>
        <Card className="w-100">
          <Card.Body>
            <Card.Title className="text-center">
              <Link to={"/"} className="btn btn-text fs-2">
                FaqTech.
              </Link>
            </Card.Title>
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <FloatingLabel label="Username  ">
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Username is empty</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <FloatingLabel label="Password  ">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Password is empty</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Text>
                You don't have an account? <Link to={"/register"}>Register</Link>
              </Form.Text>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default LoginPage;
