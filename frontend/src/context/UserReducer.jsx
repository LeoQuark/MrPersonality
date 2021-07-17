/* eslint-disable import/no-anonymous-default-export */
import { SET_USER } from "./types";

/*
    Creación de las acciones que podrá realizar el estado global User
    Las acciones estan declaradas como string en 'types.js' 
*/
export default (state, action) => {
  const { payload, type } = action;
  // console.log("payload", payload);
  switch (type) {
    case SET_USER:
      return {
        user: payload,
      };
    default:
      return state;
  }
};
