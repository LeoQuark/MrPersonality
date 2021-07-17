import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
// components
import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

//context
import UserContext from "../../context/UserContext";

export default function Perfil() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  // console.log(user);

  useEffect(() => {}, [location]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-7/12 px-4">
          <CardSettings user={user.user} />
        </div>
        <div className="w-full lg:w-5/12 px-4 flex items-start">
          <CardProfile user={user.user} />
        </div>
      </div>
    </>
  );
}
