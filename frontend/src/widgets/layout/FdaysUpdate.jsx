import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Tabs,
  TabsBody,
  TabPanel,
  IconButton,
} from "@material-tailwind/react";
import { CreditCardIcon, XMarkIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Tooltip } from "rsuite";

export default function FdaysUpdate({ upItem, setUpItem, setUptOpen }) {
  const [type, setType] = React.useState("card");
  const id = upItem.id ;
  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setUpItem((prev) => ({ ...prev, date: formattedDate }));
  };

  const updateFerieDay = async (e) => {
    e.preventDefault();
    console.log("Données à mettre à jour :", upItem);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token non trouvé, utilisateur non authentifié");
        alert("Vous devez être connecté pour effectuer cette action.");
        return;
      }

      const response = await fetch(`http://localhost:8080/ferie-days/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(upItem),
      });

      if (response.ok) {
        console.log("Mise à jour réussie");
        setUptOpen(false); // Fermer la modal
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de la mise à jour :", errorData);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  useEffect(() => {
    console.log("Élément à mettre à jour :", upItem);
  }, [upItem]);

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center"
      >
        <Tooltip content="Retour">
          <IconButton variant="text" onClick={() => setUptOpen(false)}>
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
          Mettre à jour Jour Férié
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
              <form className="mt-12 flex flex-col gap-4" onSubmit={updateFerieDay}>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Date de Jour Férié
                  </Typography>
                  <DatePicker
                    selected={upItem.date ? new Date(upItem.date) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    className="w-full p-2 border border-blue-gray-200 focus:outline-none focus:border-gray-900"
                  />
                </div>
                <Button size="lg" type="submit">
                  Mettre à jour
                </Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}
