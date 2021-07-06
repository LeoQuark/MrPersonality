import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

//components
import BotonEditar from "../Modal/BotonEditar";
import BotonEliminar from "../Modal/BotonEliminar";

const TablaProductos = (props) => {
  const productos = props.productos;

  useEffect(() => {}, []);

  return (
    <>
      {productos.map((producto, index) => (
        <tr key={index}>
          <td className="border-t-0 px-6 py-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
            <img
              src={require("assets/img/bootstrap.jpg").default}
              className="h-10 w-10 bg-white rounded-full border"
              alt="..."
            ></img>
          </td>
          <td className="border-t-0 px-6 max-w-max align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {` ${producto.nombre}`}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {producto.stock <= 0 ? (
              <div className="p-1  bg-red-500 rounded-full shadow-md"></div>
            ) : (
              <div className="p-1 mx-auto w-1 bg-green-500 rounded-full shadow-md"></div>
            )}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {` ${producto.categoria}`}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {` ${producto.tipo}`}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {` ${producto.precio}`}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {producto.stock}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            {producto.descripcion}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
            <div className="flex justify-between w-100">
              <BotonEditar producto={producto} />
              <BotonEliminar producto={producto} />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TablaProductos;
