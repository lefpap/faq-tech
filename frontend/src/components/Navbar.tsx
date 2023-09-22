import { Navbar, Nav, Container, Dropdown, Form, Button } from "react-bootstrap";
import { SunFill, MoonFill } from "react-bootstrap-icons";
import { useTheme } from "../contexts/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProfileDropdown = () => {
  const { logout, user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <Dropdown drop="down-centered">
      <Dropdown.Toggle variant={theme} id="dropdown-basic">
        <Navbar.Text>{user?.username}</Navbar.Text>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to="/profile">
          Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const AuthButtons = () => {
  return (
    <>
      <Nav.Link as={NavLink} to="/login">
        <Button size="lg">Log In</Button>
      </Nav.Link>
      <Nav.Link as={NavLink} to="/register">
        <Button size="lg" variant="outline-primary">
          Register
        </Button>
      </Nav.Link>
    </>
  );
};

function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <Navbar expand="md" bg={theme}>
      <Container fluid="sm">
        <Navbar.Brand className="fw-bold fs-3" href="#home">
          FAQTech.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu" />

        <Navbar.Collapse className="justify-content-between align-items-baseline" id="menu">
          <Nav variant="underline" className="text-center gap-2">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/help">
              Help
            </Nav.Link>
          </Nav>

          <Nav.Item className="d-flex align-items-center justify-content-center gap-3">
            {isAuthenticated ? <ProfileDropdown /> : <AuthButtons />}

            <Form.Check
              type="switch"
              id="custom-switch"
              label={theme === "dark" ? <SunFill /> : <MoonFill />}
              checked={theme === "dark"}
              onChange={toggleTheme}
              reverse
            />
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
