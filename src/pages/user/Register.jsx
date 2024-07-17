import React, { useContext, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import MyContext from "../../context/data/MyContext";
import { auth } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const context = useContext(MyContext);
    const { mode } = context;

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();
      if(!fullName || !email || !password){
        return toast.error('Please fill all the fields!');
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: fullName});
        toast.success('User registered successfully!');
        navigate('/login');
      } 
      catch (error) {
        toast.error('Error registering user', error);
      }
  
    }

    return (
        <>
        {/* <Nav/> */}
        <div className="flex justify-center items-center h-screen">

            {/* Card  */}
        
            <Card
                className="w-full max-w-[24rem]"
                style={{
                    background: mode === 'dark'
                        ? 'linear-gradient(to right, #0093E9, #80D0C7)'
                        : 'linear-gradient(to right, #ff512f, #dd2476)'
                }}
            >
                {/* CardHeader */}
                <CardHeader
                    color="blue"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    style={{
                        background: mode === 'dark'
                            ? 'linear-gradient(to right, #0093E9, #80D0C7)'
                            : 'linear-gradient(to right, #ff512f, #dd2476)'
                    }}
                >
                    

                    {/* Top Haeding  */}
                    <Typography variant="h4" style={{
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}>
                        Register and start blogging!
                    </Typography>
                </CardHeader>

                {/* CardBody */}
                <CardBody>
                    <form onSubmit={handleRegister} className=" flex flex-col gap-6">
                        {/* First Input  */}
                        <div>
                            <Input
                                type="text"
                                name="fullname"
                                className="p-4 rounded-3xl"
                                placeholder="Enter your name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            
                        </div>

                        <div>
                            <Input
                                type="email"
                                name="email"
                                className="p-4 rounded-3xl"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* Second Input  */}
                        <div>
                            <Input
                                type="password"
                                className="p-4 rounded-3xl"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* Login Button  */}
                        <Button type="submit" className="mt-3 rounded-3xl text-base" 
                            style={{
                                background: mode === 'dark'
                                    ? 'rgb(226, 232, 240)'
                                    : 'rgb(30, 41, 59)',
                                color: mode === 'dark'
                                    ? 'rgb(30, 41, 59)'
                                    : 'rgb(226, 232, 240)',     
                            }}>
                            Register
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
        </>


    );
} 