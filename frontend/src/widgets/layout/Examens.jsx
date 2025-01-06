import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
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
import ExamenInput from "./ExamenInput";
import ExamenUpdate from "./ExamenUpdate";

// Ajout de la colonne "Locaux" dans les en-têtes
const TABLE_HEAD = ["Responsable", "Option", "Nombre Inscrit", "Locaux", "Action"];

const fetchExamens = (date, debut, fin) => {
const url = `http://localhost:8080/api/examens/filter?date=${date}&debut=${debut}&fin=${fin}`;

const token = localStorage.getItem("token");

if (!token) {
  console.error("Token non trouvé, utilisateur non authentifié");
  alert("Vous devez être connecté pour accéder à cette information.");
  return [];
}

return fetch(url, {
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des examens');
    }
    return response.json();
  })
  .then((data) => data)
  .catch((error) => {
    console.error(error);
    return [];
  });
};

// Composant pour afficher les locaux avec tooltip
const LocauxList = ({ locaux }) => {
// Créer un résumé des locaux
const locauxSummary = locaux.map(l => l.local.nom).join(", ");

// Créer le contenu détaillé pour le tooltip
const tooltipContent = (
  <div className="p-2">
    {locaux.map((l, index) => (
      <div key={index} className="mb-1">
        <span className="font-bold">{l.local.nom}</span>
        <span className="ml-2">({l.local.capacite} places)</span>
      </div>
    ))}
  </div>
);

return (
  <Tooltip content={tooltipContent} className="bg-white text-black border border-gray-200">
    <Typography
      variant="small"
      color="blue-gray"
      className="font-normal cursor-pointer hover:text-blue-500"
    >
      {locauxSummary}
    </Typography>
  </Tooltip>
);
};

export function Examens({day, hour}) {
  const [open, setOpen] = useState(false);
  const [addExam, setAddExam] = useState(false);
  const [examens, setExamens] = useState([]);
  const [delId, setDelId] = useState(0);
  const [updateItem, setUpdateItem] = useState(null);
  const [upopen, setUpOpen] = useState(false);
  const [startHour, endHour] = hour.split("-");
  const idsession = localStorage.getItem('selectedSessionId');

  useEffect(() => {
    fetchExamens(day, startHour, endHour)
      .then((examensData) => {
        setExamens(examensData);
      });
  }, [day, startHour, endHour, addExam, upopen]);

  const deleteExamen = async (id) => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Token non trouvé, utilisateur non authentifié");
        alert("Vous devez être connecté pour supprimer un examen.");
        return;
      }
  
      const response = await fetch(`http://localhost:8080/api/examens/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (response.ok) {
        console.log("Examen supprimé avec succès");
        setOpen(false);
        setExamens(examens.filter(row => row.id !== id));
      } else {
        const error = await response.text();
        console.error("Erreur lors de la suppression : ", error);
        alert("Erreur lors de la suppression : " + error);
      }
    } catch (error) {
      console.error("Erreur réseau : ", error);
      alert("Erreur réseau : " + error.message);
    }
  };

  const handleDel = (id) => {
    setDelId(id);
    setOpen(true);
  }

  return (
    <>
      <Card className="h-full w-full mt-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Examens
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Voir les informations sur tous Examens
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => setAddExam(true)}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Rechercher"
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
              {examens.map((exam, index) => {
                const isLast = index === examens.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                const { id, module, enseignant, nbEtudiants, locaux } = exam;
                
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {enseignant.nom}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {module}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nbEtudiants}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <LocauxList locaux={locaux} />
                    </td>
                    <td className={classes}>
                      <Tooltip content="Modifier">
                        <IconButton variant="text" onClick={() => {setUpdateItem(exam); setUpOpen(!upopen)}}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Supprimer">
                        <IconButton
                          variant="text"
                          onClick={() => handleDel(id)}
                        >
                          <TrashIcon className="h-4 w-4 text-red-500" />
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

      {/* Modals restent inchangés */}
      <Dialog
        open={open}
        handler={setOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Confirmer la suppression.</DialogHeader>
        <DialogBody>
          Êtes-vous sûr de vouloir supprimer cet examen ? Cette action est
          irréversible.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Annuler</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => deleteExamen(delId)}>
            <span>Confirmer</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {addExam && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <ExamenInput setOpen={() => setAddExam(false)} hour={hour} day={day}/>
        </div>
      )}

      {upopen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <ExamenUpdate setOpen={setUpOpen} idsession={idsession} hour={hour} day={day} updateItem={updateItem} setUpdateItem={setUpdateItem}/>
        </div>
      )}
    </>
  );
}