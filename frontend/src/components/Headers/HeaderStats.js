import React, { useState } from "react";
import { Link } from 'react-router-dom';

// components
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-black md:pt-24 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <Link to="/admin/ventas">
                  <CardStats
                    statSubtitle="Ventas"
                    statTitle="2.000"
                    statArrow="up"
                    statPercent="3.48"
                    statPercentColor="text-green-500"
                    statDescripiron="Último mes"
                    statIconName="fas fa-dollar-sign fa-lg"
                    statIconColor="bg-green-600"
                    link="/admin/ventas"
                  />
                </Link>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <Link to="/admin/productos">
                  <CardStats
                    statSubtitle="Productos"
                    statTitle="450"
                    statArrow="down"
                    statPercent="3.48"
                    statPercentColor="text-red-500"
                    statDescripiron="Since last week"
                    statIconName="fas fa-cubes fa-lg"
                    statIconColor="bg-orange-500"
                  />
                </Link>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <Link to="/admin/clientes">
                  <CardStats
                    statSubtitle="Clientes"
                    statTitle="924"
                    statArrow="down"
                    statPercent="1.10"
                    statPercentColor="text-red-500"
                    statDescripiron="Since yesterday"
                    statIconName="fas fa-users fa-lg"
                    statIconColor="bg-pink-500"
                  />
                </Link>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <Link to="/admin/proveedores">
                  <CardStats
                    statSubtitle="Proveedores"
                    statTitle="49,65%"
                    statArrow="up"
                    statPercent="12"
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
