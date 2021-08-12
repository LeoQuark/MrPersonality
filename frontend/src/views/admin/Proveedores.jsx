import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
//componentes
import Cargando from "../../components/Cargando";
import TablaProveedores from "../../components/tables/TablaProveedores";
import TablaProductosMini from "../../components/tables/TablaProductosMini";
import AgregarProveedor from "../../components/Modal/Proveedores/AgregarProveedor";
import AgregarProducto from "../../components/Modal/Productos/AgregarProducto";

const Proveedores = () => {
  const location = useLocation();
  const [cargandoProvedores, setCargandoProveedores] = useState(<Cargando />);
  const [cargandoProductos, setCargandoProductos] = useState(<Cargando />);

  const getProveedor = async () => {
    await axios.get(`http://localhost:4000/api/proveedor/getALL`).then(
      (response) => {
        console.log(response.data.data);
        setCargandoProveedores(
          <TablaProveedores proveedores={response.data.data} />
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getProductos = async () => {
    await axios.get(`http://localhost:4000/api/producto/getALL`).then(
      (response) => {
        // console.log(response.data.data);
        setCargandoProductos(
          <TablaProductosMini productos={response.data.data} />
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getProveedor();
    getProductos();
  }, [location]);

  return (
    <>
      <div className="flex flex-wrap mt-4 text-white">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-blueGray-700">
                    Proveedores registrados
                  </h3>
                </div>
                <div className="text-blueGray-700 block">
                  <AgregarProveedor />
                </div>
              </div>
            </div>
            {cargandoProvedores}
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-blueGray-700">
                    Productos
                  </h3>
                </div>
                <div className="text-blueGray-700 block">
                  <AgregarProducto />
                </div>
              </div>
            </div>
            {cargandoProductos}
          </div>
        </div>
      </div>
    </>
  );
};

export default Proveedores;
