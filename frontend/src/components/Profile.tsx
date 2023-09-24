import { Card, Table } from "react-bootstrap";
import { IUser } from "../types/models";

interface ProfileProps {
  user: IUser | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  if (!user) {
    return <div>Error loading user details</div>;
  }

  return (
    <Card>
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
    </Card>
  );
};

export default Profile;
