import React from "react";
import { Link, Navigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import userImg from '../assets/user-img.png'
import { IoIosLogOut } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";

const UserButton = ({ user, setUser }) => {
    const handleLogout = async () => {
        try {
            await axios.post("/users/logout")
            console.log("Deslogado com sucesso");
            setUser(null)

            return <Navigate to="/" />
        } catch (error) {
            console.log("Erro ao deslogar usuário", error);
        }
    }

    return (
        <div>
            <Menu>
                <MenuButton className='flex items-center gap-1  overflow-y-hidden hover:bg-gray-50 cursor-pointer rounded-lg mt-2 max-w-32 h-10 grow shadow-md mb-1 px-4 bg-white max-sm:ml-10 '>
                    {user ? (
                        <>
                            <FaCircleUser className="w-[60px] text-neutral-600" />
                            <p className='truncate text-sm max-xl:text-lg capitalize'>{user.name}</p>
                        </>

                    ) : (
                        <>
                            <FaCircleUser className="w-[20px] h-[20px] text-neutral-600" />
                            <p className='truncate text-sm max-xl:text-lg capitalize'>Entrar</p>
                        </>
                    )}
                </MenuButton>
                <MenuItems anchor="bottom" className="flex flex-col justify-between items-center bg-text-central/60 z-50 border border-neutral-400/10 shadow-xl mb-1 h-[280px] w-[260px] rounded-3xl overflow-hidden text-center mt-2 mr-30 outline-none font-title">
                    <div className="rounded-full bg-yellow-100 w-[80px] h-[80px] my-2">
                        <img className="w-[79px] h-[79px]" src={userImg} alt="" />
                    </div>
                    {user ? (
                        <>
                            <p className="font-title font-semibold text-lg">{user.name}</p>
                            <p className="text-sm text-neutral-700">{user.email}</p>
                        </>
                    ) : (
                        <p className="font-title font-semibold text-lg">Olá!</p>
                    )}
                    <div className="flex flex-col gap-4 justify-center items-center w-[250px] h-[140px] mb-2 rounded-2xl">
                        <MenuItem>
                            {user ? (
                                <p>
                                    Olá!
                                </p>
                            ) : (
                                <Link to="rota-segura/login">
                                    <a className="block data-focus:bg-yellow-500/30 bg-white border-gray-500/50 shadow-lg rounded-xl px-15 py-1.5" href="/support">Entrar</a>
                                </Link>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {user ? (
                                <button onClick={() => handleLogout()}>
                                    <div className="flex items-center gap-2 data-focus:bg-yellow-500/30 bg-white border-gray-500/50 shadow-lg rounded-xl px-12 py-1.5 cursor-pointer hover:bg-neutral-100">
                                        <IoIosLogOut />
                                        <a>Sair</a>
                                    </div>
                                </button>
                            ) : (
                                <Link to="rota-segura/sign-up">
                                    <a className="block data-focus:bg-yellow-500/30 bg-white border-gray-500/50 shadow-lg rounded-xl px-10 py-1.5" href="/support">Cadastrar-se</a>
                                </Link>
                            )}
                        </MenuItem>
                    </div>

                </MenuItems>
            </Menu>
        </div >
    )
}
export default UserButton;
