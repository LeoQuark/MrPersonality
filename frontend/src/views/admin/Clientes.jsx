import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../utils/api-data";
//Context
import UserContext from "../../context/UserContext";

//component
import Cargando from "../../components/Cargando";
import TablaClientes from "../../components/tables/TablaClientes";
import TablaVentasMini from "../../components/tables/TablaVentasMini";
import AgregarCliente from "../../components/Modal/Clientes/AgregarCliente";
import AgregarVentas from "../../components/Modal/Ventas/AgregarVentas";

const Clientes = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [cargandoClientes, setCargandoClientes] = useState(<Cargando />);
  const [cargandoVentas, setCargandoVentas] = useState(<Cargando />);

  const getVentas = async () => {
    await axios.get(`${API_URL}/api/venta/getALL`).then(
      (response) => {
        // console.log(response.data.data);
        setCargandoVentas(<TablaVentasMini ventas={response.data.data} />);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getClientes = async () => {
    await axios.get(`${API_URL}/api/cliente/getALL`).then(
      (response) => {
        // console.log(response.data.data);
        setCargandoClientes(<TablaClientes clientes={response.data.data} />);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    getClientes();
    getVentas();
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
                    Clientes registrados
                  </h3>
                </div>
                <div className="text-blueGray-700 block">
                  <AgregarCliente />
                </div>
              </div>
            </div>
            {cargandoClientes}
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-blueGray-700">
                    Ventas
                  </h3>
                </div>
                <div className="text-blueGray-700 block">
                  <AgregarVentas />
                </div>
              </div>
            </div>
            {cargandoVentas}
          </div>
        </div>
      </div>
    </>
  );
};

export default Clientes;
