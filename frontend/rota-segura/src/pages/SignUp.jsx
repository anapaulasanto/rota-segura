import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import FormSignUp from "@/components/FormSignUp";

const SignUp = ({ user, setUser }) => {
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate();

    async function submitFunction(data) {
        setError(null)

        if (data.name && data.email && data.password) {
            try {
                const req = await axios.post("/users/signup", {
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
                setUser(req.data)
                toast.success(() => (
                    <p>Seja bem-vindo(a), <span className="font-semibold">{req.data.name}</span></p>
                ));
                setRedirect(true)

            } catch (error) {
                setError("Email já cadastrado" );
                console.log(error);
                
            }
        }
    }

    if (redirect || user) return navigate("/")

    return (
        <div className="bg-gray-100 rounded-br-full shadow-md shadow-neutral-300  w-screen pb-14 absolute max-xl:rounded-br-[400px] max-sm:rounded-br-[200px]">
            <div className="flex flex-col justify-center items-center max-w-7xl mx-auto  ">
                <p className="font-title text-5xl overflow-y-hidden w-1/2 text-center py-5">Faça seu cadastro</p>
                <div className="w-2/5 flex flex-col items-center max-lg:w-3/5 max-sm:w-full">
                    <FormSignUp submitFunction={submitFunction} error={error} />
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        marginBottom: '20px',
                    }
                }}
            />
        </div>
    )
};

export default SignUp;
