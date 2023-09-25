import React, { useState } from "react";
import { Button, FloatingLabel, Form, InputGroup, Modal, ModalProps, Toast } from "react-bootstrap";
import { useMutation } from "react-query";
import { deleteUser } from "../api/users";
import { useAuth } from "../hooks/useAuth";

interface UserDeleteModalProps extends ModalProps {}

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({ show, onHide }) => {
  const { logout } = useAuth();
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      // Handle success, e.g., show a success message or redirect the user
      setPassword("");
      onHide?.();

      setShowToast(true);
      logout();
    },
    onError: (error) => {
      setError("Something went wrong!");
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setPassword(value);

    setValidated(false);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    await deleteUserMutation.mutateAsync();
  };
  return (
    <>
      {showToast && (
        <Toast
          show={showToast}
          className="z-3 position-fixed bottom-0 start-50 translate-middle"
          delay={2000}
          bg="success"
          autohide
          onClose={() => setShowToast(false)}
        >
          <Toast.Header className="d-flex justify-content-between">Success</Toast.Header>
          <Toast.Body>User deleted successfully</Toast.Body>
        </Toast>
      )}
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete your profile?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <InputGroup>
                <FloatingLabel label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Add password"
                    value={password}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Password is empty</Form.Control.Feedback>
                </FloatingLabel>
                <Button type="submit" variant="primary">
                  Confirm
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
          {error && <div className="alert alert-danger">{error}</div>}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserDeleteModal;
