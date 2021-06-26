import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Session storage
import {
  getTokenSessionStorage,
  getUserSessionStorage,
} from "../utils/sessionStorage";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";

// views
import Dashboard from "views/admin/Dashboard";
import Perfil from "views/admin/Perfil";
import Tables from "views/admin/Tables";

// secciones
import Ventas from "views/admin/Ventas";
import Productos from "views/admin/Productos";
import Clientes from "views/admin/Clientes";
import Proveedores from "views/admin/Proveedores";

export default function Admin() {
  const [token, setToken] = useState();
  const [userData, setUserData] = useState({});
  // console.log(token, userData);
  useEffect(() => {
    const getSessionStorage = () => {
      setToken(getTokenSessionStorage());
      setUserData(getUserSessionStorage());
    };
    getSessionStorage();
  }, []);

  return (
    <>
      <Sidebar user={userData} />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard/:id" exact component={Dashboard} />
            <Route path="/admin/ventas/:id" exact component={Ventas} />
            <Route path="/admin/productos/:id" exact component={Productos} />
            <Route
              path="/admin/proveedores/:id"
              exact
              component={Proveedores}
            />
            <Route path="/admin/clientes/:id" exact component={Clientes} />
            <Route path="/admin/perfil/:id" exact component={Perfil} />
            <Route path="/admin/tables/:id" exact component={Tables} />
            <Redirect from="/admin/:id" to="/admin/dashboard/:id" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
