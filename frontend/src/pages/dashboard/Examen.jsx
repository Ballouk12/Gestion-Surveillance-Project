import {
  Card,
  CardBody,
} from "@material-tailwind/react";
import { ExamenTable } from "@/widgets/layout/ExamenTable";

export function Examen() {
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
          <ExamenTable />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Examen;
