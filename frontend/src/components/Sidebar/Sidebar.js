/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar(props) {
  const user = props.user;
  const [collapseShow, setCollapseShow] = useState("hidden");
  const location = useLocation();

  useEffect(() => {
    setCollapseShow("hidden");
  }, [location]);

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-4">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-blueGray-400 mr-0 inline-block whitespace-nowrap text-sm uppercase px-0 text-center tracking-widestMore"
            to={`/admin/dashboard/${user.id_admin}`}
          >
            Bienvenido
          </Link>

          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-1 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 tracking-widestMore"
                    to={`/admin/dashboard/${user.id_admin}`}
                  >
                    Mr Personality
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-400 text-xs uppercase font-bold block pb-3 no-underline">
              Mi Perfil
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className="my-1 text-blueGray-700 hover:text-blueGray-500 text-xs uppercase font-bold block"
                  to={`/admin/dashboard/${user.id_admin}`}
                >
                  <i className="fas fa-user text-blueGray-400 mx-3 mr-4 text-sm"></i>{" "}
                  {user.nombre}
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-2 my-1 font-bold block " +
                    (window.location.href.indexOf("/admin/perfil") !== -1
                      ? "text-white bg-black rounded-lg hover:bg-gray-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to={`/admin/perfil/${user.id_admin}`}
                >
                  <i
                    className={
                      "fas fa-cogs mx-3 text-sm " +
                      (window.location.href.indexOf("/admin/perfil") !== -1
                        ? "opacity-75"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Usuario
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="mb-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-400 text-xs uppercase font-bold block pb-1 no-underline">
              Secciones
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-2 my-1 font-bold block " +
                    (window.location.href.indexOf("/admin/dashboard") !== -1
                      ? "text-white bg-black rounded-lg hover:bg-gray-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to={`/admin/dashboard/${user.id_admin}`}
                >
                  <i
                    className={
                      "fas fa-th-large mx-3 text-sm " +
                      (window.location.href.indexOf("/admin/dashboard") !== -1
                        ? "opacity-75"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Inicio
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-2 my-1 font-bold block " +
                    (window.location.href.indexOf("/admin/ventas") !== -1
                      ? "text-white bg-black rounded-lg hover:bg-gray-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to={`/admin/ventas/${user.id_admin}`}
                >
                  <i
                    className={
                      "fas fa-dollar-sign mx-3 mr-4 text-sm " +
                      (window.location.href.indexOf("/admin/ventas") !== -1
                        ? "opacity-75"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Ventas
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-2 my-1 font-bold block " +
                    (window.location.href.indexOf("/admin/productos") !== -1
                      ? "text-white bg-black rounded-lg hover:bg-gray-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to={`/admin/productos/${user.id_admin}`}
                >
                  <i
                    className={
                      "fas fa-cubes mx-3 text-sm " +
                      (window.location.href.indexOf("/admin/productos") !== -1
                        ? "opacity-75"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Productos
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-2 my-1 font-bold block " +
                    (window.location.href.indexOf("/admin/clientes") !== -1
                      ? "text-white bg-black rounded-lg hover:bg-gray-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to={`/admin/clientes/${user.id_admin}`}
                >
                  <i
                    className={
                      "fas fa-users mx-2 text-sm " +
                      (window.location.href.indexOf("/admin/clientes") !== -1
                        ? "opacity-75"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Clientes
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-2 my-1 font-bold block " +
                    (window.location.href.indexOf("/admin/proveedores") !== -1
                      ? "text-white bg-black rounded-lg hover:bg-gray-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to={`/admin/proveedores/${user.id_admin}`}
                >
                  <i
                    className={
                      "fas fa-truck mx-2 text-sm " +
                      (window.location.href.indexOf("/admin/proveedores") !== -1
                        ? "opacity-75"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Proveedores
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-2 my-1 font-bold block " +
                    (window.location.href.indexOf("/admin/tables") !== -1
                      ? "text-white bg-black rounded-lg hover:bg-gray-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to={`/admin/tables/${user.id_admin}`}
                >
                  <i
                    className={
                      "fas fa-table mx-2 text-sm " +
                      (window.location.href.indexOf("/admin/tables") !== -1
                        ? "opacity-75"
                        : "text-blueGray-500")
                    }
                  ></i>{" "}
                  Tablas
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/auth/login"
                >
                  <i className="fas fa-fingerprint text-blueGray-400 mx-2 text-sm"></i>{" "}
                  Cerrar sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
