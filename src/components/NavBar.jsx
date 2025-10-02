import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar({ children }) {
  return (
    <Navbar className="mt-3 border-0 glass-card rounded-4">
      <Container className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
        <Nav className="fw-semibold text-uppercase tracking-wide">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav>
        <Navbar.Brand className="fs-3 fw-bold text-gradient">ToDoDoom</Navbar.Brand>
        <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">{children}</div>
      </Container>
    </Navbar>
  );
}
