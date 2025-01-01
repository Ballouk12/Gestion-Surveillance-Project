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
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ExamenUpdate = ({ setOpen, idsession, day, hour, updateItem }) => {
  const [locaux, setLocaux] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [enseignantsFilter, setEnseignantsFilter] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedLocaux, setSelectedLocaux] = useState([]);
  const [startHour, endHour] = useState(hour?.split("-") || []);
  
  const [data, setData] = useState({
    sessionId: "",
    enseignant: "",
    departement: "",
    module: "",
    nbEtudiants: "",
    debut: startHour[0] || "",
    fin: startHour[1] || "",
  });

  useEffect(() => {
    if (updateItem) {
      setData({
        sessionId: updateItem.session.id,
        enseignant: updateItem.enseignant.id,
        departement: updateItem.enseignant.departement.id,
        module: updateItem.module,
        nbEtudiants: updateItem.nbEtudiants,
        debut: updateItem.locaux[0]?.debut || startHour[0],
        fin: updateItem.locaux[0]?.fin || startHour[1],
      });

      setSelectedLocaux(updateItem.locaux.map(local => local.local));
    }
  }, [updateItem, startHour]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          "http://localhost:8080/api/departements",
          "http://localhost:8080/api/enseignants",
          "http://localhost:8080/api/options"
        ];

        const [departementsData, enseignantsData, modulesData] = await Promise.all(
          urls.map(url => 
            fetch(url, {
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }).then(res => {
              if (!res.ok) throw new Error(`Error fetching ${url}`);
              return res.json();
            })
          )
        );

        setDepartements(departementsData);
        setEnseignants(enseignantsData);
        setModules(modulesData);

        // Filter enseignants if department is selected
        if (data.departement) {
          setEnseignantsFilter(
            enseignantsData.filter(ens => ens.departement.id === data.departement)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchLocaux();
  }, [data.departement, day]);

  const fetchLocaux = async () => {
    if (!day || !startHour[0] || !startHour[1]) return;
    
    try {
      const response = await fetch(
        `http://localhost:8080/api/locaux/available?date=${day}&debut=${startHour[0]}&fin=${startHour[1]}`,
        { credentials: "include" }
      );
      
      if (!response.ok) throw new Error('Error fetching locaux');
      const data = await response.json();
      setLocaux(data);
    } catch (error) {
      console.error("Error fetching locaux:", error);
    }
  };

  const handleChange = (field, value) => {
    setData(prevData => ({ ...prevData, [field]: value }));
    
    if (field === "departement") {
      setEnseignantsFilter(
        enseignants.filter(ens => ens.departement.id === value)
      );
    }
  };

  const handleLocauxChange = (local) => {
    setSelectedLocaux(prev => {
      const isSelected = prev.some(l => l.id === local.id);
      return isSelected 
        ? prev.filter(l => l.id !== local.id)
        : [...prev, local];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      module: data.module,
      nbEtudiants: parseInt(data.nbEtudiants, 10),
      sessionId: parseInt(idsession, 10),
      enseignantId: parseInt(data.enseignant, 10),
      date: day,
      debut: data.debut,
      fin: data.fin,
      locauxIds: selectedLocaux.map(local => local.id),
    };

    try {
      const response = await fetch(`http://localhost:8080/api/examens/${updateItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error updating exam");
      }

      const result = await response.json();
      console.log("Update successful:", result);
      setOpen(false);
    } catch (error) {
      console.error("Error submitting update:", error.message);
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
          Mettre à jour un Examen
        </Typography>
      </CardHeader>
      <CardBody>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Select
            label="Département"
            value={data.departement}
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
            value={data.enseignant}
            onChange={(value) => handleChange("enseignant", value)}
          >
            {enseignantsFilter.map((ens) => (
              <Option key={ens.id} value={ens.id}>
                {`${ens.nom} ${ens.prenom}`}
              </Option>
            ))}
          </Select>

          <Select
            label="Module"
            value={data.module}
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
            label="Nombre d'étudiants"
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
            Mettre à jour
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ExamenUpdate;