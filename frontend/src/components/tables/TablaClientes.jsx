import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

//components
import BotonEditar from "../Modal/BotonEditar";
import BotonEliminar from "../Modal/BotonEliminar";

const TablaClientes = (props) => {
  const clientes = props.clientes;

  useEffect(() => {}, []);

  return (
    <>
      {clientes.map((cliente, index) => (
        <tr key={index}>
          <td className="border-t-0 px-6 max-w-max align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {` ${cliente.nombre}`}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {` ${cliente.correo}`}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {` ${cliente.direccion}`}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {` ${cliente.telefono}`}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {cliente.comuna}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {cliente.redes}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            <div className="flex justify-between w-100">
              <BotonEditar cliente={cliente} />
              <BotonEliminar cliente={cliente} />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TablaClientes;
