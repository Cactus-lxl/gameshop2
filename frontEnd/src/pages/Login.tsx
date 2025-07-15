import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginProps } from "@/types";
import "../css/Login.css";
import loginLogo from "../assets/loginLogo.png";

function Login({ setIsValid }: LoginProps): JSX.Element {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const UN = "Username";
  const PW = "Password";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (userName === UN && password === PW) {
      localStorage.setItem("isLoggedIn", "true");
      setIsValid(true);
      navigate("/home");
    } else {
      alert("Wrong username or password");
    }
  };

  // const handleLogin = (): void => {
  //   if (userName === UN && password === PW) {
  //     localStorage.setItem("isLoggedIn", "true");
  //     setIsValid(true);
  //     navigate("/home");
  //   } else {
  //     alert("Wrong username or password");
  //   }
  // };

  return (
    <div className="input-grid">
      <img src={loginLogo} alt="By Gamers for Gamers" className="login-icon" />

      <div className="login-info-grid">
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            type="text"
            placeholder="User name or Email address"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="UN-input"
            required
          />

          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="PW-input"
            required
          />

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <div className="login-links">
          <Link to="/home" className="guest-link">Continue as guest</Link>
          <Link to="/newacc" className="create-acc-link">Create a new account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;