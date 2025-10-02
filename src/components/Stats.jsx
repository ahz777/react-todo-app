import { Card, Col, Row, Badge, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaList, FaClock } from "react-icons/fa";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function Stats({ todos }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const remainingTodos = totalTodos - completedTodos;
  const { width, height } = useWindowSize();

  const completionPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <>
      {completionPercentage === 100 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
        />
      )}
      <Card className="mt-1 mb-1 glass-card border-0">
        <Card.Body className="stats-card">
          <div className="stats d-flex align-items-center gap-2 flex-wrap justify-content-around">
            <div className="d-flex align-items-center justify-content-center gap-1">
              <FaList className="" />
              <span>Total: </span>
              <strong>{totalTodos}</strong>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-1">
              <FaCheckCircle />
              <span>Completed:</span>
              <strong>{completedTodos}</strong>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-1">
              <FaClock />
              <span>Remaining:</span>
              <strong>{remainingTodos}</strong>
            </div>
          </div>
          <ProgressBar className="" now={completionPercentage} label={`${completionPercentage}%`} />
        </Card.Body>
      </Card>
    </>
  );
}
