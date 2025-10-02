import { Link } from "react-router-dom";

export default function PageNotFound() {
  // Minimalist fallback for unmatched routes.
  return (
    <>
      <div className="text-center">Page not found</div>
      <hr />
      <Link to="/">← Back to Todos</Link>
    </>
  );
}
