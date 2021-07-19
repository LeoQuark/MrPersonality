import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../utils/api-data";

//components
import BotonEditar from "../Modal/BotonInfo";
import BotonEliminar from "../Modal/BotonEliminar";
import BotonInfo from "../Modal/BotonInfo";

const TablaProveedores = ({ proveedores }) => {
  const location = useLocation();
  const [existenProveedores, setExistenProveedores] = useState(false);

  const existen = () => {
    if (proveedores) {
      setExistenProveedores(true);
    } else {
      setExistenProveedores(false);
    }
  };

  //funcion para extraer el valor de uploads\ del string de la imagen del producto
  const separarUrl = (cadena) => cadena.slice(8);
  // console.log(proveedores);
  useEffect(() => {
    existen();
  }, [location]);

  return (
    <>
      {existenProveedores ? (
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className="bg-blueGray-200 w-full">
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-extrabold text-left text-blueGray-500 border-blueGray-100">
                  ID
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Nombre
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Rut
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Correo
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id_proveedor} className="hover:bg-gray-200">
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
              ))}
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
