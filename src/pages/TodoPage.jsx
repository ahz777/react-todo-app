import { Container } from "react-bootstrap";

export default function TodoPage({ children }) {
  return <Container className="todo-page gap-4 d-flex flex-column flex-lg-row">{children}</Container>;
}
