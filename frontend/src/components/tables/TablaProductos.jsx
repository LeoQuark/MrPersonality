import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../utils/api-data";

//components
import BotonEditar from "../Modal/Productos/BotonEditar";
import BotonEliminar from "../Modal/BotonEliminar";
import BotonInfo from "../Modal/BotonInfo";

const TablaProductos = ({ productos }) => {
  const location = useLocation();
  const [existenProductos, setExistenProductos] = useState(false);

  const existen = () => {
    if (productos) {
      setExistenProductos(true);
    } else {
      setExistenProductos(false);
    }
  };

  //funcion para extraer el valor de uploads\ del string de la imagen del producto
  const separarUrl = (cadena) => cadena.slice(8);
  console.log(productos);
  useEffect(() => {
    existen();
  }, [location]);

  return (
    <>
      {existenProductos ? (
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className="bg-blueGray-200 w-full">
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Imagen
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Nombre
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Disponible
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Categoria
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Precio
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Stock
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id_producto} className="hover:bg-gray-200">
                  <td className="border-t-0 px-6 py-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src={`${API_URL}/${separarUrl(producto.imagen)}`}
                      className="h-12 w-12 rounded-full bg-white border"
                      alt="..."
                    ></img>
                  </td>
                  <td className="border-t-0 px-6 max-w-max align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {` ${producto.nombre}`}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {producto.stock <= 0 ? (
                      <div className="p-1 mx-auto w-1 bg-red-500 rounded-full shadow-md"></div>
                    ) : (
                      <div className="p-1 mx-auto w-1 bg-green-500 rounded-full shadow-md"></div>
                    )}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {` ${producto.categoria}`}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {` ${producto.precio}`}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    {producto.stock}
                  </td>
                  <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-500">
                    <div className="flex justify-between">
                      <BotonInfo info={producto} />
                      {/* <BotonEditar producto={producto} /> */}
                      <BotonEliminar
                        info={producto}
                        tipo={"productos"}
                        id={"producto"}
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
            No hay registro de productos
          </div>
        </div>
      )}
    </>
  );
};

export default TablaProductos;
