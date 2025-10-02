import { Form, InputGroup, Container } from "react-bootstrap";

export default function ThemeToggle({ theme, changeTheme }) {
  return (
    <Container className="theme-toggle d-flex align-items-center gap-2">
      <InputGroup>
        <InputGroup.Text className="theme-toggle-label">Theme</InputGroup.Text>
        <Form.Select
          value={theme}
          onChange={(event) => changeTheme(event.target.value)}
          className="theme-toggle-select shadow-sm"
        >
          <option value="sea">Sea Breeze</option>
          <option value="sky">Sky Dawn</option>
          <option value="galaxy">Galaxy Glow</option>
          <option value="desert">Desert Mirage</option>
          <option value="woods">Whispering Woods</option>
        </Form.Select>
      </InputGroup>
    </Container>
  );
}
