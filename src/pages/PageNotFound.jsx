import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <>
      <div className="text-center">Page not found</div>
      <hr />
      <Link to="/">← Back to Todos</Link>
    </>
  );
}
