import React from "react";
import { SlPaperPlane } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { TbRoute } from "react-icons/tb";

const FormRota = ({ handleSubmit, error, setOrigin, setDestination, destination, origin }) => {
    return (
        <>
            <div className="flex flex-col bg-neutral-200 shadow-md shadow-neutral-500 rounded-xl max-xl:w-full max-lg:w-1/2 max-md:mt-6 max-md:w-5/6">
                <form className="flex flex-col items-start justify-center pt-6 px-10 gap-4 text-neutral-500 w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1 mb-3">
                        <div className="flex items-center gap-2">
                            <TbRoute className="w-[23px] h-[23px] text-black" />
                            <h3 className=" text-2xl text-text-central w-96 font-semibold max-md:text-4xl max-md:w-64 max-md:py-2"> Planeje sua rota</h3>
                        </div>
                        <p className="">Digite seu local de origem e destino e nós achamos a melhor rota para você.</p>
                    </div>
                    <label className="flex items-center gap-1 text-black"><SlPaperPlane />Origem</label>
                    <input
                        type="text"
                        className="border border-neutral-500 rounded-full w-full py-3 px-3"
                        placeholder="Endereço de origem"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                    <label className="flex items-center text-black gap-1"><IoLocationOutline />Destino</label>
                    <input
                        type="text"
                        className="border border-neutral-500 rounded-full w-full py-3 px-3 "
                        placeholder="Endereço de destino"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-md mx-auto">{error}</p>}
                    <button
                        type="submit"
                        className='bg-central rounded-full px-5 py-3 mb-20 shadow-md w-2/4 mx-auto mt-6 shadow-neutral-400 cursor-pointer hover:bg-central/70 hover:border-neutral-300 transition-all duration-200 ease-in-out text-white max-sm:w-full max-sm:text-lg '
                    >Buscar rotas
                    </button>
                </form>
            </div>
        </>
    );
};

export default FormRota;
