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

export default function LocalUpdate({updateItem ,setUpdateItem}) {
  const [type, setType] = useState("card");
  handleUpdate = async (id, updatedLocal) => {
    const token = localStorage.getItem('token');  // Récupération du token JWT
    console.log("Local à modifier :", id, updatedLocal); // Affiche l'ID et les données mises à jour
    
    try {
      const response = await fetch(`http://localhost:8080/api/locaux/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Ajout du token JWT dans l'en-tête
        },
        body: JSON.stringify(updatedLocal),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        console.log("Local mis à jour avec succès :", updatedData);
      } else {
        console.error(`Erreur lors de la mise à jour : code ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur lors de la mise à jour :", error.message);
    }
  };
  
  

  const handleChange = (e) => {
    const {name ,value} = e.target
    console.log(`Changement détecté : ${name} = ${value}`);
    setUpdateItem(prev => ({...prev ,[name]:value}))
  }

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center"
      >
        <div className="mb-4 h-20 p-6 text-white">
          {type === "card" ? (
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
        <Tabs value={type} className="overflow-visible">
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: { x: type === "card" ? 400 : -400 },
              mount: { x: 0 },
              unmount: { x: type === "card" ? 400 : -400 },
            }}
          >
            <TabPanel value="card" className="p-0">
              <form className="mt-12 flex flex-col gap-4" onSubmit={() => handleUpdate(updateItem.id,updateItem)}>
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
                    placeholder="Nom du département"
                    name="nom"
                    value={updateItem.nom}
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
                    placeholder="Taille ou description"
                    value={updateItem.capacite}
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
                        checked={updateItem.type === "salle"}
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
                        checked={updateItem.type === "amphi"}
                        onChange={handleChange}
                        className="cursor-pointer"
                      />
                      <span>Amphi</span>
                    </label>
                  </div>
                </div>
                <Button size="lg" type="submit">
                  Mettre a jour
                </Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}
