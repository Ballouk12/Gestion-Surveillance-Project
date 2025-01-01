import React, { useState, useEffect, useMemo } from "react";
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
  const [sendLocaux,setSendLocaux] = useState([])
  const idsession = localStorage.getItem('selectedSessionId');


  console.log("les donnees recuperees de props", day, hour);
  const [data, setData] = useState({
    departement: "",
    enseignant: "",
    module: "",
    nbEtudiants: "",
    debut: "", // Utilisez "debut" pour l'heure de début
    fin: "",   // Utilisez "fin" pour l'heure de fin
  });
  const [examens, setExamens] = useState([]);


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
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!response.ok) throw new Error("Erreur lors de la récupération");
        const result = await response.json();
        setter(result);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchData("http://localhost:8080/api/departements", setDepartements);
    fetchData("http://localhost:8080/api/enseignants", setEnseignants);
    fetchData("http://localhost:8080/api/options", setModules);
    //fetchData("http://localhost:8080/api/locaux/all", setLocaux);
    fetchLocaux(day,startHour,endHour);
  }, []);

  const fetchLocaux = (date, debut, fin) => {
    const url = `http://localhost:8080/api/locaux/available?date=${date}&debut=${debut}&fin=${fin}`;
  
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des examens');
        }
        return response.json();
      })
      .then((data) =>setLocaux(data))
      .catch((error) => {
        console.error(error);
        return [];
      });
  };


  // Gestion des changements dans les champs du formulaire
  const handleChange = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleLocauxChange = (local) => {
    setSelectedLocaux((prev) => {
      const isSelected = prev.some((l) => l.id === local.id);
      if (isSelected) {
        return prev.filter((l) => l.id !== local.id);
      }
      return [...prev, local];
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    console.log("memoriezed id",idsession)
    e.preventDefault();

    // Création du payload
    const payload = {
      module: data.module, // Vous envoyez directement le nom du module ici
      nbEtudiants: parseInt(data.nbEtudiants, 10),
      sessionId: parseInt(idsession, 10),  // Utilisation du id mémorisé
      enseignantId:  parseInt(data.enseignant, 10) ,
      date: day,
      debut: startHour,
      fin: endHour,
      locauxIds: selectedLocaux.map((local) => parseInt(local.id))
    };

    console.log("Payload :", payload);

    try {
      const response = await fetch("http://localhost:8080/api/examens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi");
      }

      const result = await response.json();
      console.log("Réponse du backend :", result);
      setOpen(false); // Fermer la fenêtre après succès
    } catch (error) {
      console.error("Erreur lors de la soumission :", error.message);
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
          <Select
            label="Département"
            onChange={(value) => handleChange("departement", value)}
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
          >
            {enseignantsFilter.map((ens) => (
              <Option key={ens.id} value={ens.id}>
                {ens.nom}
              </Option>
            ))}
          </Select>

          <Select
            label="Module"
            onChange={(value) => handleChange("module", value)}
          >
            {modules.map((mod) => (
              <Option key={mod.id} value={mod.nom}>
                {mod.nom}
              </Option>
            ))}
          </Select>

          <Input
            type="number"
            placeholder="Nombre d'étudiants"
            value={data.nbEtudiants}
            onChange={(e) => handleChange("nbEtudiants", e.target.value)}
          />

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
          <Button size="lg" type="submit">
            Enregistrer
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ExamenInput;
