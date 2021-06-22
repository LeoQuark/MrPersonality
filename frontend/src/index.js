import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "./index.css";

//Context
import UserState from "./context/UserState";

// layouts
import Admin from "layouts/Admin";
import Auth from "layouts/Auth";

ReactDOM.render(
  <UserState>
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/auth" exact component={Auth} />
        {/* add routes without layouts */}
        <Route path="/admin" component={Admin} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/auth" />
      </Switch>
    </BrowserRouter>
  </UserState>,
  document.getElementById("root")
);
