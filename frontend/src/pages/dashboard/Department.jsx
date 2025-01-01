import { useState } from "react";
import DepartmentInput from "@/widgets/layout/DepartmentInput";
import { DepartementTable } from "@/widgets/layout/DepartmentTable";



export function Department({ idsession}) {
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-4">
        <DepartementTable
          isopen={isInputOpen}
          setIsopen={setIsInputOpen}
        />
        {/* Affichage du modal si isSessionInputOpen est vrai */}
        {isInputOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <DepartmentInput idSess={idsession} setInOpen={setIsInputOpen}/>
          </div>
        )}
      </div>
    </div>
  );
}

Department.displayName = "/src/layout/Department.jsx";

export default Department;