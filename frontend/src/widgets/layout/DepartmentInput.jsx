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
import {
  CreditCardIcon,
} from "@heroicons/react/24/solid";



export default function DepartmentInput({idSess ,setInOpen}) {

  const [type, setType] = React.useState("card");
  const [data ,setData] = useState({
    nom : ""
  })
  const send = async () => {
    console.log(data)
    try{
  
    const response = await fetch("http://localhost:8080/api/departements" ,{method : "POST" , headers : {"Content-Type" : "application/json"},credentials: 'include', body : JSON.stringify(data)});
    if (response.ok) {
      const result = await response.json();
      console.log("Réponse du serveur :", result);
      console.log("le resultat ");
      console.log(result);
      setInOpen(false)
  } else {
      console.error("Erreur lors de l'envoi des données :", response.status);
  }
  } catch (error) {
  console.error("Erreur réseau :", error); 
  }
  
  }

  const handleChange = (e) => {
    const {name ,value} = e.target
    setData(prev => ({...prev ,[name] : value}))
  }
  useEffect( () => {
    console.log("id session de puis dept " ,idSess);
  },[])

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
              <form className="mt-12 flex flex-col gap-4" onSubmit={send}>
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
                    name="nom"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    onChange={handleChange}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <Button size="lg" type="submit">Ajouter</Button>
    
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}
