import React, { useState } from "react";
import { Button, FloatingLabel, Modal, ModalProps, Toast } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "react-query";
import { updateUserInfo } from "../api/users";

interface UserInfoModalProps extends ModalProps {}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ show, onHide }) => {
  //   const queryClient = useQueryClient();
  const { user } = useAuth();
  const [alert, setAlert] = useState(false);

  // Form elements
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [simplePushKey, setSimplePushkey] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const queryClient = useQueryClient();
  const updateUserInfoMutation = useMutation(updateUserInfo, {
    onSuccess: () => {
      // set form elments to default values
      setFirstname("");
      setLastname("");
      setSimplePushkey("");

      // invalidate the queries
      queryClient.invalidateQueries(["users", "me"]);

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
      case "firstname":
        setFirstname(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "simplePushKey":
        setSimplePushkey(value);
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

    if (firstname.trim() === "" && lastname.trim() === "" && simplePushKey.trim() === "") {
      onHide?.();
      return;
    }

    updateUserInfoMutation.mutate({
      firstname,
      lastname,
      simplePushKey,
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
          <Toast.Body>User Info been changed successfully</Toast.Body>
        </Toast>
      )}
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Update User Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="firstname" label="Firstname">
                <Form.Control
                  type="text"
                  placeholder="Write first here"
                  value={firstname}
                  onChange={handleInputChange}
                  name="firstname"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="lasname" label="Lastname">
                <Form.Control
                  placeholder="Write lastname here"
                  value={lastname}
                  onChange={handleInputChange}
                  name="lastname"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="simplePushKey" label="SimplePush Key">
                <Form.Control
                  placeholder="Write simple push key here"
                  value={simplePushKey}
                  onChange={handleInputChange}
                  name="simplePushKey"
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

export default UserInfoModal;
