import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./components/Header";
import FrontPage from "./containers/FrontPage";
import Characters from "./containers/Characters";
import Chartacter from "./containers/Character";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/comics/:id">
          <Chartacter />
        </Route>

        <Route path="/comics">
          <FrontPage />
        </Route>

        <Route path="/characters">
          <Characters />
        </Route>

        <Route path="/">
          <Redirect to="/comics" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
