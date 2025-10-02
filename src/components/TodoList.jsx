import { useState, useEffect } from "react";
import { ListGroup, Form, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";

export default function TodoList({ theme, todos, toggleComplete, deleteTodo, updateTodo, searchTerm, allTodos }) {
  const [sortBy, setSortBy] = useState("dateNew");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    let result = [...todos];
    if (filterStatus === "completed") {
      result = result.filter((todo) => todo.completed);
    } else if (filterStatus === "pending") {
      result = result.filter((todo) => !todo.completed);
    }

    if (sortBy === "dateNew") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "dateOld") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredTodos(result);
  }, [todos, filterStatus, sortBy]);

  return (
    <>
      <Row className="mb-4 mt-2 gy-3 align-items-center">
        <Col xs={12} lg={6}>
          <Form.Group className="mb-0">
            <Form.Label>Filter</Form.Label>
            <ButtonGroup className="w-100 gap-2 flex-wrap">
              <Button
                variant={filterStatus === "all" ? "primary" : "outline-secondary"}
                className="filter-pill"
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "completed" ? "primary" : "outline-secondary"}
                className="filter-pill"
                onClick={() => setFilterStatus("completed")}
              >
                Completed
              </Button>
              <Button
                variant={filterStatus === "pending" ? "primary" : "outline-secondary"}
                className="filter-pill"
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </Button>
            </ButtonGroup>
          </Form.Group>
        </Col>
        <Col xs={12} lg={6}>
          <Form.Group className="sort-group">
            <Form.Label>Sort By</Form.Label>
            <Form.Select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-pill">
              <option value="dateNew">Date Created (Newest First)</option>
              <option value="dateOld">Date Created (Oldest First)</option>
              <option value="name">Name (A-Z)</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <ListGroup className="todo-list border-0">
        {filteredTodos.length === 0 ? (
          <ListGroup.Item className="list-item-wrapper glass-card border-0 text-center py-4">
            {searchTerm && allTodos.length > 0
              ? "No matching results found"
              : allTodos.length === 0
              ? "No Todo added"
              : filterStatus === "completed"
              ? "No completed todos"
              : "No pending todos"}
          </ListGroup.Item>
        ) : (
          filteredTodos.map((todo) => (
            <ListGroup.Item key={todo.id} className="list-item-wrapper glass-card border-0 p-3 p-md-4">
              <TodoItem
                theme={theme}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </>
  );
}
