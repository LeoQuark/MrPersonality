import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../utils/api-data";
//Context
import UserContext from "../../context/UserContext";

//component
import Cargando from "../../components/Cargando";
import TablaClientes from "../../components/tables/TablaClientes";
import AgregarCliente from "../../components/Modal/Clientes/AgregarCliente";

const Ventas = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [cargandoVentas, setCargandoVentas] = useState(<Cargando />);

  const getClientes = async () => {
    await axios.get(`${API_URL}/api/venta/getALL`).then(
      (response) => {
        // console.log(response.data.data);
        setCargandoVentas(<TablaClientes ventas={response.data.data} />);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    getClientes();
    // console.log(productos);
  }, [location]);

  return (
    <>
      <div className="flex flex-wrap mt-4 text-white">
        <div className="w-full lg:w-12/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-blueGray-700">
                    Ventas registrados
                  </h3>
                </div>
                <div className="text-blueGray-700 block">
                  {/* <AgregarCliente /> */}
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

export default Ventas;
