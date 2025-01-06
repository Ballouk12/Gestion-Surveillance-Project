import { useState } from "react";
import FdaystInput from "./Fdaysinput";
import { Fdays } from "./Fdays";



export function FdaysPage({ idsession}) {
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-4">
        <Fdays
          isopen={isInputOpen}
          setIsopen={setIsInputOpen}
        />
        {isInputOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <FdaystInput  setInOpen={setIsInputOpen}/>
          </div>
        )}
      </div>
    </div>
  );
}

FdaysPage.displayName = "/src/layout/FdaysPage.jsx";

export default FdaysPage;