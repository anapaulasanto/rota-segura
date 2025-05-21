import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const SignUp = ({ setUser }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)

        if (email && password) {
            try {
                const req = await axios.post("/users/login", {
                    email,
                    password
                })
                setUser(req.data)
                
            } catch (error) {
                setError("Email ou senha inválidos")
            }
        } else {
            setError("Preencha todos os campos")
        }
    }

    return (
        <>
            <div className="bg-gray-100 rounded-br-full shadow-md shadow-neutral-300 h-screen w-screen mb-7">
                <div className="flex flex-col justify-center items-center max-w-7xl mx-auto  ">
                    <p className="font-title text-5xl overflow-y-hidden w-1/2 text-center py-5">Faça seu cadastro</p>
                    <div className="w-2/5 flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center w-5/6">
                            <form
                                className="flex flex-col items-start justify-center h-3/4 py-8 px-10 gap-4 text-neutral-500 w-full"
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}>
                                <label className="flex items-center gap-1 invalid:border-pink-500">Nome </label>
                                <input
                                    type="text"
                                    className="border border-neutral-500 rounded-full w-full py-3 px-3"
                                    placeholder="Digite o seu nome"
                                    required="required"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className="flex items-center gap-1 invalid:border-pink-500">Email </label>
                                <input
                                    type="email"
                                    className="border border-neutral-500 rounded-full w-full py-3 px-3"
                                    placeholder="Digite o seu email"
                                    required="required"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="flex items-center gap-1">Senha</label>
                                <input
                                    type="password"
                                    className="border border-neutral-500 rounded-full w-full py-3 px-3 "
                                    placeholder="Digite sua senha"
                                    required="required"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </form>
                            {error && <p className="text-red-500">{error}</p>}
                            <button
                                type="submit"
                                className='bg-central rounded-full px-5 py-3 shadow-md w-2/4 mx-auto mb-6 shadow-neutral-400 cursor-pointer hover:bg-central/70 hover:border-neutral-300 transition-all duration-200 ease-in-out'
                                onClick={handleSubmit}
                            >Entrar
                            </button>
                            <p className="tracking-widest text-neutral-700">Já possui conta? <Link to="/rota-segura/login"><span className="text-central underline decoration-central">Faça o login</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SignUp;
