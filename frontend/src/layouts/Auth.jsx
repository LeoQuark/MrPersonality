import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

// export default function Auth() {
//   return (
//     <>
//       {/* <Navbar transparent /> */}
//       <main>
//         <section className="relative w-full h-full py-40 min-h-screen bg-blue-300">
//           {/* <div
//             className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
//             style={{
//               backgroundImage:
//                 "url(" + require("assets/img/register_bg_2.png").default + ")",
//             }}
//           ></div>*/}
//           <Switch>
//             <Route path="/auth/login" exact component={Login} />
//             <Route path="/auth/register" exact component={Register} />
//             <Redirect from="/auth" to="/auth/login" />
//           </Switch>
//           <FooterSmall absolute />
//         </section>
//       </main>
//     </>
//   );
// }

const Auth = () => {
  return (
    <React.Fragment className="h-screen">
      <div className="grid grid-cols-4 h-screen gap-2 bg-red-200">
        <div className="col-start-1 col-end-3 bg-red-400">1</div>
        <div className="bg-red-500">2</div>
      </div>
      <Switch>
        <Route path="/auth/login" exact component={Login} />
        <Route path="/auth/register" exact component={Register} />
        <Redirect from="/auth" to="/auth" />
      </Switch>
    </React.Fragment>
  );
};

export default Auth;
