import React, { useEffect, useState } from "react";
import {
  Typography,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import {
  EyeIcon,
  BuildingOffice2Icon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

export function Home({ setIdSession }) {

  const selectedSessionId = localStorage.getItem('selectedSessionId');

  const Id = {id:selectedSessionId}
  const sessionId = selectedSessionId;
  const [stats, setStats] = useState({
    examen: 0,
    dept: 0,
    enseignant: 0,
  });
  
  const statisticsCardsData = [
    {
      color: "gray",
      icon: DocumentTextIcon,
      title: "Exams",
      value: stats?.examen || 0, // Utilise 0 si stats.dept est indéfini
      footer: {
        color: "text-green-500",
        value: "+2",
        label: "than last week",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "Enseignants",
      value: stats?.enseignant || 0, // Utilise 0 si stats.enseignant est indéfini
      footer: {
        color: "text-green-500",
        value: "+3",
        label: "than last month",
      },
    },
    {
      color: "gray",
      icon: BuildingOffice2Icon,
      title: "Nombre Totale de departement",
      value:stats?.dept || 0 , // Utilise 0 si stats.examen est indéfini
      footer: {
        color: "text-red-500",
        value: "+2",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: EyeIcon,
      title: "Surveillance actuelle",
      value: "0.04",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/statistiques/${sessionId}`,{method : "GET" , headers : {"Content-Type" : "application/json"},credentials: 'include'});
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des statistiques');
        }
        
        const data = await response.json();
        console.log("les statsiques ",data)
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setStats(null);
      }
    };

    if (sessionId) {
      fetchStats();
    }
  }, [sessionId]);

  useEffect( () => {
      console.log("id de session est " , Id);
      setIdSession(Id)
  },[])
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
