import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function Surveillance() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [planningData, setPlanningData] = useState({
    dates: [],
    creneaux: [],
    enseignants: []
  });

  useEffect(() => {
    const sessionId = localStorage.getItem('selectedSessionId');
    fetchPlanningData(sessionId);
  }, []);
  const fetchPlanningData = async (sessionId) => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Token non trouvé, utilisateur non authentifié");
        alert("Vous devez être connecté pour accéder à ces données.");
        return;
      }
  
      const response = await fetch(`http://localhost:8080/api/surveillances/${sessionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Ajout du token dans les en-têtes
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
  
      const data = await response.json();
      setPlanningData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <Typography variant="h6" color="blue-gray">
          Chargement...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <Typography variant="h6" color="red">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Surveillance
          </Typography>
        </CardHeader>
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left border-collapse border border-blue-gray-200">
            <thead>
              <tr>
                <th className="border border-blue-gray-100 bg-blue-gray-50 p-2 text-center">
                  <Typography variant="small" color="blue-gray" className="font-medium leading-none opacity-90">
                    Enseignants
                  </Typography>
                </th>
                {planningData.dates.map((date) => (
                  <th key={date} className="border border-blue-gray-100 bg-blue-gray-50 p-2">
                    <Typography variant="small" color="blue-gray" className="font-medium leading-none opacity-90 text-center">
                      {date}
                    </Typography>
                    <div className="flex flex-wrap">
                      {planningData.creneaux.map((creneau) => (
                        <th key={`${date}-${creneau}`} className="border border-blue-gray-100 bg-blue-gray-50 p-2 text-center flex-1 min-w-[120px]">
                          <Typography variant="small" color="blue-gray" className="font-medium leading-none opacity-90">
                            {creneau}
                          </Typography>
                        </th>
                      ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planningData.enseignants.map((prof) => (
                <tr key={prof.id}>
                  <td className="border border-blue-gray-100 p-2 text-center bg-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      {prof.nom}
                    </Typography>
                  </td>
                  {planningData.dates.map((date) => (
                    <td key={date} className="border border-blue-gray-100 p-2">
                      <div className="flex flex-wrap">
                        {planningData.creneaux.map((creneau) => {
                          const surveillance = prof.surveillances[date]?.[creneau];
                          let textColor = 'text-gray-700';
                          
                          if (surveillance === 'RR') textColor = 'text-red-500';
                          else if (surveillance === 'TT') textColor = 'text-blue-500';
                          else if (surveillance) textColor = 'text-green-500';

                          return (
                            <td
                              key={`${date}-${creneau}`}
                              className="border border-blue-gray-100 p-2 text-center flex-1 min-w-[120px]"
                            >
                              <Typography
                                variant="small"
                                className={`font-normal ${textColor}`}
                              >
                                {surveillance || '-'}
                              </Typography>
                            </td>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Card>
    </div>
  );
}

export default Surveillance;