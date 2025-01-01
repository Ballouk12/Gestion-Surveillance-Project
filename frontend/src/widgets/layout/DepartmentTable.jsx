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
  import { Link, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
import DepartmentUpdate from "./DepartmentUpdate";
import { Upload } from "lucide-react";
  
  const TABLE_HEAD = ["Nom", "Action"];
  
  export function DepartementTable({isopen , setIsopen}) {
    const navigate = useNavigate();
    const [open , setOpen] = useState(false)
    const [delId ,setDelId] = useState()
    const [upItem ,setUpItem] = useState()
    const [upOpen,seUptOpen] = useState(false)
    const [departements ,setDepartements] = useState([])
    const [filtredList,setFiltredList] = useState([]) ;

    useEffect(() => {
      // Fonction pour récupérer les départements
      const fetchDepartements = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/departements");
          if (!response.ok) {
            throw new Error("Erreur lors du chargement des départements");
          }
          const data = await response.json();
          setDepartements(data);
        } catch (err) {
          setError(err.message);
        } 
      };
  
      fetchDepartements();
    }, []); 

  useEffect( () => {
    setFiltredList(departements);
  },[departements])
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:8080/api/departements/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setDepartements([...departements, ...data]);
        alert('Import réussi!');
      } else {
        alert('Erreur lors de l\'import');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'import');
    } finally {
      setLoading(false);
      setFile(null);
    }
  };


  const deleteDepartement = (id) => {
    fetch(`http://localhost:8080/api/departements/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Si la suppression réussie, on met à jour l'état
          setDepartements(departements.filter((departement) => departement.id !== id));
        } else {
          // Si la suppression échoue, on affiche un message d'erreur
          alert("Erreur lors de la suppression du département");
        }
      })
      .catch((error) => {
        console.error("Error deleting departement:", error);
        alert("Une erreur s'est produite");
      });
  };


    const search = (e) => {
      const searchText = e.target.value.toLowerCase() ;
      const filtred  = departements.filter( row => 
        row.nom.toLowerCase().startsWith(searchText)
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
                Department
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Voir les informations sur tous les Départements
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
            <div className="flex gap-2">
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <div
                  onClick={() => document.getElementById('file-upload').click()}
                  className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">
                    {loading ? 'Importation...' : 'Choisir un fichier'}
                  </span>
             </div>
  {file && (
    <Button
      onClick={handleUpload}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <Upload className="h-4 w-4" />
      Importer
    </Button>
  )}
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
              {filtredList.map(({ nom, id }, index) => {
                const isLast = index === filtredList.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
  
                return (
                  <tr key={id}>
                    <td className={classes}>
                    <Link to ="/dashboard/enseignants"  state={{departement : id }}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nom}
                      </Typography>
                      </Link>
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
          <Button variant="gradient" color="green"  onClick={() => {deleteDepartement(delId) ; setOpen(false)}}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {upOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <DepartmentUpdate upItem={upItem} setUpItem={setUpItem} seUptOpen={seUptOpen}/>
          </div>
        )}
    </>
    );
  }
  