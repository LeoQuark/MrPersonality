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
import Auth from "./layouts/Auth";

ReactDOM.render(
  <UserState>
    <BrowserRouter>
      <Switch>
        {/* rutas para el login con layout(jsx principal) */}
        <Route path="/auth" component={Auth} />
        {/* rutas para el panel admin con layout */}
        <Route path="/admin/:id" component={Admin} />
        {/* redirect para que que se dirija al login*/}
        <Redirect from="*" to="/auth" />
      </Switch>
    </BrowserRouter>
  </UserState>,
  document.getElementById("root")
);
