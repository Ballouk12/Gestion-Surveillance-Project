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
import { CreditCardIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function FdaystInput({ setInOpen }) {
  const [type, setType] = useState("card");
  const [data, setData] = useState({
    date: "", // Initialisation de la date
  });

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setData((prev) => ({ ...prev, date: formattedDate }));
  };

  const send = async (e) => {
    e.preventDefault();
    console.log("Données à envoyer :", data);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token non trouvé, utilisateur non authentifié");
        alert("Vous devez être connecté pour effectuer cette action.");
        return;
      }

      const response = await fetch("http://localhost:8080/ferie-days", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Réponse du serveur :",response);
        setInOpen(false); // Fermer la modal
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de l'envoi des données :", errorData);
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
          Jour Férié
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
              <form className="mt-12 flex flex-col gap-4" onSubmit={send}>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Date de Jour Férié
                  </Typography>
                  <DatePicker
                    selected={data.date ? new Date(data.date) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    className="w-full p-2 border border-blue-gray-200 focus:outline-none focus:border-gray-900"
                  />
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
