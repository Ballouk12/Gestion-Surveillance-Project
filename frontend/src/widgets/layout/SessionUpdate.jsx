import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Tabs,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { BackwardIcon, CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { DateRangePicker } from "react-date-range"; // Import correct du DateRangePicker
import "react-date-range/dist/styles.css"; // CSS de base
import "react-date-range/dist/theme/default.css"; // CSS thème par défaut
import { IconButton, Tooltip } from "rsuite";

export default function SessionUpdate({ updateItem, setUpdateItem ,setRenderUpdateItem}) {
  const [type, setType] = useState("card");
  const [dateRange, setDateRange] = useState([
    {
      dateDebut: new Date(updateItem.dateDebut),
      dateFin: new Date(updateItem.dateFin),
      key: "selection",
    },
  ]);

  const update = async (id) => {
    const token = localStorage.getItem('token');  // Récupération du token JWT
  
    try {
      const response = await fetch(`http://localhost:8080/api/sessions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Ajout du token JWT dans l'en-tête
        },
        credentials: "include",
        body: JSON.stringify(updateItem),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Réponse du serveur :", result);
        setRenderUpdateItem(false);
        console.log("Le résultat :", result);
      } else {
        console.error("Erreur lors de l'envoi des données :", response.status);
      }
    } catch (error) {
      console.log("Erreur réseau :", error);
    }
  };
  
  

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    setUpdateItem((prevData) => ({
      ...prevData,
      dateDebut: ranges.selection.startDate.toISOString().split("T")[0],
      dateFin: ranges.selection.endDate.toISOString().split("T")[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateItem((prev) => ({ ...prev, [name]: value }));
  };


  const updt = () =>{
    console.log("afficher les donnees a mettre a jour ");
    console.log(updateItem)
  }
  return (
    <Card className="w-full max-w-[40rem] h-[90vh] flex flex-col justify-between overflow-auto p-4">
        <Tooltip content="go back">
            <IconButton variant="text" onClick={() => (setRenderUpdateItem(false))}>
                <BackwardIcon className="h-6 w-5 text-black"/>
            </IconButton>
        </Tooltip>
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="grid place-items-center px-4 py-4 text-center"
      >
        <div className="mb-2 h-16 text-white flex items-center justify-center">
          <CreditCardIcon className="h-8 w-8 text-white" />
        </div>
        <Typography variant="h5" color="white">
          Mettre a jour la Session
        </Typography>
      </CardHeader>

      {/* Contenu */}
      <CardBody className="flex-1 overflow-y-auto">
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
              <form className="flex flex-col gap-4">
                {/* Type de session */}
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Type de session
                  </Typography>
                  <select
                    name="typeSession"
                    value={updateItem.typeSession}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-400"
                  >
                    <option value="Session Normale">Session Normale</option>
                    <option value="Session Rattrapage">Session Rattrapage</option>
                  </select>
                </div>

                {/* Date picker */}
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  Date
                </Typography>
                <div className="w-full">
                  <DateRangePicker
                    ranges={dateRange}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Horaires de session */}
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-medium"
                >
                  Les Horaires de session
                </Typography>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((index) => (
                    <React.Fragment key={index}>
                      <div>
                        <label className="block text-sm font-medium text-blue-gray-500">
                          Start Time {index}
                        </label>
                        <input
                          type="time"
                          name={`debut${index}`}
                          value={updateItem[`debut${index}`]}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-gray-500">
                          End Time {index}
                        </label>
                        <input
                          type="time"
                          name={`fin${index}`}
                          value={updateItem[`fin${index}`]}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-400"
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>

      {/* Bouton d'ajout */}
      <div className="p-4">
        <Button size="lg" className="w-full" onClick={() => update(updateItem.id)}>
          Met a jour
        </Button>
      </div>
    </Card>
  );
}
