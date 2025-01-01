import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import {TrashIcon , CheckIcon} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SessionUpdate from "./SessionUpdate";
      
  const TABLE_HEAD = ["Type", "Date debut", "Date fin", "Action"];

   
  export function SessionTable({isopen ,setIsopen}) {
    const navigate = useNavigate();
    const [sessions ,setSessions] = useState([])
    const [delId ,setDelId] = useState()
    const [updateItem ,setUpdateItem] = useState({
      typeSession: "Session Normale de printemps",
      dateDebut: "",
      dateFin: "",
      debut1: "08:30",
      fin1: "10:00",
      debut2: "10:30",
      fin2: "12:00",
      debut3: "13:30",
      fin3: "15:00",
      debut4: "16:00",
      fin4: "17:30",
    })
    const [upOpen ,setUpOpen] = useState(false)
    const [open ,setOpen] = useState(false)
    const [renderUpdateItem, setRenderUpdateItem] = useState(false);
    const images = {"Session Rattrapage d'hiver" : "img/rattrapage.jpg" ,"Session Normale d'hiver" : "img/normal.jpg","Session Rattrapage de printemps":"img/rattrapage.jpg" ,"Session Normale de printemps" : "img/normal.jpg","Session Normale" : "img/normal.jpg"}
    
  const getAllSessions = async () => {
    try{
  
    const response = await fetch("http://localhost:8080/api/sessions" ,{method : "GET" , headers : {"Content-Type" : "application/json"},credentials: 'include'});
    if (response.ok) {
      const result = await response.json();
      console.log("Réponse du serveur :", result);
      setSessions(result) ;
  } else {
      console.error("Erreur lors de l'envoi des données :", response.status);
  }
  } catch (error) {
       console.log("Erreur réseau :", error); 
  }
  }

  const update = (id) => {
    const findedItem = sessions.find(row => row.id === id);
    setUpdateItem(prev => ({...prev , ...findedItem}));
    setRenderUpdateItem(true);

    console.log("l'element a modifier" , updateItem)
    console.log("l'element trouver " , findedItem)
    setRenderUpdateItem(true)
  }
  
  const deleteSession = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/sessions/${id}`, {
        method: "DELETE",
        credentials: "include", // Si vous gérez les cookies ou les sessions
      });
  
      if (response.ok) {
        console.log(`Session avec l'ID ${id} supprimée avec succès.`);
        // Mettre à jour l'état ou effectuer une action après suppression
        setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
      } else {
        console.error(`Erreur lors de la suppression de la session : ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };
  
  
  const handlePreDelete =  (id) => { 
    setDelId(id)
    setOpen(true) ;
  }

  const handleDelete = () => {
    console.log("id a supprimer " ,delId)
  }

  useEffect( () => {
    const fetchSessions = async () => {
      try {
        await getAllSessions() ;
      } catch (error) {
          console.log("error lors de la recupration des sessions" ,error) ;
      }
    }
    fetchSessions() ;
  } ,[isopen,renderUpdateItem]) ;

  
    return (
      <>
      <Card className="h-full w-full mt-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Session
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Voir les informations sur tous les session
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="sm" onClick={() => setIsopen(true)}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map(
                ({ id,typeSession, dateDebut,dateFin }, index) => {
                  const isLast = index === sessions.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                   
                  return (
                    
                    <tr key={typeSession} >
                     
                      <td className={classes}  >
                      <Link to={`/dashboard/home/${id}`}>
                        <div className="flex items-center gap-3" onClick={() => localStorage.setItem('selectedSessionId', id)}>
                          <Avatar src={images[typeSession]} alt={typeSession} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                                <Chip
                            variant="ghost"
                            size="sm"
                            value={typeSession}
                            color={typeSession === "session normale" ? "green" : "blue-gray"}
                          />
                            </Typography>
                          </div>
                        </div>
                        </Link>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {dateDebut}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {dateFin}
                        </Typography>
                      </td>
                      <td className="p-4 flex items-center justify-center">
                        <Tooltip content="Edit Session">
                          <IconButton variant="text" onClick={() => update(id)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Session">
                          <IconButton variant="text" onClick={ () => handlePreDelete(id)}>
                            <TrashIcon  className="h-4 w-4 text-red-500" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="validate Session">
                          <IconButton variant="text">
                            <CheckIcon className="h-4 w-4 text-green-500" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                   
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <>
      <Dialog
        open={open}
        handler={setOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Confirmer la suppression .</DialogHeader>
        <DialogBody>
        Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green"  onClick={() => {deleteSession(delId) ; setOpen(false)}}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
    {renderUpdateItem && 
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <SessionUpdate  updateItem={updateItem} setUpdateItem={setUpdateItem} setRenderUpdateItem={setRenderUpdateItem}/>
    </div>
    }
    </>

    );
  }

