import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Components

// views
import Login from "../views/auth/Login.jsx";
import Register from "../views/auth/Register.jsx";

export default function Auth() {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 ">
          <div
            className="absolute top-0 w-full h-ful bg-no-repeat bg-full "
            // style={{
            //   backgroundImage:
            //     "url(" + require("assets/img/register_bg_2.png").default + ")",
            // }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
        </section>
      </main>
    </>
  );
}
