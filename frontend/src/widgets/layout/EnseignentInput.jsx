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
  Radio,
} from "@material-tailwind/react";
import {
  CreditCardIcon,
} from "@heroicons/react/24/solid";



export default function EnseingnantInput({deptId,setOpen,setCount,count}) {

  const [type, setType] = React.useState("card");
  const [data ,setData] = useState({
    departement: { id :Number(deptId.departement)}, 
    nom: "",
    prenom: "",
    email: "",
    estReserviste: false,
    nbrSurveillance: 0,
    phone:"",
    estDispense: ""
  })

  const addEnseignant = (enseignant) => {
    console.log("Les données à envoyer", enseignant);
    console.log("L'ID à envoyer", deptId);
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token non trouvé, utilisateur non authentifié");
      alert("Vous devez être connecté pour ajouter un enseignant.");
      return;
    }
  
    fetch('http://localhost:8080/api/enseignants', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(enseignant), 
    })
      .then((response) => {
        if (response.ok) {
          setCount(count + 1);
          setOpen(false);
          return response.json(); // Si la requête réussie, on retourne la réponse sous forme de JSON
        } else {
          throw new Error('Erreur lors de l\'ajout de l\'enseignant');
        }
      })
      .then((data) => {
        console.log('Enseignant ajouté avec succès:', data);
        // Vous pouvez ajouter l'enseignant à votre état ou effectuer d'autres actions
      })
      .catch((error) => {
        console.error('Erreur:', error);
      });
  };
  
  



  const handleChange = (e) => {
    const {name ,value} = e.target
    setData(prev => ({...prev ,[name] : value}))
  }

  return (
    <Card className="">
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
          Enseignant
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
              {/* <form className="mt-12 flex flex-col gap-4" onSubmit={() => addEnseignant(data)}> */}
                <form className="mt-12 flex flex-col gap-4">
                <div className="flex flex-row gap-5">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Nom 
                  </Typography>
                  <Input
                    type="enseignant"
                    placeholder="nom"
                    name="nom"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
                    Prenom
                  </Typography>
                  <Input
                    type="enseignant"
                    placeholder="prenom"
                    name="prenom"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    onChange={handleChange}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Email
                  </Typography>
                  <Input
                    type="enseignant"
                    placeholder="email"
                    name="email"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
                    Phone
                  </Typography>
                  <Input
                    type="enseignant"
                    placeholder="phone"
                    name="phone"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    onChange={handleChange}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="flex gap-10">
                <Radio
                name="estDispense" 
                value="oui" 
                checked={data.estDispense === "oui"} 
                ripple={false}
                icon={<Icon />}
                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                label={
                    <Typography color="blue-gray" className="font-normal text-blue-gray-400">
                    Dispense
                    </Typography>
                }
                onChange={handleChange} 
                />
                <Radio
                name="estDispense" // Nom identique à celui de la propriété
                value="non" // Valeur associée à ce bouton radio
                checked={data.estDispense === "non"} // Si la valeur de estDispense est "non", ce radio sera sélectionné
                defaultChecked
                ripple={false}
                icon={<Icon />}
                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                label={
                    <Typography color="blue-gray" className="font-normal text-blue-gray-400">
                    Non dispense
                    </Typography>
                }
                onChange={handleChange} // Déclenche handleChange lors du changement
                />
            </div>
                <Button size="lg" onClick={() => addEnseignant(data)}>Ajouter</Button>
    
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}


const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-full w-full scale-105">
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);