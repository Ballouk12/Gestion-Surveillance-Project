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
} from "@material-tailwind/react";
import { CreditCardIcon } from "@heroicons/react/24/solid";

export default function OptionInput({ setInOpen }) {
  const [type, setType] = React.useState("card");
  const [departements, setDepartements] = useState([]);
  const [data, setData] = useState({
    departement: {
      id: 0,
    },
    nom: "",
  });

  useEffect(() => {
    const fetchDepartements = async () => {
      const token = localStorage.getItem('token');  // Récupération du token JWT
      try {
        const response = await fetch("http://localhost:8080/api/departements", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Ajout du token JWT dans l'en-tête
          },
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des départements");
        }
  
        const data = await response.json();
        setDepartements(data);
      } catch (err) {
        console.error("Erreur :", err.message);
      }
    };
  
    fetchDepartements();
  }, []);  // Dépendances de useEffect
  

  const send = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');  // Récupération du token JWT
  
    try {
      const response = await fetch("http://localhost:8080/api/options", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Ajout du token JWT dans l'en-tête
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Réponse du serveur :", result);
        setInOpen(false);
      } else {
        console.error("Erreur lors de l'envoi des données :", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    setData((prev) => ({
      ...prev,
      departement: { id: selectedId },
    }));
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
          Module
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
              <form className="mt-12 flex flex-col gap-4" onSubmit={send}>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Nom Module
                  </Typography>
                  <Input
                    type="text"
                    placeholder="Nom du module"
                    name="nom"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    onChange={handleChange}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Département
                  </Typography>
                  <select
                    name="departement"
                    className="w-full border rounded px-3 py-2"
                    onChange={handleDepartmentChange}
                    value={data.departement.id}
                  >
                    <option value={0} disabled>
                      Sélectionner un département
                    </option>
                    {departements.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.nom}
                      </option>
                    ))}
                  </select>
                </div>
                <Button size="lg" type="submit">
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
