import { useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [simplePushKey, setSimplePushKey] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  // Login from auth hook
  const { register } = useAuth();

  // Location and navigate
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    switch (inputName) {
      case "username":
        setUsername(inputValue);
        break;
      case "password":
        setPassword(inputValue);
        break;
      case "firstname":
        setFirstname(inputValue);
        break;
      case "lastname":
        setLastname(inputValue);
        break;
      case "email":
        setEmail(inputValue);
        break;
      case "simplePushKey":
        setSimplePushKey(inputValue);
        break;
      default:
        throw Error(`Wrong input name ${inputName}`);
    }

    setValidated(false);
    setError(null);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    console.log({ username, password, firstname, lastname, email, simplePushKey });

    try {
      await register({ credentials: { username, password }, firstname, lastname, email, simplePushKey });
      const from = location.state?.from || "/";
      navigate(from);
    } catch (error) {
      setError("Something went wrong!");
    }

    setUsername("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setEmail("");
    setSimplePushKey("");
  };

  return (
    <Container fluid="lg" className="vh-100 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={12} md={10} lg={10} xl={8} xxl={8}>
        <Card className="w-100">
          <Card.Body>
            <Card.Title className="text-center">
              <Link to={"/"} className="btn btn-text fs-2">
                FaqTech.
              </Link>
            </Card.Title>
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Form.Group className="mb-3" as={Col} md={12} lg={6} controlId="formUsername">
                  <FloatingLabel label="Username">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={username}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Username is empty</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={12} lg={6} controlId="formPassword">
                  <FloatingLabel label="Password">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Password is empty</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" as={Col} xs={12} controlId="formFirstname">
                  <FloatingLabel label="First Name">
                    <Form.Control
                      type="text"
                      name="firstname"
                      placeholder="Enter firstname"
                      value={firstname}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">First Name is empty</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" as={Col} xs={12} controlId="formLastname">
                  <FloatingLabel label="Last Name">
                    <Form.Control
                      type="text"
                      name="lastname"
                      placeholder="Enter lastname"
                      value={lastname}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Lastname is empty</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col} md={12} lg={6} controlId="formEmail">
                  <FloatingLabel label="Email">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Email is empty or have invalid format</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={12} lg={6} controlId="formSimplePushKey">
                  <FloatingLabel label="SimplePush Key">
                    <Form.Control
                      type="text"
                      name="simplePushKey"
                      placeholder="Enter simplepushkey"
                      value={simplePushKey}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Form.Text>
                You already have an account? <Link to={"/login"}>Login</Link>
              </Form.Text>
              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default RegisterPage;
