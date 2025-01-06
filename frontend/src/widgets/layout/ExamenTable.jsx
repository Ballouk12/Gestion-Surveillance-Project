import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ExamenTable() {
  const [TABLE_HEAD, setTableHead] = useState([]);
  const [TABLE_HEAD1, setTableHead1] = useState(["Jour"]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Ajout de l'état pour gérer les erreurs
  const selectedSessionId = localStorage.getItem('selectedSessionId');
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchDays = async () => {
      try {
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
            "Authorization": `Bearer ${token}`, 
          },
        });
  
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des départements");
        }
  
        const data = await response.json();
        setDays(data); 
        console.log("les dates feries ",data)
      } catch (err) {
        console.error("Erreur lors de la récupération des Jours :", err.message);
        setError(err.message); 
      }
    };
  
    fetchDays(); 
  }, []); 

  const fetchSessionById = async (id) => {
    if (!id) {
      throw new Error("ID de session manquant");
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Aucun token trouvé, l'utilisateur n'est probablement pas authentifié");
      return null;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/sessions/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Session non trouvée");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données de session", error);
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSessionId]);

  useEffect(() => {
    if (!session) return;

    const generateDateRange = (start, end) => {
      const dates = [];
      const startDate = new Date(start);
      const endDate = new Date(end);

      while (startDate <= endDate) {
        const year = startDate.getFullYear();
        const month = String(startDate.getMonth() + 1).padStart(2, '0');
        const day = String(startDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        const isHoliday = days.some(holiday => holiday.date === formattedDate);
        
        if (startDate.getDay() !== 0 && !isHoliday) {
          dates.push({
            display: formattedDate,
            comparison: formattedDate
          });
        }
        startDate.setDate(startDate.getDate() + 1);
      }

      return dates;
    };

    const dates = generateDateRange(session.dateDebut, session.dateFin);
    setTableHead(dates);
  }, [session, days]);

  useEffect(() => {
    if (!session) return;

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

  if (error) {
    return <div>Erreur: {error}</div>;
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
          {TABLE_HEAD.map((dateObj, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-blue-gray-100 p-2 text-center bg-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  {dateObj.display}
                </Typography>
              </td>
              {TABLE_HEAD1.slice(1).map((hour, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-blue-gray-100 p-2 text-center"
                >
                  <Link
                    to="/dashboard/exam"
                    state={{ day: dateObj.comparison, hour: hour }}
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