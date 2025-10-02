import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash, FaCheck, FaTimes, FaEdit, FaClock } from "react-icons/fa";
import { useState } from "react";

export default function TodoItem({ theme, todo, toggleComplete, deleteTodo, updateTodo }) {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  function formatDate(createDate) {
    const date = new Date(createDate);
    return date.toLocaleString();
  }

  function submitEdit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    updateTodo(todo.id, {
      title: title.trim(),
      description: description.trim(),
    });
    setShowEdit(false);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  return (
    <>
      <Row className="align-items-center todo-item-row">
        <Col className="d-flex align-items-start gap-3 flex-grow-1">
          <Button
            size="sm"
            className="todo-status-btn rounded-circle border-0 shadow-sm flex-shrink-0"
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.completed ? <FaTimes className="opacity-75" /> : <FaCheck />}
          </Button>
          <div className="todo-item-content w-75">
            <Link to={`/task/${todo.id}`} className="todo-item-title d-block text-decoration-none">
              <div className="fw-semibold text-truncate">{todo.title}</div>
            </Link>

            {todo.description && (
              <div className="todo-item-description text-muted text-truncate">{todo.description}</div>
            )}
            <div className="mt-2 d-flex align-items-center gap-2 small text-muted">
              <FaClock className="opacity-75" />
              <small className="fw-medium">Created: {formatDate(todo.createdAt)}</small>
            </div>
          </div>
        </Col>

        <Col className="d-flex align-items-center justify-content-end gap-2 flex-wrap flex-lg-nowrap">
          <Button size="sm" className="icon-btn edit border-0" onClick={() => setShowEdit(true)}>
            <FaEdit />
          </Button>
          <Button size="sm" className="icon-btn delete border-0" onClick={() => deleteTodo(todo.id)}>
            <FaTrash />
          </Button>
        </Col>

        <Modal show={showEdit} onHide={() => setShowEdit(false)} centered contentClassName="glass-card">
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Form onSubmit={submitEdit}>
            <Modal.Body>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
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
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Form.Group>
              <div className="text-muted">
                <small>Created: {formatDate(todo.createdAt)}</small>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEdit(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Row>
    </>
  );
}
