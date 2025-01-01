import { Routes, Route } from "react-router-dom";

import { useState } from "react";
import LocalInput from "@/widgets/layout/LocalInput";
import { LocalTable } from "@/widgets/layout/LocalTable";



export function Local() {
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-4">
        <LocalTable
          isopen={isInputOpen}
          setIsopen={setIsInputOpen}
        />
        {/* Affichage du modal si isSessionInputOpen est vrai */}
        {isInputOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <LocalInput />
          </div>
        )}
      </div>
    </div>
  );
}

Local.displayName = "/src/layout/Local.jsx";

export default Local;