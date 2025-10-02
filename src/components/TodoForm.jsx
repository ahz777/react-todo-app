import { Form, Button, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function TodoForm({ title, description, handleTitleChange, handleDescriptionChange, handleSubmit }) {
  // Render the reusable form that drives todo creation in the sidebar.
  return (
    <Form className="todo-form glass-card p-4 rounded-4 shadow-sm" onSubmit={handleSubmit}>
      <Form.Group className="d-flex align-items-center gap-1 mb-3" controlId="todoTitle">
        <InputGroup.Text className="rounded-pill bg-gradient-blue text-white px-3">Title</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Todo Title"
          value={title}
          onChange={handleTitleChange}
          required
          // Provide a user-friendly message when the browser flags the field as invalid.
          onInvalid={(event) => {
            if (!event.target.value) {
              event.target.setCustomValidity("Title is required!");
            }
          }}
          onInput={(event) => event.target.setCustomValidity("")}
        />
        <Button type="submit" className="d-flex align-items-center justify-content-center submit-circle">
          <FaPlus />
        </Button>
      </Form.Group>

      <Form.Group className="d-flex flex-column gap-2" controlId="todoDescription">
        <InputGroup.Text className="rounded-pill bg-gradient-blue text-white px-3 w-auto">Description</InputGroup.Text>
        <Form.Control
          as="textarea"
          placeholder="Write your todo description here... Optional"
          value={description}
          onChange={handleDescriptionChange}
          rows={4}
        />
        <Button type="submit" className="align-self-start rounded-pill px-4 py-2">
          Add Todo
        </Button>
      </Form.Group>
    </Form>
  );
}
