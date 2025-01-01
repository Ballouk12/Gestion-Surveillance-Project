import { Routes, Route } from "react-router-dom";

import {
  Sidenav,
  DashboardNavbar,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { SessionTable } from "./SessionTable";
import SessionInput from "./SessionIput";
import { useState } from "react";



export function SessionPage() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [isSessionInputOpen ,setIsSessionInputOpen] = useState(false);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-4">
        <DashboardNavbar />
        <SessionTable isopen={isSessionInputOpen} setIsopen={setIsSessionInputOpen}/>
        {/* Affichage du modal si isSessionInputOpen est vrai */}
      {isSessionInputOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <SessionInput setOpen={setIsSessionInputOpen}/>
        </div>
      )}
      </div>
    </div>
  );
}

SessionPage.displayName = "/src/layout/SessionPage.jsx";

export default SessionPage;