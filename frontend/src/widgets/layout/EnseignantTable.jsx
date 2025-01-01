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
    IconButton,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import {TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

      
  const TABLE_HEAD = ["Nom", "Prenom", "Email", "Phone","despense","Action"];
   
  export  function EnseignantTable({updateItem ,setUpdateItem, isopen ,setIsopen ,setOpenUp,departementId,count}) {
    const [delId ,setDelId] = useState()
    const [upOpen ,setUpOpen] = useState(false)
    const [open ,setOpen] = useState(false)
    const [renderUpdateItem, setRenderUpdateItem] = useState(false);
    const [enseignants, setEnseignants] = useState([]);
 
  
    const handleDelete = (enseignantId) => {
      fetch(`http://localhost:8080/api/enseignants/${enseignantId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'enseignant');
          }
          return response;
        })
        .then(() => {
          const updatedEnseignants = enseignants.filter(enseignant => enseignant.id !== enseignantId);
          setEnseignants(updatedEnseignants);
        })
        .catch((error) => {
          
       console.log(error.message);
        });
    };

    useEffect(() => {
      // Vérifier si un département est défini avant de lancer la requête
        const fetchEnseignant = (departementId) =>{
          fetch(`http://localhost:8080/api/enseignants/departement/${departementId}`) // Remplacez par l'URL de votre API
          .then((response) => {
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des enseignants');
            }
            return response.json();
          })
          .then((data) => {
            console.log("les enseignents recuperer" ,data)
            setEnseignants(data);
          })
          .catch((error) => {
            console.log("erreur ",error)
          });
      }
      if (departementId) {
        fetchEnseignant(departementId.departement);
        }
       
    }, [count]);
    
  const update = (id) => {
    const findedItem = enseignants.find(row => row.id === id);
    setUpdateItem(prev => ({...prev , ...findedItem}));
    setRenderUpdateItem(true);
    setOpenUp(true);
    console.log("l'element a modifier" , updateItem)
    console.log("l'element trouver " , findedItem)
    setRenderUpdateItem(true)
  }
  
  const handlePreDelete =  (id) => { 
    setDelId(id)
    setOpen(true) ;
  }

    return (
      <>
      <Card className="h-full w-full mt-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Enseignant
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Voir les informations sur tous les Enseignants
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
              {enseignants.map(
                ({ id,nom, prenom,email,phone,estDispense }, index) => {
                  const isLast = index === enseignants.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                   
                  return (
                    
                    <tr key={id} >
                     
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                                {nom}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {prenom}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phone}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                         {estDispense}
                        </Typography>
                      </td>
                      <td className="p-4 flex items-center justify-center">
                        <Tooltip content="Edit User">
                          <IconButton variant="text" onClick={() => update(id)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Session">
                          <IconButton variant="text" onClick={ () => handlePreDelete(id)}>
                            <TrashIcon  className="h-4 w-4 text-red-500" />
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
          <Button variant="gradient" color="green"  onClick={() => {handleDelete(delId) ; setOpen(false)}}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
    {/* {renderUpdateItem && 
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <SessionUpdate  updateItem={updateItem} setUpdateItem={setUpdateItem} setRenderUpdateItem={setRe}/>
    </div>
    } */}
    </>

    );
  }

