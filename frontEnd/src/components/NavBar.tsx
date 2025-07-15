import { Link } from "react-router-dom";

function NavBar(): JSX.Element {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home">Game HUB</Link>
      </div>

      <div className="navbar-links">
        <Link to="/cart">Cart</Link>
        <Link to="/home">Home</Link>
      </div>
    </nav>
  );
}

export default NavBar;