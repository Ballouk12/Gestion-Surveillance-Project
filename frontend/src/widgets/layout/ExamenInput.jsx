import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Select,
  Option,
  Input,
  Checkbox,
  Button,
  Tooltip,
  IconButton,
  Switch,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ExamenInput = ({ setOpen, day, hour }) => {
  const [locaux, setLocaux] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [enseignantsFilter, setEnseignantsFilter] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedLocaux, setSelectedLocaux] = useState([]);
  const [startHour, endHour] = hour.split("-");
  const [isAutomatic, setIsAutomatic] = useState(false);
  const idsession = localStorage.getItem('selectedSessionId');
  const token = localStorage.getItem('token');

  const [data, setData] = useState({
    departement: "",
    enseignant: "",
    module: "",
    nbEtudiants: "",
    debut: startHour,
    fin: endHour,
  });

  // Vérification du token
  const checkAuth = () => {
    if (!token) {
      console.error("Token non trouvé, utilisateur non authentifié");
      alert("Vous devez être connecté pour accéder à cette fonctionnalité.");
      setOpen(false);
      return false;
    }
    return true;
  };

  // Configuration des headers pour les requêtes
  const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  });

  // Filtrer les enseignants par département
  useEffect(() => {
    const filtered = enseignants.filter(
      (row) => row.departement.id === parseInt(data.departement, 10)
    );
    setEnseignantsFilter(filtered);
  }, [data.departement, enseignants]);

  // Récupération des données initiales
  useEffect(() => {
    const fetchData = async (url, setter) => {
      if (!checkAuth()) return;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: getHeaders(),
          credentials: "include",
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            alert("Session expirée. Veuillez vous reconnecter.");
            setOpen(false);
            return;
          }
          throw new Error("Erreur lors de la récupération");
        }
        
        const result = await response.json();
        setter(result);
      } catch (error) {
        console.error("Erreur :", error);
        alert("Erreur lors de la récupération des données");
      }
    };

    fetchData("http://localhost:8080/api/departements", setDepartements);
    fetchData("http://localhost:8080/api/enseignants", setEnseignants);
    fetchData("http://localhost:8080/api/options", setModules);
    fetchLocaux(day, startHour, endHour);
  }, []);

  const fetchLocaux = async (date, debut, fin) => {
    if (!checkAuth()) return;

    const url = `http://localhost:8080/api/locaux/available?date=${date}&debut=${debut}&fin=${fin}`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: getHeaders(),
        credentials: "include",
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          alert("Session expirée. Veuillez vous reconnecter.");
          setOpen(false);
          return;
        }
        throw new Error('Erreur lors de la récupération des locaux');
      }
      
      const data = await response.json();
      setLocaux(data);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la récupération des locaux");
    }
  };

  const handleChange = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleLocauxChange = (local) => {
    if (!isAutomatic) {
      setSelectedLocaux((prev) => {
        const isSelected = prev.some((l) => l.id === local.id);
        if (isSelected) {
          return prev.filter((l) => l.id !== local.id);
        }
        return [...prev, local];
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkAuth()) return;

    const endpoint = isAutomatic 
      ? "http://localhost:8080/api/examens/create-auto"
      : "http://localhost:8080/api/examens";

    const payload = {
      module: data.module,
      nbEtudiants: parseInt(data.nbEtudiants, 10),
      sessionId: parseInt(idsession, 10),
      enseignantId: parseInt(data.enseignant, 10),
      date: day,
      debut: startHour,
      fin: endHour,
      locauxIds: isAutomatic ? [] : selectedLocaux.map((local) => local.id)
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("Session expirée. Veuillez vous reconnecter.");
          setOpen(false);
          return;
        }
        
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi");
      }

      const result = await response.json();
      console.log("Réponse du backend :", result);
      alert("Examen créé avec succès !");
      setOpen(false);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error.message);
      alert(error.message || "Erreur lors de la création de l'examen");
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
        <Tooltip content="Go Back">
          <IconButton variant="text" onClick={() => setOpen(false)}>
            <XMarkIcon className="h-6 w-5 text-white" />
          </IconButton>
        </Tooltip>
        <Typography variant="h5" color="white">
          Enregistrer un Examen
        </Typography>
      </CardHeader>
      <CardBody>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              Affectation Automatique
            </Typography>
            <Switch
              checked={isAutomatic}
              onChange={() => setIsAutomatic(!isAutomatic)}
              label=""
            />
          </div>

          <Select
            label="Département"
            onChange={(value) => handleChange("departement", value)}
            required
          >
            {departements.map((dep) => (
              <Option key={dep.id} value={dep.id}>
                {dep.nom}
              </Option>
            ))}
          </Select>

          <Select
            label="Enseignant"
            onChange={(value) => handleChange("enseignant", value)}
            required
          >
            {enseignantsFilter.map((ens) => (
              <Option key={ens.id} value={ens.id}>
                {ens.nom + " "+ens.prenom}
              </Option>
            ))}
          </Select>

          <Select
            label="Module"
            onChange={(value) => handleChange("module", value)}
            required
          >
            {modules.map((mod) => (
              <Option key={mod.id} value={mod.nom}>
                {mod.nom}
              </Option>
            ))}
          </Select>

          <Input
            type="number"
            label="Nombre d'étudiants"
            value={data.nbEtudiants}
            onChange={(e) => handleChange("nbEtudiants", e.target.value)}
            required
          />

          {!isAutomatic && (
            <div className="h-36 overflow-y-auto scroll-smooth">
              <Typography variant="small" className="mb-2 font-medium">
                Locaux disponibles
              </Typography>
              {locaux.map((local) => (
                <Checkbox
                  key={local.id}
                  label={`${local.nom} - Capacité: ${local.capacite}`}
                  onChange={() => handleLocauxChange(local)}
                  checked={selectedLocaux.some((l) => l.id === local.id)}
                />
              ))}
            </div>
          )}

          <Button size="lg" type="submit">
            Enregistrer
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ExamenInput;