import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import FormLogin from "@/components/login/FormLogin";
import { IoIosArrowBack } from "react-icons/io";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    const {user, setUser} = useContext(UserContext)

    async function submitFunction(data) {
        setError(null)

        if (data.email && data.password) {
            try {
                const req = await axios.post("/users/login", {
                    email: data.email,
                    password: data.password
                })
                setUser(req.data)
                toast.success(() => (
                    <p>Olá de volta, <span className="truncate font-semibold">{req.data.name}</span></p>
                ));
                setRedirect(true)

            } catch (error) {
                setError("Email ou senha inválidos")
                console.log(error);
            }
        } else {
            setError("Preencha todos os campos")
        }
    }

    if (redirect || user) return navigate("/")

    return (
        <>
            <div className="bg-gray-100 rounded-br-[600px] shadow-md shadow-neutral-300 pb-30 mb-7 max-xl:rounded-br-[400px] max-sm:rounded-br-[200px]">
                <button onClick={() => navigate(-1)} className="flex items-center ml-25 text-neutral-400 cursor-pointer">
                    <IoIosArrowBack className="text-xl" />
                    <p className="text-sm">Voltar</p>
                </button>
                <div className="flex flex-col justify-center items-center max-w-7xl mx-auto ">
                    <p className="font-title text-5xl w-1/2 text-center mx-auto py-8 ">Escolha rotas inteligentes, mova-se com segurança.</p>
                    <div className="w-2/5 flex flex-col items-center max-lg:w-3/5 max-sm:w-full">
                        <FormLogin submitFunction={submitFunction} error={error} />
                        <p className="tracking-widest text-neutral-700  max-sm:text-xl w-[300px] text-center">Não possui conta? <Link to="/rota-segura/sign-up"><span className="text-central underline decoration-central">Registre-se</span></Link> agora.</p>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </>
    )
};

export default Login;
