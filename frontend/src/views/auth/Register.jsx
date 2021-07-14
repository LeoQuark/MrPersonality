import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  setUserSessionStorage,
  removeUserSessionStorage,
} from "../../utils/sessionStorage";
import UserContext from "../../context/UserContext";

export default function Register() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [showPass, setShowPass] = useState(false);
  const [userData, setUserData] = useState({});
  const [errorSubmit, setErrorSubmit] = useState(false);

  const handleShowPass = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  const handleInputData = (event) => {
    event.preventDefault();
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    // console.log(userData);
  };

  // Funcion para enviar los datos al backend y loggearse con axios.post
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(userData);

    const submit = await axios
      .post(`http://localhost:4000/api/admin/create`, userData)
      .then(
        async (response) => {
          if (response.status === 200) {
            // console.log(userData, userData.correo, userData.password);
            const login = await axios
              .post(`http://localhost:4000/api/auth/login`, {
                correo: userData.correo,
                password: userData.password,
              })
              .then(
                (response) => {
                  if (response.status === 200) {
                    setErrorSubmit(false);
                    // console.log(response.status);
                    // console.log(response);
                    const token = response.data.token;
                    const user = JSON.stringify(response.data.user);
                    setUser(JSON.parse(user));
                    console.log("user", user);
                    setUserSessionStorage(token, user);
                    history.push(`/admin/${response.data.user.id_admin}`);
                  }
                },
                (error) => {
                  console.log(error);
                  setErrorSubmit(true);
                }
              );
          } else {
            console.log("object");
          }
        },
        (error) => {
          console.log(error);
          setErrorSubmit(true);
        }
      );
  };

  useEffect(() => {
    removeUserSessionStorage();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <div className="flex justify-center">
                  <img
                    src={require("assets/img/logo-mrpersonality.png").default}
                    className="h-1/4 w-1/4"
                  />
                </div>
                <h3 className="text-blueGray-600 mr-0 inline-block whitespace-nowrap text-lg uppercase font-bold py-2 px-0 tracking-widestMore ">
                  Mr Personality
                </h3>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nombre
                    </label>
                    <input
                      name="nombre"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nombre"
                      onChange={handleInputData}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Correo
                    </label>
                    <input
                      name="correo"
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Correo"
                      onChange={handleInputData}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contraseña
                    </label>
                    <div className="">
                      <span
                        type="button"
                        className="absolute right-0 p-2 px-3 text-blueGray-500"
                        onClick={handleShowPass}
                      >
                        {showPass ? (
                          <i className="far fa-eye fa-lg"></i>
                        ) : (
                          <i className="far fa-eye-slash fa-lg"></i>
                        )}
                      </span>
                      <input
                        name="password"
                        type={showPass ? "text" : "password"}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Contraseña"
                        onChange={handleInputData}
                      />
                    </div>
                  </div>
                  {errorSubmit && (
                    <div
                      className={
                        "m-3 pt-3 errorAlert" +
                        `${setInterval(() => setErrorSubmit(false), 5000)}`
                      }
                    >
                      <div className="p-2 px-3 bg-red-200 text-red-600 border-2 border-red-300 rounded-md ">
                        <p>
                          Error al iniciar sesión, revisa tu correo o tu
                          contraseña !
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="text-center mt-8">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Crear cuenta
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex mt-6 relative justify-end">
              <div className="">
                <Link to="/auth/login" className="text-blueGray-200">
                  <small>Accede con tu cuenta</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
