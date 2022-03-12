import './App.css';
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Main Comp</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/categories">Categories</Link>
        <Link to="/mypage">My Page</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
