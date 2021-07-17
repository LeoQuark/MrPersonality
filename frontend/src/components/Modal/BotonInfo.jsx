/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { API_URL } from "../../utils/api-data";

export default function BotonInfo({ info }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  //funcion para extraer el valor de uploads\ del string de la imagen del info
  const separarUrl = (cadena) => cadena.slice(8);
  // console.log(info);
  return (
    <>
      <button
        type="button"
        className="mx-1 p-2 bg-gray-500 font-bold text-white rounded shadow-md"
        onClick={() => setOpen(true)}
      >
        Info
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          open={open}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8305;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <Dialog.Title
                  as="h3"
                  className="p-4 text-lg leading-6 font-medium text-white bg-black flex justify-between"
                >
                  <div>{`Información del info - ${info.nombre}`}</div>
                  <div>{`id : ${info.id_producto}`}</div>
                </Dialog.Title>
                <div className="bg-white pt-4 pb-2 sm:py-4">
                  <div className="sm:flex items-start lg:items-stretch justify-evenly w-full">
                    <div className="px-2">
                      <img
                        src={
                          info.imagen
                            ? `${API_URL}/${separarUrl(info.imagen)}`
                            : require("assets/img/logo-mrpersonality.png")
                                .default
                        }
                        style={{ width: "300px", height: "300px" }}
                      />
                    </div>
                    <div className="mt-4 md:mt-0 mx-4 sm:ml-0 flex justify-center md:block">
                      <table className="">
                        <tbody>
                          {/* {info.values.map((dato) => (
                            <tr className="bg-blueGray-200">
                              <td className="text-sm px-6">{}</td>
                              <td className="text-sm pl-10">{dato}</td>
                            </tr>
                          ))} */}
                          {/* {console.log(Object.keys(info))} */}
                          {Object.keys(info).map((dato, key) => (
                            <tr
                              className={
                                key % 2 != 1 ? "bg-blueGray-200" : "bg-white"
                              }
                            >
                              {dato != "imagen" && (
                                <>
                                  <td className="text-sm px-6">{dato}</td>
                                  <td className="text-sm pl-10">
                                    {info[`${dato}`]}
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-between sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Salir
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
