import React, { useState } from "react";
import { Button, FloatingLabel, Modal, ModalProps, Toast } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "react-query";
import { createQuestion } from "../api/questions";

interface QuestionModalProps extends ModalProps {}

const QuestionModal: React.FC<QuestionModalProps> = ({ show, onHide }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState(false);

  // Form elements
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const createQuestionMutation = useMutation(createQuestion, {
    onSuccess: () => {
      // set form elments to default values
      setTitle("");
      setText("");

      // invalidate the queries
      queryClient.invalidateQueries("questions");

      // display a success alert to the user
      setAlert(true);

      // hide modal
      onHide?.();
    },
    onError: (error: Error) => {
      // Handle error
      setError(error.message);
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "text":
        setText(value);
        break;
      default:
        throw new Error("Invalid input name");
    }

    setValidated(false);
    setError(null);
  };

  // Location and navigate
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    if (!event.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    // Call the service using react-query mutation
    createQuestionMutation.mutate({
      title,
      text,
      userId: user.id,
    });
  };

  return (
    <>
      {alert && (
        // <Toast className="z-3 position-absolute top-25 start-50 translate-middle" onClose={() => setAlert(false)}>
        //   <Toast.Body>Question was successfully created!</Toast.Body>
        // </Toast>
        <Toast
          show={alert}
          className="z-3 position-absolute top-25 start-50 translate-middle"
          delay={2000}
          bg="success"
          autohide
          onClose={() => setAlert(false)}
        >
          <Toast.Header className="d-flex justify-content-between">Success</Toast.Header>
          <Toast.Body>Question was successfully created!</Toast.Body>
        </Toast>
      )}
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Ask Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="title" label="Title">
                <Form.Control
                  type="text"
                  placeholder="Write title here"
                  value={title}
                  onChange={handleInputChange}
                  name="title"
                  required
                />
                <Form.Control.Feedback type="invalid">Title is empty</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="text" label="Text">
                <Form.Control
                  as="textarea"
                  placeholder="Write some text here"
                  style={{ height: "15rem" }}
                  value={text}
                  onChange={handleInputChange}
                  name="text"
                  required
                />
                <Form.Control.Feedback type="invalid">Text is empty</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default QuestionModal;
