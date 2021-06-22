import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

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
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/ventas" exact component={Ventas} />
            <Route path="/admin/productos" exact component={Productos} />
            <Route path="/admin/proveedores" exact component={Proveedores} />
            <Route path="/admin/clientes" exact component={Clientes} />
            <Route path="/admin/perfil" exact component={Perfil} />
            <Route path="/admin/tables" exact component={Tables} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
