import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, Button, Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";

export default function TaskDetails({ todos, toggleComplete, deleteTodo, updateTodo, theme }) {
  const { id } = useParams();
  const todo = todos.find((todo) => String(todo.id) === id);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setEditTitle(todo.title);
      setEditDescription(todo.description || "");
    }
  }, [todo]);

  if (!todo) {
    return (
      <Card>
        <Card.Body>
          <h3>Task not found</h3>
          <Link to="/">← Back to Todos</Link>
        </Card.Body>
      </Card>
    );
  }

  const date = new Date(todo.createdAt);
  const dateStr = date.toLocaleString();

  function handleSave() {
    if (!editTitle.trim()) {
      return;
    }

    updateTodo(todo.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  }

  function handleTitleChange(event) {
    setEditTitle(event.target.value);
  }

  return (
    <Card.Body>
      {!isEditing && (
        <>
          <Row>
            <Col>
              <div>
                Created: <strong>{dateStr}</strong>
              </div>
              <div>
                Status: <strong>{todo.completed ? "Completed" : "Pending"}</strong>
              </div>
            </Col>
            <Col className="d-flex justify-content-end align-items-end gap-2">
              <Button
                size="sm"
                className="todo-status-btn rounded-circle border-0 shadow-sm flex-shrink-0"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? <FaTimes className="opacity-75" /> : <FaCheck />}
              </Button>
              <Button size="sm" className="icon-btn edit border-0" onClick={() => setIsEditing(true)}>
                <FaEdit />
              </Button>
              <Button
                size="sm"
                className="icon-btn delete border-0"
                onClick={() => {
                  deleteTodo(todo.id);
                  navigate("/");
                }}
              >
                <FaTrash />
              </Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <h3 className="text-decoration-underline">{todo.title}</h3>
            <div>{todo.description || <em>No description</em>}</div>
          </Row>
        </>
      )}
      {isEditing && (
        <Form onSubmit={handleSave}>
          <Row>
            <Col>
              <div>
                Created: <strong>{dateStr}</strong>
              </div>
              <div>
                Status: <strong>{todo.completed ? "Completed" : "Pending"}</strong>
              </div>
            </Col>
            <Col className="d-flex justify-content-end align-items-end gap-2">
              <Button className="border shadow" type="submit">
                <FaSave className="me-2" /> Save
              </Button>
              <Button className="border shadow" variant="secondary" onClick={handleCancel}>
                <FaTimes className="me-2" /> Cancel
              </Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Form.Group className="mb-3" controlId="editTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={handleTitleChange}
                required
                onInvalid={(event) => {
                  if (!event.target.value) {
                    event.target.setCustomValidity("Title is required!");
                  }
                }}
                onInput={(event) => event.target.setCustomValidity("")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editDescription}
                onChange={(event) => setEditDescription(event.target.value)}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
      <hr />
      <Link to="/">← Back to Todos</Link>
    </Card.Body>
  );
}
