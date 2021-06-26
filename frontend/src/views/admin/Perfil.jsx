import React, { useState, useEffect } from "react";
// Session storage
import {
  getTokenSessionStorage,
  getUserSessionStorage,
} from "../../utils/sessionStorage";

// components
import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

export default function Perfil() {
  const [token, setToken] = useState();
  const [userData, setUserData] = useState({});
  // console.log(token, userData);
  useEffect(() => {
    const getSessionStorage = () => {
      setToken(getTokenSessionStorage());
      setUserData(getUserSessionStorage());
    };
    getSessionStorage();
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-7/12 px-4">
          <CardSettings user={userData} />
        </div>
        <div className="w-full lg:w-5/12 px-4">
          <CardProfile user={userData} />
        </div>
      </div>
    </>
  );
}
