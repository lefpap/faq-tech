import React, { useState } from "react";
import { Button, FloatingLabel, Modal, ModalProps, Toast } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

interface CredentialsModalProps extends ModalProps {}

const CredentialsModal: React.FC<CredentialsModalProps> = ({ show, onHide }) => {
  //   const queryClient = useQueryClient();
  const { user } = useAuth();
  const [alert, setAlert] = useState(false);

  // Form elements
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { credentialsChange } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "currentPassword":
        setCurrentPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "newUsername":
        setNewUsername(value);
        break;
      case "newEmail":
        setNewEmail(value);
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

    try {
      credentialsChange({
        currentPassword,
        newPassword,
        newUsername,
        newEmail,
      });

      // display a success alert to the user
      setAlert(true);

      // hide modal
      onHide?.();

      // clear inputs
      setCurrentPassword("");
      setNewPassword("");
      setNewUsername("");
      setNewEmail("");
    } catch (error) {
      setError("Error changing credentials");
    }
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
          <Toast.Body>Credentials have been changed successfully</Toast.Body>
        </Toast>
      )}
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Change Credentials</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="currentPassword" label="Current Password">
                <Form.Control
                  type="password"
                  placeholder="Write password here"
                  value={currentPassword}
                  onChange={handleInputChange}
                  name="currentPassword"
                  required
                />
                <Form.Control.Feedback type="invalid">Current password is empty</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="newPassword" label="New Password">
                <Form.Control
                  type="password"
                  placeholder="Write password here"
                  value={newPassword}
                  onChange={handleInputChange}
                  name="newPassword"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="newUsername" label="New Username">
                <Form.Control
                  placeholder="Write username here"
                  value={newUsername}
                  onChange={handleInputChange}
                  name="newUsername"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="newEmail" label="New Email">
                <Form.Control
                  placeholder="Write email here"
                  value={newEmail}
                  onChange={handleInputChange}
                  name="newEmail"
                />
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

export default CredentialsModal;
