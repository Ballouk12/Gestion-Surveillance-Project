import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export function ResetPassword() {


const [data,setData] = useState({
  "email" : ""
})
const handleChange = (e) => { const {name ,value} = e.target; setData((prevData) => ({...prevData ,[name] : value ,}))}

const send = async () => {
    console.log(data)
    try {
      // Créer l'URL avec le paramètre email
      const url = new URL("http://localhost:8080/api/auth/reset");
      url.searchParams.append("email", data.email);
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: 'include'
      });
  
      if (response.ok) {
        const result = await response.text(); // Puisque vous retournez une String
        setData({
          "email": ""
        });
        console.log("le resultat ", result);
      } else {
        console.error("Erreur lors de l'envoi des données :", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  }
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Reset Password</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Enter the email 
            </Typography>
            <Input
              type="email"
              size="lg"
              name="email"
              value={data.email}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={send}>
            Submit
          </Button>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default ResetPassword;