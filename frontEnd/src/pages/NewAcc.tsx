import { Link } from "react-router-dom";

function NewAcc(): JSX.Element {
  return (
    <div className="new-account-page">
        <input
            type="text"
            placeholder="User name or Email address"
            onChange={(e) => (e.target.value)}
            className="UN-input"
            required
        />

        <input
            type="text"
            placeholder="Password"
            onChange={(e) => (e.target.value)}
            className="UN-input"
            required
        />

        <input
            type="text"
            placeholder="Confirm Password"
            onChange={(e) => (e.target.value)}
            className="UN-input"
            required
        />

        <button>
            Confirm
        </button>

        <Link to={"/"}>Back to Login page</Link>
    </div>
  );
}

export default NewAcc;