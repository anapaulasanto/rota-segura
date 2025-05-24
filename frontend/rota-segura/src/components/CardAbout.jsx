import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { SiAccuweather } from "react-icons/si";

const card = [
    {
        icon: <FaMapLocationDot className=" w-[35px] h-[35px] text-white mb-3" />,
        title: "ROTAS RECOMENDADAS",
        description: "Mostramos rotas com base no tipo de locomoção escolhida.",
    },
    {
        icon: <SiAccuweather className=" w-[35px] h-[35px] text-white mb-3" />,
        title: "PREVISÃO DO TEMPO",
        description: "Indicamos a previsão do tempo no horário da sua saída.",
    },
    {
        icon: <IoTime className=" w-[35px] h-[35px] text-white mb-3" />,
        title: "TEMPO DO PERCURSO",
        description: "Estimamos o tempo de percurso com precisão",
    },
]
const CardAbout = () => {
    return (
        <div className="grid h-full"> 
            <div className="gap-10 grid bg-neutral-800/50 grid-cols-3 p-5 m-10 rounded-2xl shadow-xl shadow-amber-100/30 max-lg:flex flex-col mx-auto max-sm:bg-neutral-900/40 max-sm">
                {card.map((item, index) => (
                    <div key={index} className="bg-neutral-900/40 border border-central py-5 rounded-3xl font-title flex flex-col items-center gap-3 ">
                        {item.icon}
                        <p className="text-central text-xl font-about tracking-widest font-semibold">{item.title}</p>
                        <span className="text-neutral-400 max-w-2/3 text-md tracking-widest font-title">{item.description}</span>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default CardAbout;
