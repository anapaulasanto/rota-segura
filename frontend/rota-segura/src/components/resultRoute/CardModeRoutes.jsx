import React from "react";
import { TbRoute } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";
import { TbClockHour3 } from "react-icons/tb";

const CardModeRoutes = ({ handleModeChange, isLoading, currentRoute, leg }) => {
    return (
        <div className="flex flex-col gap-4 bg-white p-4 py-6 w-5/6 rounded-2xl shadow-xl">


            <div className="flex justify-center gap-4 mb-4">
                <button
                    onClick={() => handleModeChange('DRIVING')}
                    className="bg-yellow-500 text-white shadow-md font-bold py-2 px-4 rounded hover:bg-yellow-600 disabled:opacity-50 cursor-pointer"
                    disabled={isLoading}
                >
                    🚙 Carro
                </button>
                <button
                    onClick={() => handleModeChange('BICYCLING')}
                    className="bg-blue-300 text-white shadow-md font-bold py-2 px-4 rounded flex  hover:bg-blue-400 disabled:opacity-50 cursor-pointer"
                    disabled={isLoading}
                >
                    🚲 Bicicleta
                </button>
                <button
                    onClick={() => handleModeChange('WALKING')}
                    className="bg-green-300 shadow-md text-white font-bold py-2 px-4 rounded hover:bg-green-400 disabled:opacity-50 cursor-pointer"
                    disabled={isLoading}
                >
                    🚶 Corrida
                </button>
            </div>
            <div className="flex items-center gap-2  text-neutral-700 ">
                <TbRoute className="w-[23px] h-[23px]" />
                <h1 className="text-xl w-4/5 font-bold">Via {currentRoute.summary} </h1>
            </div>
            <div className="flex justify-start gap-5">
                <p className="flex items-center gap-1 bg-neutral-200 rounded-md px-2 py-1 text-sm font-semibold"><FiMapPin />{leg.distance.text}</p>
                <p className="flex items-center gap-1 bg-neutral-200 rounded-md px-2 py-1 text-sm font-semibold"><TbClockHour3 />{leg.duration.text}</p>
            </div>
        </div>
    )
};

export default CardModeRoutes;
