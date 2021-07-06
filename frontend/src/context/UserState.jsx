import React, { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

//Creación del estado global User, donde se hará uso de useContext y useReducer.
export const UserState = (props) => {
  const initialState = {
    // user: {
    //   name: "Leonardo Peña",
    //   age: 23,
    //   email: "leonardo.pfuentes@gmail.com",
    // },
    user: {},
  };

  const [user, dispatch] = useReducer(UserReducer, { user: {} });

  const setUser = (datos) => {
    console.log(datos);
    dispatch({
      type: "SET_USER",
      payload: datos,
    });
  };

  //Se retorna el UserContext.Provider para que los hijos de este componente puedan acceder a los valores del state global User y sus metodos o funciones.
  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
