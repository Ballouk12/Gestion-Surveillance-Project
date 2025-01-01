import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import React, { useEffect, useState } from "react";
import EnseignantPage from "@/widgets/layout/EnseignantPage";
import { ExamenPage } from "@/widgets/layout/ExamenPage";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const location = useLocation();
    const data = location.state;

    const [idsession , setIdSession] = useState({id:0});


  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/ensaj-logo.jpg" : "/img/ensaj-logo.jpg"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={React.isValidElement(element)
                  ? React.cloneElement(element, {idsession ,setIdSession})
                  : element} />
              ))
          )}
       <Route path="/enseignants" element={<EnseignantPage />} />
       <Route path="/exam" element={<ExamenPage idsession={idsession}/>} />
       </Routes>
        <div className="text-blue-gray-600">
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
