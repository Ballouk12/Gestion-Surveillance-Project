
import {
  Sidenav,
  DashboardNavbar,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { EnseignantTable } from "./EnseignantTable";
import { useState } from "react";
import EnseingnantInput from "./EnseignentInput";
import EnseingnantUpdate from "./EnsignentUpdate";
import { useLocation } from "react-router-dom";


export function EnseignantPage() {
  const [controller, dispatch] = useMaterialTailwindController();
  const location = useLocation();
  const dataReceived = location.state;
  const { sidenavType } = controller;
  const [open ,setOpen] = useState(false);
  const [upItem ,setUpItem] = useState(dataReceived)
  const [openUp ,setOpenUp] = useState(false)
  const [count ,setCout] = useState(0)

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-4">
        
        <EnseignantTable departementId={dataReceived} updateItem = {upItem} setUpdateItem = {setUpItem   } isopen={open} setIsopen={setOpen} setOpenUp={setOpenUp} count={count}/>
        {/* Affichage du modal si open est vrai */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <EnseingnantInput deptId={dataReceived} upItem ={upItem}  setUpItem={setUpItem} setOpen={setOpen} setCount={setCout} count={count}/>
        </div>
      )}
         {openUp && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <EnseingnantUpdate upItem ={upItem}  setUpItem={setUpItem} setOpen={setOpenUp} count={count} setCount={setCout}/>
        </div>
      )}
      </div>
    </div>
  );
}

EnseignantPage.displayName = "/src/layout/EnseignantPage.jsx";

export default EnseignantPage;