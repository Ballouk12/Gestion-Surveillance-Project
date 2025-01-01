
import {
    Sidenav,
    DashboardNavbar,
  } from "@/widgets/layout";
  import routes from "@/routes";
  import { useEffect, useState } from "react";
  import { useLocation } from "react-router-dom";
import { Examens } from "./Examens";
  
  
  export function ExamenPage({idsession}) {
    const location = useLocation();
    const { day, hour } = location.state || {};
    
    return (
      <div className="min-h-screen bg-blue-gray-50/50">
        <div className="p-4">
          <Examens  day={day} hour={hour}/>
        </div>
      </div>
    );
  }
  
  ExamenPage.displayName = "/src/layout/ExamenPage.jsx";
  
  export default ExamenPage;