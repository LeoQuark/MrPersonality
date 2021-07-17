import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../utils/api-data";
import { useHistory, useLocation } from "react-router-dom";

export default function CardSettings(props) {
  const user = props.user;
  const formData = new FormData();
  const history = useHistory();
  const location = useLocation();

  const [infoUser, setInfoUser] = useState({});
  const [fileData, setFileData] = useState({});

  const handleInput = (event) => {
    event.preventDefault();
    if (event.target.name === "imagen") {
      setFileData(event.target.files[0]);
    }
    setInfoUser({
      ...infoUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    formData.append("nombre", infoUser.nombre);
    formData.append("correo", infoUser.correo);
    formData.append("imagen", fileData);
    const agregar = await axios
      .put(`${API_URL}/api/admin/update/${user.id_admin}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            history.push(`/admin/perfil/${user.id_admin}`);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {}, [location]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">Mi Pefil</h6>
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informaciónn de usuario
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user.nombre}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    name="correo"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user.correo}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="w-full mt-4 mx-4">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  imagen
                </label>
                <input
                  type="file"
                  name="imagen"
                  accept="image/png, image/jpeg"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
