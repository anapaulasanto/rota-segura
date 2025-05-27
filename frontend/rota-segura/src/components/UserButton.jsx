import React from "react";
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import userImg from '../assets/user-img.png'
import { FiEdit } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
const UserButton = ({ user }) => {
    return (
        <div>
            <Menu>
                <MenuButton className='flex items-center gap-1 border overflow-y-hidden hover:bg-gray-50 cursor-pointer rounded-full max-w-30 h-10 grow shadow-sm mb-1 px-3 bg-white max-sm:ml-10 '>
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
                <MenuItems anchor="bottom" className="flex flex-col justify-between items-center bg-yellow-500/30 z-50 border border-neutral-400/10 shadow-xl mb-1 h-[280px] w-[260px] rounded-3xl overflow-hidden text-center mt-2 mr-30 outline-none font-title">
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
                                <Link to="rota-segura/profile">
                                    <div className="flex items-center gap-2 data-focus:bg-yellow-500/30 bg-white border-gray-500/50 shadow-lg rounded-xl px-10 py-1.5">
                                        <FiEdit />
                                        <a>Editar</a>
                                    </div>
                                </Link>
                            ) : (
                                <Link to="rota-segura/login">
                                    <a className="block data-focus:bg-yellow-500/30 bg-white border-gray-500/50 shadow-lg rounded-xl px-15 py-1.5" href="/support">Entrar</a>
                                </Link>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {user ? (
                                <Link to="rota-segura/logout">
                                    <div className="flex items-center gap-2 data-focus:bg-yellow-500/30 bg-white border-gray-500/50 shadow-lg rounded-xl px-12 py-1.5">
                                        <IoIosLogOut />
                                        <a>Sair</a>
                                    </div>
                                </Link>
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
