import { Link } from "react-router-dom";
import React from "react";
import Form from "@/components/Form";

const Login = () => {
    return (
        <div className="bg-gray-100 rounded-br-full shadow-md shadow-neutral-300 h-screen">
            <div className="flex flex-col justify-center items-center max-w-7xl mx-auto  ">
                <p className="font-title text-5xl overflow-y-hidden w-1/2 text-center pt-10">Escolha rotas inteligentes, mova-se com segurança.</p>
                <div className="w-2/5 flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center w-full">
                        <form className="flex flex-col items-start justify-center h-3/4 py-8 px-10 gap-4 text-neutral-500 w-full">
                            <label className="flex items-center gap-1 invalid:border-pink-500">Email </label>
                            <input
                                type="text"
                                className="border border-neutral-500 rounded-full w-full py-3 px-3"
                                placeholder="Digite o seu email"
                                required="required"
                            />
                            <label className="flex items-center gap-1">Senha</label>
                            <input
                                type="text"
                                className="border border-neutral-500 rounded-full w-full py-3 px-3 "
                                placeholder="Digite sua senha"
                                required="required"
                            />
                        </form>
                        <button
                            type="submit"
                            className='bg-central rounded-full px-5 py-3 mb-20 shadow-md w-2/4 mx-auto my-6 shadow-neutral-400 cursor-pointer hover:bg-central/70 hover:border-neutral-300 transition-all duration-200 ease-in-out'
                        >Entrar
                        </button>
                    </div>

                    {/* <Form
                        firstLabel="Email"
                        firstPlaceholder="Digite o seu email"
                        secondLabel="Senha"
                        secondPlaceholder="Digite sua senha"
                        textButtonForm="Entrar"
                        classNameBtn='bg-central rounded-full px-5 py-3 mb-20 shadow-md w-2/4 mx-auto my-6 shadow-neutral-400 cursor-pointer hover:bg-central/70 hover:border-neutral-300 transition-all duration-200 ease-in-out'
                    /> */}
                    <p className="tracking-widest text-neutral-700">Não possui conta? <Link><span className="text-central underline decoration-central">Registre-se</span></Link> agora.</p>
                </div>
            </div>
        </div>
    )
};

export default Login;
