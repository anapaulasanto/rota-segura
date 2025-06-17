import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';

const Header = () => {
    const { user } = useContext(UserContext);

    return (
        <header className="absolute z-50">
            <div className="bg-gray-100 rounded-bl-[12rem] w-[100vw] shadow-md max-sm:rounded-bl-[5rem] pl-4">
                <div className='max-w-6xl mx-auto py-[120px] max-xl:max-w-3xl  max-md:max-w-[600px] ' >
                    <p className='max-w-[600px] font-title text-6xl tracking-widest'>Conectar mobilidade ativa <br /> <span className='text-2xl text-gray-600 tracking-wide'>com informações práticas em tempo real</span></p>
                    <div className='py-10 max-sm:py-3'>
                        {user ? (
                            <Link to="/rota-segura/search" >
                                <div className='flex items-center gap-2 pt-3'>
                                    <button className='bg-central cursor-pointer rounded-md mb-1 text-sm px-5 py-2 shadow-sm hover:opacity-95 hover:text-white shadow-neutral-600 max-xl:mt-10 max-xl:text-2xl max-sm:px-7 max-sm:py-5'>Buscar rotas</button>
                                </div>
                            </Link>
                        ) : (
                            <Link to="/rota-segura/login" >
                                <div className='flex items-center gap-2 pt-3'>
                                    <button className='bg-central cursor-pointer rounded-md mb-1 text-sm px-5 py-2 shadow-sm hover:opacity-95 hover:text-white shadow-neutral-600 max-xl:mt-10 max-xl:text-2xl max-sm:px-7 max-sm:py-5'>Buscar rotas</button>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;
