import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Modal, ModalProps, Toast } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

interface UserInfoModalProps extends ModalProps {}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ show, onHide }) => {
  //   const queryClient = useQueryClient();
  const { user, updateUserInfo } = useAuth();
  const [alert, setAlert] = useState(false);

  // Form elements
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newFirstname, setNewFirstname] = useState<string>("");
  const [newLastname, setNewLastname] = useState<string>("");
  const [newSimplePushKey, setNewSimplePushkey] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setNewUsername(user.username);
      setNewEmail(user.email);
      setNewFirstname(user.firstname);
      setNewLastname(user.lastname);
      setNewSimplePushkey(user.simplePushKey ? user.simplePushKey : "NA");
    }
  }, [user]);

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
      case "newFirstname":
        setNewFirstname(value);
        break;
      case "newLastname":
        setNewLastname(value);
        break;
      case "newSimplePushKey":
        setNewSimplePushkey(value);
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
      updateUserInfo({
        currentPassword,
        newPassword,
        newUsername,
        newEmail,
        newFirstname,
        newLastname,
        newSimplePushKey,
      });
    } catch (error) {
      setError("Error updating user info");
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
              <FloatingLabel controlId="currentPassword" label="Current Password">
                <Form.Control
                  type="password"
                  placeholder="Write password here"
                  value={currentPassword}
                  onChange={handleInputChange}
                  name="currentPassword"
                  required
                />
                <Form.Control.Feedback type="invalid">Password is empty</Form.Control.Feedback>
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
                  required
                />
                <Form.Control.Feedback type="invalid">Username is empty</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="newEmail" label="New Email">
                <Form.Control
                  type="email"
                  placeholder="Write email here"
                  value={newEmail}
                  onChange={handleInputChange}
                  name="newEmail"
                  required
                />
                <Form.Control.Feedback type="invalid">Email is empty</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="newFirstname" label="New Firstname">
                <Form.Control
                  placeholder="Write firstname here"
                  value={newFirstname}
                  onChange={handleInputChange}
                  name="newFirstname"
                  required
                />
                <Form.Control.Feedback type="invalid">Firstname is empty</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="newLastname" label="New Lastname">
                <Form.Control
                  placeholder="Write lastname here"
                  value={newLastname}
                  onChange={handleInputChange}
                  name="newLastname"
                  required
                />
                <Form.Control.Feedback type="invalid">Lastname is empty</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="newSimplePushKey" label="New SimplePush Key">
                <Form.Control
                  placeholder="Write simple push key here"
                  value={newSimplePushKey}
                  onChange={handleInputChange}
                  name="newSimplePushKey"
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
