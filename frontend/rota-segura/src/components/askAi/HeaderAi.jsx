import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { TbClockHour4 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const HeaderAi = ({ routeInfo }) => {
    const navigate = useNavigate()

    return (
        <header className="bg-yellow-500 text-white p-5 mb-7">
            <div className="max-w-4xl mx-auto flex justify-start items-center gap-1">
                <button onClick={() => navigate(-1)}>
                    <IoArrowBack className="text-2xl cursor-pointer" />
                </button>
                <h1 className="text-2xl font-bold">Assistente de Rota</h1>
            </div>
            <div className="max-w-4xl mx-auto flex items-center gap-2">
                <div className='flex items-center gap-1'>
                    <CiLocationOn />
                    <p className="font-semibold">{routeInfo.start_address.split(',')[0]}</p>
                </div>
                <IoArrowBack className="text-md transform rotate-180" />
                <p className="font-semibold">{routeInfo.end_address.split(',')[0]}</p>
                <span className="mx-2">•</span>
                <div className='flex items-center gap-1'>
                    <TbClockHour4 />
                    <p>{routeInfo.duration.text}</p>
                </div>
            </div>
        </header>
    )
};

export default HeaderAi;
