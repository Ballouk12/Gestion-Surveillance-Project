import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export function SignIn() {

const [data,setData] = useState({
  "email" : "" ,
  "password" : ""
})
const navigate = useNavigate()
const handleChange = (e) => { const {name ,value} = e.target; setData((prevData) => ({...prevData ,[name] : value ,}))}

const send = async () => {
  console.log(data)
  try{

  const response = await fetch("http://localhost:8080/api/auth/login" ,{method : "POST" , headers : {"Content-Type" : "application/json"},credentials: 'include', body : JSON.stringify(data)});
  if (response.ok) {
    if (!response.ok) throw new Error('Échec de connexion');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    setData({
      "email" : "",
      "password" : ""
    }) 
    console.log("le resultat ");
    console.log(data);
    navigate("/sessions");
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
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={data.email}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
   
          <Button className="mt-6" fullWidth onClick={send}>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
          Register Now
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Sign Up</Link>
          </Typography>
            <Typography variant="small" className="font-medium text-gray-900">
              <Link to="/auth/reset">
                Forgot Password
              </Link>
            </Typography>
          </div>

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

export default SignIn;
