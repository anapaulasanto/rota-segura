import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="absolute z-50">
            <div className="bg-gray-100 rounded-bl-[12rem] w-[100vw] shadow-md max-sm:rounded-bl-[5rem] pl-4">
                <div className='max-w-6xl mx-auto py-[120px] max-xl:max-w-3xl  max-md:max-w-[600px] ' >
                    <p className='max-w-[600px] font-title text-6xl tracking-widest'>Conectar mobilidade ativa <br /> <span className='text-2xl text-gray-600 tracking-wide'>com informações práticas em tempo real</span></p>
                    <div className='py-10 max-sm:py-3'>
                        <Link to="/rota-segura/buscar">
                            <button className='bg-central cursor-pointer rounded-full px-11 py-5 shadow-lg hover:bg-yellow-600 hover:text-white shadow-neutral-400 max-xl:mt-10 max-xl:text-2xl max-sm:px-7 max-sm:py-5'>Buscar rotas</button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;
