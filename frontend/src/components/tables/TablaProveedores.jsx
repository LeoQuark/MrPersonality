import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../utils/api-data";

//components
import BotonEditar from "../Modal/BotonInfo";
import BotonEliminar from "../Modal/BotonEliminar";
import BotonInfo from "../Modal/BotonInfo";

const TablaProveedores = ({ proveedores }) => {
  const location = useLocation();
  const [filtrar, setFiltrar] = useState(false);
  const [datosFiltrados, setDatosFiltrados] = useState(false);
  const rowTitles = ["ID", "Nombre", "Rut", "Correo", "Acciones"];
  const [existenProveedores, setExistenProveedores] = useState(false);

  const existen = () => {
    if (proveedores) {
      setExistenProveedores(true);
    } else {
      setExistenProveedores(false);
    }
  };

  const filtrarDatos = (event) => {
    event.preventDefault();
    if (event.target.value.length > 2) {
      console.log(event.target.name, event.target.value);

      const test = proveedores.filter(
        (proveedor) => event.target.value === proveedor.nombre
      );
      setDatosFiltrados(test[0]);
      console.log(test);
    } else {
      setDatosFiltrados(false);
    }
  };

  // console.log(proveedores);
  useEffect(() => {
    existen();
  }, [location]);

  return (
    <>
      {existenProveedores ? (
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
                    placeholder="Nombre del proveedor"
                    className="my-1 py-1 text-blueGray-600 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md block"
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
                    {` ${datosFiltrados.id_proveedor}`}
                  </td>
                  <td className="border-t-0 px-6 max-w-max align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {` ${datosFiltrados.nombre}`}
                  </td>
                  <td className="border-t-0 px-6 max-w-max align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {` ${datosFiltrados.rut}`}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {` ${datosFiltrados.correo}`}
                  </td>
                  <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    <div className="flex justify-between">
                      <BotonInfo info={datosFiltrados} />
                      {/* <BotonEditar proveedor={proveedor} /> */}
                      <BotonEliminar
                        info={datosFiltrados}
                        tipo={"proveedores"}
                        id={"proveedor"}
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                proveedores.map((proveedor) => (
                  <tr key={proveedor.id_proveedor}>
                    <td className="border-t-0 px-6 max-w-max align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500 font-extrabold">
                      {` ${proveedor.id_proveedor}`}
                    </td>
                    <td className="border-t-0 px-6 max-w-max align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                      {` ${proveedor.nombre}`}
                    </td>
                    <td className="border-t-0 px-6 max-w-max align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                      {` ${proveedor.rut}`}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                      {` ${proveedor.correo}`}
                    </td>
                    <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                      <div className="flex justify-between">
                        <BotonInfo info={proveedor} />
                        {/* <BotonEditar proveedor={proveedor} /> */}
                        <BotonEliminar
                          info={proveedor}
                          tipo={"proveedores"}
                          id={"proveedor"}
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
            No hay registro de proveedors
          </div>
        </div>
      )}
    </>
  );
};

export default TablaProveedores;
