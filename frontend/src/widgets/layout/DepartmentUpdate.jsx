import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@material-tailwind/react";
import {
  CreditCardIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "rsuite";



export default function DepartmentUpdate({upItem ,setUpItem ,seUptOpen}) {

  const [type, setType] = React.useState("card");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpItem(prev => ({...prev, [name]: value }));
  };

  const updateDepartement = (id, nouveauNom) => {
    console.log("Nouveau nom envoyé : ", nouveauNom);
  
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token non trouvé, utilisateur non authentifié");
      alert("Vous devez être connecté pour effectuer cette action.");
      return;
    }
  
    fetch(`http://localhost:8080/api/departements/${id}?nouveauNom=${encodeURIComponent(nouveauNom)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Ajout du token dans l'en-tête
      },
    })
      .then((response) => {
        if (response.ok) {
          seUptOpen(false); // Fermer la fenêtre en cas de succès
          console.log("Mise à jour du département réussie");
        } else {
          console.error("Erreur lors de la mise à jour :", response.status);
        }
      })
      .catch((error) => {
        console.error("Erreur réseau :", error);
      });
  };
  
  


  useEffect( () => {
    console.log("element a mettre a jour " ,upItem);
    setUpItem(upItem)
  },[])

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center"
      >
        <Tooltip content="go back">
            <IconButton variant="text" onClick={() => (seUptOpen(false))}>
                <XMarkIcon className="h-6 w-5 text-white" />
            </IconButton>
        </Tooltip>
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
          Departement
        </Typography>
      </CardHeader>
      <CardBody>
        <Tabs value={type} className="overflow-visible">
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: {
                x: type === "card" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "card" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="card" className="p-0">
              <form className="mt-12 flex flex-col gap-4" onSubmit={() => updateDepartement(upItem.id,upItem.nom)}>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Nom Deaprtement
                  </Typography>
                  <Input
                    type="departement"
                    placeholder="departement"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="nom"
                    value={upItem.nom}
                    onChange={handleChange}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <Button size="lg" type="submit">mettre  a jour</Button>
    
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}
