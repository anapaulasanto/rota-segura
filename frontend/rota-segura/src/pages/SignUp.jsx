import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import FormSignUp from "@/components/FormSignUp";

const SignUp = ({ setUser }) => {
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
                setRedirect(true)

            } catch (error) {
                setError("Erro ao cadastrar usuário. Tente novamente mais tarde.")
            }
        } 
    }

    if (redirect) return navigate("/")

    return (
        <div className="bg-gray-100 rounded-br-full shadow-md shadow-neutral-300  w-screen pb-14 absolute">
            <div className="flex flex-col justify-center items-center max-w-7xl mx-auto  ">
                <p className="font-title text-5xl overflow-y-hidden w-1/2 text-center py-5">Faça seu cadastro</p>
                <div className="w-2/5 flex flex-col items-center">
                    <FormSignUp submitFunction={submitFunction} error={error} />
                </div>
            </div>
        </div>
    )
};

export default SignUp;
