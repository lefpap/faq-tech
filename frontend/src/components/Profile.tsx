import { Button, Card, CardProps, Table } from "react-bootstrap";
import { IUser } from "../types/models";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Retryer } from "react-query/types/core/retryer";
import { useQueries, useQuery } from "react-query";
import { getUser } from "../api/users";
import { CloudSlash } from "react-bootstrap-icons";

interface ProfileProps extends CardProps {
  onChangeCredentials: () => void;
  onUpdateInfo: () => void;
}

const Profile: React.FC<ProfileProps> = ({ className, onChangeCredentials, onUpdateInfo }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) {
    navigate("/login");
    return;
  }

  const { data: loggedInUser, isLoading, isError, error } = useQuery(["users", "me"], getUser);

  if (isError) {
    navigate("/login");
    console.log(error);
    return;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(loggedInUser);

  return (
    <Card className={className}>
      <Card.Header>Profile Details</Card.Header>
      <Card.Body>
        <Table bordered hover>
          <tbody>
            <tr>
              <td>User</td>
              <td>{loggedInUser?.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{loggedInUser?.email}</td>
            </tr>
            <tr>
              <td>Firstname</td>
              <td>{loggedInUser?.firstname}</td>
            </tr>
            <tr>
              <td>Lastname</td>
              <td>{loggedInUser?.lastname}</td>
            </tr>
            <tr>
              <td>SimplePush Key</td>
              <td>{loggedInUser && loggedInUser.simplePushKey ? loggedInUser.simplePushKey : "NA"}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="d-flex gap-3 justify-content-center">
        <Button size="sm" variant="secondary" className="w-100" onClick={onUpdateInfo}>
          Update Info
        </Button>
        <Button size="sm" variant="outline-secondary" className="w-100" onClick={onChangeCredentials}>
          Change Credentials
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Profile;
