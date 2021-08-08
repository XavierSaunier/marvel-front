import { useState } from "react";
import logoMarvel from "../images/marvel-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="header">
      <Link to="/comics">
        <img alt="logo-marvel" src={logoMarvel} />
      </Link>
      <input
        className="search"
        type="text"
        onChange={(event) => {
          setName(event.target.value);
          setTitle(event.target.value);
        }}
      ></input>
      <div className="log">
        <button className="signUp">Sign up</button>
        <button className="logIn">Log in</button>
      </div>
    </div>
  );
};

export default Header;
