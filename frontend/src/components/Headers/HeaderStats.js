import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

// components
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const { user } = useContext(UserContext);
  const id = user.user.id_admin;

  return (
    <>
      {/* Header */}
      <div className="relative bg-black sm:pt-24 pb-32">
        <div className="px-4 hidden sm:block  md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full sm:w-6/12 xl:w-3/12 px-4">
                <Link to={`/admin/ventas/${id}`}>
                  <CardStats
                    statSubtitle="Ventas"
                    statTitle="0"
                    statArrow="up"
                    statPercent="0"
                    statPercentColor="text-green-500"
                    statDescripiron="Último mes"
                    statIconName="fas fa-dollar-sign fa-lg"
                    statIconColor="bg-green-600"
                    link="/admin/ventas"
                  />
                </Link>
              </div>
              <div className="w-full sm:w-6/12 xl:w-3/12 px-4">
                <Link to={`/admin/productos/${id}`}>
                  <CardStats
                    statSubtitle="Productos"
                    statTitle="0"
                    statArrow="down"
                    statPercent="0"
                    statPercentColor="text-red-500"
                    statDescripiron="Since last week"
                    statIconName="fas fa-cubes fa-lg"
                    statIconColor="bg-orange-500"
                  />
                </Link>
              </div>
              <div className="w-full sm:w-6/12 xl:w-3/12 px-4">
                <Link to={`/admin/clientes/${id}`}>
                  <CardStats
                    statSubtitle="Clientes"
                    statTitle="0"
                    statArrow="down"
                    statPercent="0"
                    statPercentColor="text-red-500"
                    statDescripiron="Since yesterday"
                    statIconName="fas fa-users fa-lg"
                    statIconColor="bg-pink-500"
                  />
                </Link>
              </div>
              <div className="w-full sm:w-6/12 xl:w-3/12 px-4">
                <Link to={`/admin/proveedores/${id}`}>
                  <CardStats
                    statSubtitle="Proveedores"
                    statTitle="0"
                    statArrow="up"
                    statPercent="0"
                    statPercentColor="text-green-500"
                    statDescripiron="Since last month"
                    statIconName="fas fa-truck fa-lg"
                    statIconColor="bg-lightBlue-500"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
