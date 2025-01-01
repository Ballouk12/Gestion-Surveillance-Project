import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function SignUp() {

 
const [data,setData] = useState({"first_name" : "","last_name" : "","login" : "","password" : ""});

const navigate = useNavigate();
const signUp = async () => {
  console.log("Données envoyées :", JSON.stringify(data)); 
  try {
      const response = await fetch("http://localhost:8080/user/signup", {
          method: "POST", 
          headers: {
              "Content-Type": "application/json", 
          },
          credentials: 'include',
          body: JSON.stringify(data), 
      });

      if (response.ok) {
          const result = await response.json();
          console.log("Réponse du serveur :", result);
          setData({
            "first_name" : "",
            "last_name" : "",
            "login" : "",
            "password" : ""
          }) 
          navigate("/");
      } else {
          console.error("Erreur lors de l'envoi des données :", response.status);
      }
  } catch (error) {
      console.error("Erreur réseau :", error); 
  }
};
  return (
    <section className="m-8 flex">
            <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us In ENSAJ App</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <div className="flex row-auto gap-5">
            <div className="w-1/2 mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              First Name
            </Typography>
            <Input
              size="lg"
              placeholder="first name"
              value={data.first_name}
              onChange={(e) => setData((prevData) => ({...prevData ,first_name:e.target.value }))}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            </div>
            <div className="w-1/2 mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Last Name
            </Typography>
            <Input
              size="lg"
              placeholder="last name"
              value={data.last_name}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setData((prevData) => ({...prevData , last_name : e.target.value}))}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            </div>
            </div>
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={data.login}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setData((prevData) => ({...prevData , login : e.target.value}))}
              labelProps={{
              className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Password
            </Typography>
            <Input
              size="lg"
              type="password"
              placeholder="************"
              value={data.password}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setData((prevData) => ({...prevData , password : e.target.value}))}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        
          <Button className="mt-6" fullWidth onClick={signUp}>
            Register Now
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
