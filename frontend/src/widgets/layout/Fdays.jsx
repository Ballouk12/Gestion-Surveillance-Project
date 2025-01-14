import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    IconButton,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
  import { useEffect, useState } from "react";
import FdaysUpdate from "./FdaysUpdate";
  
  const TABLE_HEAD = ["Jour", "Action"];
  
  export function Fdays({isopen , setIsopen}) {
    const [open , setOpen] = useState(false)
    const [delId ,setDelId] = useState()
    const [upItem ,setUpItem] = useState()
    const [upOpen,seUptOpen] = useState(false)
    const [days ,setDays] = useState([])
    const [filtredList,setFiltredList] = useState([]) ;

    useEffect(() => {
      // Fonction pour récupérer les départements
      const fetchDays = async () => {
        try {
          // Récupérer le token depuis localStorage
          const token = localStorage.getItem("token");
    
          if (!token) {
            console.error("Token non trouvé, utilisateur non authentifié");
            alert("Vous devez être connecté pour effectuer cette action.");
            return;
          }
    
          const response = await fetch("http://localhost:8080/ferie-days", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Ajout du token dans l'en-tête
            },
          });
    
          if (!response.ok) {
            throw new Error("Erreur lors du chargement des départements");
          }
    
          const data = await response.json();
          setDays(data); 
        } catch (err) {
          console.error("Erreur lors de la récupération des Jours :", err.message);
          setError(err.message); 
        }
      };
    
      fetchDays(); 
    }, [upOpen,isopen]); 
    

  useEffect( () => {
    setFiltredList(days);
  },[days])
  

  const deleteDay = async (id) => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Token non trouvé, utilisateur non authentifié");
        alert("Vous devez être connecté pour effectuer cette action.");
        return;
      }
  
      const response = await fetch(`http://localhost:8080/ferie-days/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json", 
        },
      });
  
      if (response.ok) {
        // Si la suppression réussit, on met à jour l'état
        setDays(days.filter((departement) => departement.id !== id));
      } else {
        // Si la suppression échoue, on affiche un message d'erreur
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Erreur réseau lors de la suppression du Jour:", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };
  


    const search = (e) => {
      const searchText = e.target.value.toLowerCase() ;
      const filtred  = days.filter( row => 
        row.date.toLowerCase().startsWith(searchText)
      ) 
      setFiltredList(filtred);
      console.log("filtred list " ,filtredList);
    }
     
    const handleDelete = (id) => {
      setDelId(id)
      setOpen(true)
    }

    const handleUpdate = (id) => {
      const findedItem = filtredList.find(row => row.id === id) ;
      setUpItem(findedItem) ;
      seUptOpen(true)
    }


    useEffect( () => {
      console.log("element a mettre a jour " ,upItem)
    },[upItem])
  
    return (
      <>
      <Card className="h-full w-full mt-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
              Jours Fériés.
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Voir les Jours Fériés existent
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => setIsopen(true)}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter
              </Button>
            </div>

          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={search}
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
                      {head}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtredList.map(({ date, id }, index) => {
                const isLast = index === filtredList.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
  
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className="p-4 flex items-center justify-center">
                        <Tooltip content="Edit Department">
                          <IconButton variant="text" onClick={() => handleUpdate(id)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Session">
                          <IconButton variant="text" onClick={() => handleDelete(id)}>
                            <TrashIcon  className="h-4 w-4 text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
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
          <Button variant="gradient" color="green"  onClick={() => {deleteDay(delId) ; setOpen(false)}}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {upOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <FdaysUpdate upItem={upItem} setUpItem={setUpItem} setUptOpen={seUptOpen}/>
          </div>
        )}
    </>
    );
  }