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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LocalUpdate from "./LocaleUpdate";
import { Upload } from "lucide-react";
      
  const TABLE_HEAD = ["Nom", "Type", " Taille","Action"];
   
  export function LocalTable({isopen ,setIsopen}) {
    const [open, setOpen] = useState(false)
    const [renderUpdateItem,setRenderUpdateItem] = useState(false)
    const [updateItem,setUpdateItem] = useState()
    const [delId ,setDelId] = useState()
    const [filteredList, setFilteredList] = useState([]);
    const [loading, setLoading] = useState(true); // État pour gérer le chargement // État pour gérer les erreurs
    const [locaux, setLocaux] = useState([]); // État pour stocker les locaux

    const [file, setFile] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [refrech ,setRefrech] = useState(false)

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    setLoading2(true);
    try {
      const response = await fetch('http://localhost:8080/api/locaux/upload', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Upload réussi:', result);
        // Réinitialiser le formulaire
        e.target.value = null;
        setFile(null);
        setRefrech(!refrech)
      } else {
        console.error('Erreur lors de l\'upload');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading2(false);
    }
  };


    const search = (e) => {
      const searchText = e.target.value.toLowerCase();
  
      const filtered = locaux.filter((row) => {
        if(searchText === "") {
          return true ;
        }
        if (!isNaN(searchText)) {
          return row.capacite === parseInt(searchText, 10);
        }
        return (
          row.nom.toLowerCase().startsWith(searchText) ||
          row.type.toLowerCase().startsWith(searchText)
        );
      });
      setFilteredList(filtered);
      console.log("filtrer " , filtered)
    };

    const update = (id) => {
      const findedItem = locaux.find(row => row.id === id);
      setUpdateItem(prev => ({...prev , ...findedItem}));
      console.log("l'element a modifier" , updateItem)
      console.log("l'element trouver " , findedItem)
      setRenderUpdateItem(true)
    }

    const handlePreDelete =  (id) => { 
      setDelId(id)
      setOpen(true) ;
    }
  
    const handleDelete = async (id) => {
      console.log("ID à supprimer :", id); // Affiche l'ID à supprimer
      try {
        const response = await fetch(`http://localhost:8080/api/locaux/${id}`, {
          method: "DELETE",
        });
    
        if (response.ok) {
          setLocaux((prevItems) => prevItems.filter((item) => item.id !== id));
          console.log("Élément supprimé avec succès !");
        } else {
          console.error(`Erreur lors de la suppression : code ${response.status}`);
        }
      } catch (error) {
        console.error("Erreur réseau ou serveur lors de la suppression :", error.message);
      }
    };
    
  useEffect( () => {
    setFilteredList(locaux)
  },[locaux])
    const fetchLocaux = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/locaux/all");
        if (!response.ok) {
          console.log("les derreur",response.json)
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        setFilteredList(data);
        setLocaux(data) // Mise à jour des locaux
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchLocaux(); // Appel à l'API au montage du composant
    }, [refrech]);
  
  
  
    return (
      <>
      <Card className="h-full w-full mt-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Locaux
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Voir les informations sur tous les Locaux
              </Typography>
            </div>
            <div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row my-3">
              <Button className="flex items-center gap-3" size="sm" onClick={() => setIsopen(true)}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter
              </Button>
            </div>

            <div className="">
            <div
              onClick={() => document.getElementById('file-upload').click()}
              className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50"
            >
              <Upload className="h-4 w-4" />
              <span className="text-sm">
                {loading ? 'Importation...' : 'Choisir un fichier'}
              </span>
            </div>
            <Input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              disabled={loading}
              className="hidden"
            />
            </div>
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
              {filteredList.map(
                ({ id ,nom, type, capacite }, index) => {
                  const isLast = index === filteredList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={`${nom}-${index}`} >
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {nom}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {type}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {capacite}
                        </Typography>
                      </td>
                      <td className={classes}>
                      <Tooltip content="Edit Local">
                          <IconButton variant="text" onClick={() => update(id)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Local">
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
        Êtes-vous sûr de vouloir supprimer cet élément ? Cette Locale peut etre lie a des Examens est.
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
      {renderUpdateItem && 
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <LocalUpdate  updateItem={updateItem} setUpdateItem={setUpdateItem} />
    </div>
    }
      </>
    );
  }