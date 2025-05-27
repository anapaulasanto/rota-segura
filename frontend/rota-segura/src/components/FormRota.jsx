import React from "react";
import { SlPaperPlane } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";

const FormRota = ({ handleSubmit, error, setOrigin, setDestination, destination, origin }) => {
    return (
        <>
            <div className="bg-gray-100 rounded-bl-full w-screen shadow-md shadow-neutral-300 h-screen max-lg:rounded-bl-[250px] max-md:pt-10 max-sm:rounded-bl-[500px]">
                <div className="pb-10 flex items-center mx-auto w-3/5 pt-8 gap-20 max-lg:flex-col max-lg:w-4/5 max-lg:gap-0 max-lg:pt-0">
                    <p className="text-center py-24 text-5xl font-title text-black w-96 tracking-widest max-md:text-4xl max-md:w-64 max-md:py-2">Para onde você quer ir?</p>
                    <div className="flex flex-col bg-neutral-200 shadow-md shadow-neutral-500 mx-auto rounded-4xl w-3/4 max-xl:w-full max-lg:w-1/2 max-md:mt-6 max-md:w-5/6">
                        <div className="flex flex-col items-center justify-center w-full">
                            <form className="flex flex-col items-start justify-center h-3/4 pt-6 px-10 gap-4 text-neutral-500 w-full" onSubmit={handleSubmit}>
                                <label className="flex items-center gap-1 invalid:border-pink-500"><SlPaperPlane />Origem</label>
                                <input
                                    type="text"
                                    className="border border-neutral-500 rounded-full w-full py-3 px-3"
                                    placeholder="Endereço de origem"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                />
                                <label className="flex items-center gap-1"><IoLocationOutline />Destino</label>
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
                                    className='bg-central rounded-full px-5 py-3 mb-20 shadow-md w-2/4 mx-auto my-6 shadow-neutral-400 cursor-pointer hover:bg-central/70 hover:border-neutral-300 transition-all duration-200 ease-in-out text-white max-sm:w-full max-sm:text-lg'
                                >Buscar rotas
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormRota;
