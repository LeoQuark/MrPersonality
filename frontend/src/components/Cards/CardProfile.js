import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../../utils/api-data";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

//context
import UserContext from "../../context/UserContext";

export default function CardProfile({ user }) {
  const [usuario, setUsuario] = useState({});
  console.log(user, "user");
  const history = useHistory();

  // console.log(user);
  const getAdmin = async () => {
    axios.get(`${API_URL}/api/admin/get/${user.id_admin}`).then(
      (response) => {
        if (response.status === 200) {
          setUsuario(response.data.data);
          history.push(`/admin/perfil/${user.id_admin}`);
        }
      },
      (error) => {
        console.log(error);
        setUsuario(user);
      }
    );
  };

  useEffect(() => {
    getAdmin();
  }, []);

  //funcion para extraer el valor de uploads\ del string de la imagen del producto
  // const separarUrl = (cadena) => cadena.slice(8);
  return (
    <>
      {usuario && (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="..."
                    // src={
                    //   !user.user.imagen != undefined
                    //     ? `${API_URL}/${user.user.imagen.slice(8)}`
                    //     : require("assets/img/team-2-800x800.jpg").default
                    // }
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  />
                </div>
              </div>
              <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="text-center mt-1">
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {usuario.nombre}
                    </h3>
                    <h3 className="text-xl my-2 font-mono leading-normal mb-2 text-blueGray-500 mb-2">
                      {usuario.correo}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
