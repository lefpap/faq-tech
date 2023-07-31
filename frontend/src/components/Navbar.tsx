import React from "react";
import { Navbar, Nav, Container, Dropdown, Image, Form } from "react-bootstrap";
import { SunFill, MoonFill } from "react-bootstrap-icons";
import { useTheme } from "../contexts/ThemeContext";

function NavBar() {
  const { theme, toggleTheme } = useTheme();

  console.log(theme);

  return (
    <Navbar expand="lg" bg={theme}>
      <Container>
        <Navbar.Brand className="fw-bold fs-3" href="#home">
          FAQTech.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu" />

        <Navbar.Collapse className="justify-content-between align-items-baseline" id="menu">
          <Nav variant="underline" className="text-center gap-2">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#help">Help</Nav.Link>
          </Nav>

          <Nav.Item className="d-flex align-items-center justify-content-center gap-3">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={theme === "dark" ? <SunFill /> : <MoonFill />}
              checked={theme === "dark"}
              onChange={toggleTheme}
              reverse
            />
            <Dropdown drop="down-centered">
              <Dropdown.Toggle className="d-flex align-items-center gap-3" variant={theme} id="dropdown-basic">
                <div className="d-inline-flex align-items-center gap-2">
                  <Navbar.Text>Lefteris Pap.</Navbar.Text>
                  <Image width={30} src="/src/assets/react.svg" />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
