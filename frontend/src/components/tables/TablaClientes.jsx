import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../utils/api-data";

//components
import BotonEditar from "../Modal/Productos/BotonEditar";
import BotonEliminar from "../Modal/BotonEliminar";
import BotonInfo from "../Modal/BotonInfo";

const TablaClientes = ({ clientes }) => {
  const location = useLocation();
  const [filtrar, setFiltrar] = useState(false);
  const [datosFiltrados, setDatosFiltrados] = useState(false);
  const rowTitles = ["ID", "Nombre", "Instagram", "Correo", "Acciones"];
  const [existenClientes, setExistenClientes] = useState(false);

  console.log(clientes);
  const existen = () => {
    if (clientes) {
      setExistenClientes(true);
    } else {
      setExistenClientes(false);
    }
  };

  const filtrarDatos = (event) => {
    event.preventDefault();
    if (event.target.value.length > 1) {
      console.log(event.target.name, event.target.value);

      const test = clientes.filter(
        (cliente) =>
          event.target.value === cliente.nombre ||
          event.target.value === cliente.user_instagram
      );
      setDatosFiltrados(test[0]);
      console.log(test);
    } else {
      setDatosFiltrados(false);
    }
  };

  useEffect(() => {
    existen();
  }, [location]);

  return (
    <>
      {existenClientes ? (
        <div className="block w-full overflow-x-auto">
          <div className="ml-8 mb-2">
            <button
              type="button"
              className="px-2 py-1 text-sm text-blueGray-500 rounded-md border-2 border-gray-400"
              onClick={() => setFiltrar(!filtrar)}
            >
              Filtrar datos
              <i
                className={
                  filtrar
                    ? "ml-2 fas fa-angle-up fa-lg"
                    : "ml-2 fas fa-angle-down fa-lg"
                }
              ></i>
            </button>
            <div className={filtrar ? "mt-2 block" : "hidden"}>
              <form>
                <div>
                  <input
                    type="text"
                    name="proveedor"
                    placeholder="Nombre o Instagram"
                    className="my-1 py-1 text-blueGray-600 focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300 rounded-md block"
                    onChange={filtrarDatos}
                  />
                </div>
              </form>
            </div>
          </div>
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className="bg-blueGray-200 w-full">
                {rowTitles.map((title, index) => (
                  <th
                    key={index}
                    className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap text-left text-blueGray-500 border-blueGray-100"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datosFiltrados ? (
                <tr className="hover:bg-gray-200">
                  <td className="border-t-0 px-6 max-w-max align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500 font-extrabold">
                    {` ${datosFiltrados.id_cliente}`}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {` ${datosFiltrados.nombre}`}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {` ${datosFiltrados.user_instagram}`}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {datosFiltrados.correo}
                  </td>
                  <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    <div className="flex justify-between">
                      <BotonInfo info={datosFiltrados} />
                      {/* <BotonEditar clientes={clientes} /> */}
                      <BotonEliminar
                        info={datosFiltrados}
                        tipo={"clientes"}
                        id={"cliente"}
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                clientes.map((cliente) => (
                  <tr key={cliente.id_cliente} className="hover:bg-gray-200">
                    <td className="border-t-0 px-6 max-w-max align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500 font-extrabold">
                      {` ${cliente.id_cliente}`}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                      {` ${cliente.nombre}`}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                      {` ${cliente.user_instagram}`}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                      {cliente.correo}
                    </td>
                    <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                      <div className="flex justify-between">
                        <BotonInfo info={cliente} />
                        {/* <BotonEditar clientes={clientes} /> */}
                        <BotonEliminar
                          info={cliente}
                          tipo={"clientes"}
                          id={"cliente"}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="my-4 mx-auto text-base text-blueGray-500">
            No hay registro de productos
          </div>
        </div>
      )}
    </>
  );
};

export default TablaClientes;
