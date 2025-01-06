import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { CreditCardIcon } from "@heroicons/react/24/solid";

export default function LocalInput() {
  const [typee, setType] = useState("card");
  const [localData ,setLocalData] = useState(
    {
      nom:"",
      capacite:"",
      type:"",
    }
  )

  const handleChange = (e) => {
   const {name ,value} = e.target ;
   setLocalData(prev => ({...prev,[name] :value}));

  }
  const createLocal = async (localData) => {
    const token = localStorage.getItem('token');  // Récupération du token JWT
  
    try {
      const response = await fetch("http://localhost:8080/api/locaux", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Ajout du token JWT dans l'en-tête
        },
        body: JSON.stringify(localData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Local créé avec succès :", result);
        return result;
      } else {
        console.error("Erreur lors de la création du local :", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };
  
  

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center"
      >
        <div className="mb-4 h-20 p-6 text-white">
          {typee === "card" ? (
            <CreditCardIcon className="h-10 w-10 text-white" />
          ) : (
            <img
              alt="paypal"
              className="w-14"
              src="https://docs.material-tailwind.com/icons/paypall.png"
            />
          )}
        </div>
        <Typography variant="h5" color="white">
          Local
        </Typography>
      </CardHeader>
      <CardBody>
        <Tabs value={typee} className="overflow-visible">
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: { x: typee === "card" ? 400 : -400 },
              mount: { x: 0 },
              unmount: { x: typee === "card" ? 400 : -400 },
            }}
          >
            <TabPanel value="card" className="p-0">
              <form className="mt-12 flex flex-col gap-4" onSubmit={() => createLocal(localData)}>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Nom
                  </Typography>
                  <Input
                    type="text"
                    placeholder="Nom du local"
                    name="nom"
                    value={localData.nom}
                    onChange={handleChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Taille
                  </Typography>
                  <Input
                    type="text"
                    name="capacite"
                    placeholder="Taille"
                    value={localData.capacite}
                    onChange={handleChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Type
                  </Typography>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="type"
                        value="salle"
                        checked={localData.type === "salle"}
                        onChange={handleChange}
                        className="cursor-pointer"
                      />
                      <span>Salle</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="type"
                        value="amphi"
                        checked={localData.type  === "amphi"}
                        onChange={handleChange}
                        className="cursor-pointer"
                      />
                      <span>Amphi</span>
                    </label>
                  </div>
                </div>
                <Button size="lg" type="submit" >
                  Ajouter
                </Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}
