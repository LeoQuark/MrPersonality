import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

//Context
import UserContext from "../../context/UserContext";

//components
import Cargando from "../../components/Cargando";
import TablaProductos from "../../components/tables/TablaProductos";
import BotonAgregar from "../../components/Modal/BotonAgregar";

const Productos = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const [cargando, setCargando] = useState(<Cargando />);
  // const [productos, setProductos] = useState({});
  // console.log(location.pathname);

  const getProductos = async () => {
    // console.log(user);
    const get = await axios
      .get(`http://localhost:4000/api/producto/getALL`)
      .then(
        (response) => {
          // console.log(response.data.data);
          // setRespuesta(!respuesta);
          setCargando(<TablaProductos productos={response.data.data} />);
          // setProductos(response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  useEffect(() => {
    getProductos();
    // console.log(productos);
  }, [location]);

  return (
    <>
      <div className="flex flex-wrap mt-4 text-white">
        <div className="w-full lg:w-12/12 px-4">
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
            }
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-blueGray-700">
                    Productos en la tienda
                  </h3>
                </div>
                <div className="text-blueGray-700 block">
                  <BotonAgregar />
                </div>
              </div>
            </div>
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
                      Tipo
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                      Precio
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                      Stock
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                      Descripcion
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-blueGray-500 border-blueGray-100">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>{cargando}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productos;
