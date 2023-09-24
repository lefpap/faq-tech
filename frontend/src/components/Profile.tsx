import { Button, Card, CardProps, Table } from "react-bootstrap";
import { IUser } from "../types/models";

interface ProfileProps extends CardProps {
  user: IUser | null;
}

const Profile: React.FC<ProfileProps> = ({ user, className }) => {
  if (!user) {
    return <div>Error loading user details</div>;
  }

  return (
    <Card className={className}>
      <Card.Header>Profile Details</Card.Header>
      <Card.Body>
        <Table bordered hover>
          <tbody>
            <tr>
              <td>User</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Firstname</td>
              <td>{user.firstname}</td>
            </tr>
            <tr>
              <td>Lastname</td>
              <td>{user.lastname}</td>
            </tr>
            <tr>
              <td>SimplePush Key</td>
              <td>{user.simplePushKey ? user.simplePushKey : "NA"}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="d-flex gap-3 justify-content-center">
        <Button size="sm" variant="secondary" className="w-100">
          Update Info
        </Button>
        <Button size="sm" variant="outline-secondary" className="w-100">
          Change Credentials
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Profile;
