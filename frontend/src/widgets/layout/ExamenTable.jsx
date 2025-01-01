import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";




export function ExamenTable() {
  const [TABLE_HEAD, setTableHead] = useState([]);
  const [TABLE_HEAD1, setTableHead1] = useState(["Jour"]);
  const [session, setSession] = useState(null); // Initialisez avec null
  const [loading, setLoading] = useState(true);
  const selectedSessionId = localStorage.getItem('selectedSessionId');

// Utilisez selectedSessionId pour récupérer les informations nécessaires

  const fetchSessionById = async (id) => {
    console.log("ID de la session:", id);  // Ajoutez un log pour vérifier la valeur de id
  
    if (!id) {
      throw new Error("ID de session manquant");
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/sessions/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Session non trouvée");
      }
  
      const data = await response.json();
      console.log("Données de session récupérées:", data);
      return data;
    } catch (error) {
      console.log("Erreur lors de la récupération des données de session", error);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedSessionId) {
          console.error("Aucun ID de session sélectionné");
          return;
        }
        
        const sessionData = await fetchSessionById(selectedSessionId);
        if (sessionData) {
          setSession(sessionData);
        } else {
          console.error("Impossible de charger les données de la session");
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la session:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [selectedSessionId]);

  useEffect(() => {
    if (!session) return; // Ajoutez une vérification pour session

    const generateDateRange = (start, end) => {
      const dates = [];
      const startDate = new Date(start);
      const endDate = new Date(end);

      while (startDate <= endDate) {
        const formattedDate = startDate
          .toLocaleDateString("en-GB")
          .split("/")
          .reverse()
          .join("-");
        dates.push(formattedDate);
        startDate.setDate(startDate.getDate() + 1);
      }

      return dates;
    };

    const dates = generateDateRange(session.dateDebut, session.dateFin);
    setTableHead(dates);
  }, [session]);

  useEffect(() => {
    if (!session) return; // Vérification nécessaire

    const generateTableHeaders = () => {
      const newHeaders = ["Jour"];
      for (let i = 1; i <= 4; i++) {
        const startTime = session[`debut${i}`];
        const endTime = session[`fin${i}`];
        if (startTime && endTime) {
          newHeaders.push(`${startTime}-${endTime}`);
        }
      }
      setTableHead1(newHeaders);
    };

    generateTableHeaders();
  }, [session]);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (!session) {
    return <div>Session introuvable.</div>;
  }

 
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left border-collapse border border-blue-gray-200">
        <thead>
          <tr>
            {TABLE_HEAD1.map((head, index) => (
              <th
                key={index}
                className="border border-blue-gray-100 bg-blue-gray-50 p-2 text-center"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium leading-none opacity-90"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_HEAD.map((date, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-blue-gray-100 p-2 text-center bg-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  {date}
                </Typography>
              </td>
              {TABLE_HEAD1.slice(1).map((hour, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-blue-gray-100 p-2 text-center"
                >
                  <Link
                    to="/dashboard/exam"
                    state={{ day: date, hour: hour }}
                    className="text-blue-500 hover:underline"
                  >
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      -
                    </Typography>
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
