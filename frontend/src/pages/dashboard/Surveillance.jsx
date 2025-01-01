import {
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const TABLE_HEAD_DATE = ["11-12-2023","12-12-2023","13-12-2023","14-12-2023"]
const TABLE_HEAD_HAURE = ["11:12-20:23","12:12-20:23","13:12-20:23","14:12-20:23"]
const TABLE_ENSIGENANT = [{id:1,nom:"ballouk",surveillances:{id:1,typeSurveillance:"TT"}},
  {id:2,nom:"ahmed",surveillances:{id:1,typeSurveillance:"RR"}},
  {id:3,nom:"tawsi",surveillances:{id:1,typeSurveillance:"AP1"}}]






export function Surveillance() {
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
                      <th
                        className="border border-blue-gray-100 bg-blue-gray-50 p-2 text-center"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium leading-none opacity-90"
                        >
                          Enseignants
                        </Typography>
                      </th>
                    {TABLE_HEAD_DATE.map((head, index) => (
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
                        {TABLE_HEAD_HAURE.map((head, index) => (
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
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ENSIGENANT.map((prof, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border border-blue-gray-100 p-2 text-center bg-blue-gray-50">
                        <Typography variant="small" color="blue-gray" className="font-medium">
                          {prof.nom}
                        </Typography>
                      </td>
                      {TABLE_HEAD_DATE.map((date, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-blue-gray-100 p-2 text-center"
                        >
                          <tr>
                          {TABLE_HEAD_DATE.map((date, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-blue-gray-100 p-2 text-center"

                        >  
                         <Typography
                              variant="small"
                              color="blue"
                              className="font-normal"
                            >
                              {prof.surveillances.typeSurveillance}
                            </Typography>
                        
                         </td>
                      ))}
                          </tr>
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
