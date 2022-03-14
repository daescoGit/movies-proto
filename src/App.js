import { Outlet } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';



function App() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand >Movies-demo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/mypage">
                <Nav.Link>Wish list</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Categories" id="collasible-nav-dropdown" menuVariant="dark">
                <Dropdown.Header style={{ color: 'gold' }}>Movies</Dropdown.Header>
                <NavDropdown.Item >Action</NavDropdown.Item>
                <NavDropdown.Item >Another action</NavDropdown.Item>
                <NavDropdown.Item >Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <Dropdown.Header style={{ color: 'gold' }}>Series</Dropdown.Header>
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}

//       
export default App;
