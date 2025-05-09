import { Link } from "react-router-dom";
import React from "react";

const Login = () => {
    return (
        <div className="bg-gray-100 rounded-br-full shadow-md shadow-neutral-300 h-screen">
            <div className="flex flex-col justify-center items-center max-w-7xl mx-auto gap-20 pt-20">
            <div className="flex flex-col justify-center items-center max-w-7xl mx-auto gap-40 pb-20 ">
                <p className="font-title text-5xl overflow-y-hidden w-1/2 text-center pt-32">Escolha rotas inteligentes, mova-se com segurança.</p>
                <div className="flex flex-col w-2/6 ">
                    <Link to="/rota-segura/loginForm">
                    <button className="bg-white rounded-2xl py-3 mb-4 w-full shadow-md shadow-neutral-300 cursor-pointer">Entrar</button>
                    </Link>
                    <Link to="/rota-segura/signupForm">
                            <button className="bg-central rounded-2xl py-3 mb-4 w-full shadow-md shadow-neutral-300">Cadastrar-se</button>
                    </Link>
                </div>
            </div>
           </div> 
        </div>
    )
};

export default Login;
