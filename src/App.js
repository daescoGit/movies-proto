import { Outlet } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CATEGORIES } from './utilities/constants';

// her kan vi sætte golbal configs til react query
const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 1000 * 60 * 60,
        staleTime: 1000 * 60 * 60
      },
    },
  }
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                {CATEGORIES.slice(0, 3).map((cat, index) =>
                  <LinkContainer key={index} to={`/movie/${cat}`}>
                    <NavDropdown.Item >{cat}</NavDropdown.Item>
                  </LinkContainer>
                )}
                <LinkContainer to="/">
                  <NavDropdown.Item >...</NavDropdown.Item>
                </LinkContainer>
                <Dropdown.Header style={{ color: 'gold' }}>Series</Dropdown.Header>
                <NavDropdown.Divider />
                {CATEGORIES.slice(0, 3).map((cat, index) =>
                  <LinkContainer key={index} to={`/series/${cat}`}>
                    <NavDropdown.Item >{cat}</NavDropdown.Item>
                  </LinkContainer>
                )}
                <LinkContainer to="/">
                  <NavDropdown.Item >...</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
