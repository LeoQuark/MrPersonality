import { Fragment, useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import { API_URL } from "../../../utils/api-data";

export default function BotonAgregar(props) {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [inputProveedor, setInputProveedor] = useState({});

  const cancelButtonRef = useRef(null);

  const handleInput = (event) => {
    event.preventDefault();
    setInputProveedor({
      ...inputProveedor,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`${API_URL}/api/proveedor/create`, inputProveedor).then(
      (response) => {
        if (response.status === 200) {
          setOpen(false);
          history.push(`/admin/proveedores/${user.user.id_admin}`);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <button
        type="button"
        className="mr-2 p-2 bg-black text-white rounded shadow-md"
        onClick={() => setOpen(true)}
      >
        Agregar Proveedor
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
                <form
                  action=""
                  onSubmit={handleSubmit}
                  enctype="multipart/form-data"
                >
                  <Dialog.Title
                    as="h3"
                    className="p-4 text-lg leading-6 font-medium text-white bg-black flex justify-between"
                  >
                    Agrega un nuevo proveedor
                  </Dialog.Title>
                  <div className="bg-white px-4 pt-4 pb-2 sm:p-4">
                    <div className="sm:flex sm:items-center">
                      <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div className="">
                          <table className="table-auto">
                            <tbody>
                              <tr>
                                <td className="text-sm left">Nombre</td>
                                <td>
                                  <input
                                    type="text"
                                    name="nombre"
                                    onChange={handleInput}
                                    className="my-1 md:mx-6 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="text-sm">Rut</td>
                                <td>
                                  <input
                                    type="text"
                                    name="rut"
                                    onChange={handleInput}
                                    className="py-1 my-1 md:mx-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="text-sm">Nombre Contacto</td>
                                <td>
                                  <input
                                    type="text"
                                    name="nombre_contacto"
                                    onChange={handleInput}
                                    className="my-1 py-1 md:mx-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="text-sm">Correo</td>
                                <td>
                                  <input
                                    type="text"
                                    name="correo"
                                    onChange={handleInput}
                                    className="my-1 py-1 md:mx-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="text-sm">Direcci??n</td>
                                <td>
                                  <input
                                    type="text"
                                    name="direccion"
                                    onChange={handleInput}
                                    className="my-1 py-1 md:mx-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="text-sm">Tel??fono</td>
                                <td>
                                  <input
                                    type="text"
                                    name="telefono"
                                    onChange={handleInput}
                                    className="my-1 py-1 md:mx-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-between sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Agregar
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Salir
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
