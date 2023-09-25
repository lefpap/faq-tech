import React, { useState } from "react";
import { Button, FloatingLabel, Modal, ModalProps, Toast } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "react-query";
import { IQuestion } from "../types/models";
import { createAnswer } from "../api/answers";

interface AnswerModalProps extends ModalProps {
  question: IQuestion;
}

const AnswerModal: React.FC<AnswerModalProps> = ({ question, show, onHide }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState(false);

  // Form elements
  const [text, setText] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const createAnswerMutation = useMutation(createAnswer, {
    onSuccess: () => {
      // set form elments to default values
      setText("");

      // invalidate the queries
      queryClient.invalidateQueries(["questions", question.id.toString()]);

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
    createAnswerMutation.mutate({
      text,
      userId: user.id,
      questionId: question.id,
    });
  };

  return (
    <>
      {alert && (
        <Toast
          show={alert}
          className="z-3 position-fixed bottom-0 start-50 translate-middle"
          delay={2000}
          bg="success"
          autohide
          onClose={() => setAlert(false)}
        >
          <Toast.Header className="d-flex justify-content-between">Success</Toast.Header>
          <Toast.Body>Answer was successfully created!</Toast.Body>
        </Toast>
      )}
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Answer Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="text" label="Text">
                <Form.Control
                  as="textarea"
                  placeholder="Write some text here"
                  style={{ height: "20rem" }}
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

export default AnswerModal;
