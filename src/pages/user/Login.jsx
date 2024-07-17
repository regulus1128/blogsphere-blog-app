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
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const context = useContext(MyContext);
    const { mode } = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await signInWithEmailAndPassword(auth, email, password);
          toast.success('User logged in successfully!');
          navigate('/');
        } 

        catch (error) {

            if(!email || !password){
                return toast.error('Please fill all the fields!');
            }

            if(error.code === 'auth/user-not-found'){
                toast.error('No user found with this email. Please register first.')
            }
            else if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password. Please try again.');
            } 
            else {
                toast.error('Failed to log in. Please try again.');
            }
        }
      };


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
                        Login to start posting blogs!
                    </Typography>
                </CardHeader>

                {/* CardBody */}
                <CardBody>
                    <form className=" flex flex-col gap-6">
                        {/* First Input  */}
                        <div>
                            <Input
                                type="email"
                                name="email"
                                className="p-4 rounded-3xl text-lg"
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
                        <Button className="mt-3 rounded-3xl text-base"
                        onClick={handleLogin}
                            style={{
                                background: mode === 'dark'
                                    ? 'rgb(226, 232, 240)'
                                    : 'rgb(30, 41, 59)',
                                color: mode === 'dark'
                                    ? 'rgb(30, 41, 59)'
                                    : 'rgb(226, 232, 240)',
                            }}>
                            Login
                        </Button>

                        
                    </form>
                </CardBody>
            </Card>
        </div>
        </>


    );
} 