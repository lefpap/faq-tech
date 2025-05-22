import { Button, Card, CardProps, Table } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProfileProps extends CardProps {
  onUpdateInfo: () => void;
  onDelete: () => void;
}

const Profile: React.FC<ProfileProps> = ({ className, onDelete, onUpdateInfo }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Card className={className}>
      <Card.Header>Profile Details</Card.Header>
      <Card.Body>
        <Table bordered hover>
          <tbody>
            <tr>
              <td>User</td>
              <td>{user?.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user?.email}</td>
            </tr>
            <tr>
              <td>Firstname</td>
              <td>{user?.firstname}</td>
            </tr>
            <tr>
              <td>Lastname</td>
              <td>{user?.lastname}</td>
            </tr>
            <tr>
              <td>SimplePush Key</td>
              <td>{user && user.simplePushKey ? user.simplePushKey : "NA"}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="d-flex gap-3 justify-content-center">
        <Button size="sm" variant="secondary" className="w-100" onClick={onUpdateInfo}>
          Update Info
        </Button>
        <Button size="sm" variant="danger" className="w-100" onClick={onDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Profile;
