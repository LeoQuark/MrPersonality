import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  setUserSessionStorage,
  removeUserSessionStorage,
} from "../../utils/sessionStorage";
import UserContext from "../../context/UserContext";

export default function Login() {
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
      .post(`http://localhost:4000/api/auth/login`, userData)
      .then(
        (response) => {
          if (response.status == 200) {
            setErrorSubmit(false);
            // console.log(response.status);
            console.log(response);
            const token = response.data.token;
            const user = JSON.stringify(response.data.user);
            setUser(JSON.parse(user));
            console.log("user", user);
            setUserSessionStorage(token, user);
            history.push(`/admin/${response.data.user.id_admin}`);
          } else {
            console.log("object");
          }
        },
        (error) => {
          console.log();
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
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <h3 className="text-blueGray-600 mr-0 inline-block whitespace-nowrap text-lg uppercase font-bold p-4 px-0 my-10 tracking-widestMore ">
                    Mr Personality
                  </h3>
                </div>
                <form onSubmit={handleSubmit}>
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
                    <div>
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
                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Recordar contraseña
                      </span>
                    </label>
                  </div> */}
                  <div className="text-center mt-8">
                    <button
                      className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex mt-6 relative justify-end">
              {/* <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div> */}
              <div className="">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Crear una nueva cuenta</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
