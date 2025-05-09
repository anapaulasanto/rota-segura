import { SlPaperPlane } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import React from "react";

const Form = () => {
    return (
        <>
            <div className=" flex flex-col bg-white shadow-lg shadow-gray-500 mx-auto rounded-4xl w-1/2 max-xl:w-full">
                <form className="flex flex-col items-start justify-center h-3/4 py-8 px-10 gap-6 text-neutral-500 ">
                    <label className="flex items-center gap-1"> <SlPaperPlane /> Origem </label>
                    <input
                        type="text"
                        className="border border-neutral-300 rounded-full w-full py-3 px-3"
                        placeholder="Digite o endereço de origem"
                    />
                    <label className="flex items-center gap-1"><IoLocationOutline /> Destino</label>
                    <input
                        type="text"
                        className="border border-neutral-300 rounded-full w-full py-3 px-3 mb-20"
                        placeholder=" Digite o endereço de destino"
                        required="required"
                    />
                </form>
                <button type="submit" className='bg-central rounded-full px-5 py-3 shadow-md w-2/4 mx-auto my-6 shadow-neutral-400'>Buscar rota</button>
            </div>
        </>
    )
};

export default Form;
