import {
  HomeIcon,
  DocumentTextIcon,
  EyeIcon,
  BuildingOffice2Icon,
  QueueListIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { Home, Surveillance, Department, } from "@/pages/dashboard";
import Local from "./pages/dashboard/Local";
import { ExamenTable } from "./widgets/layout/ExamenTable";
import { OptionTable } from "./widgets/layout/OptionTable";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home/:id",
        element: <Home />,
      },
      {
        icon: <QueueListIcon {...icon} />,
        name: "Session",
        path: "/sessions",
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Exams",
        path: "/Exams",
        element: <ExamenTable />,
      },
      {
        icon: <EyeIcon {...icon} />,
        name: "surveillance",
        path: "/surveillance",
        element: <Surveillance />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Departement",
        path: "/Department",
        element: <Department/>
      },
      {
        icon: <BuildingOffice2Icon {...icon} />,
        name: "Locaux",
        path: "/Locaux",
        element: <Local/>
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Modules",
        path: "/Module",
        element: <OptionTable />
      },
    ],
  },
,
];

export default routes;
