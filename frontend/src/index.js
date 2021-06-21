import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "./index.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/auth" exact component={Auth} />
      {/* add routes without layouts */}
      <Route path="/admin" component={Admin} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/auth" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
