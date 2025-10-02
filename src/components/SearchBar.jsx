import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
  return (
    <Form className="search-form">
      <Form.Group controlId="search">
        <InputGroup className="rounded-pill overflow-hidden shadow-sm">
          <InputGroup.Text className="bg-transparent border-0 ps-3">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search todos..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Search todos"
            className="border-0"
          />
        </InputGroup>
      </Form.Group>
    </Form>
  );
}
