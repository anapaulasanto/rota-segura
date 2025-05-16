import React from "react";
import Form from "./Form";
import { SlPaperPlane } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";

const FormRota = () => {
  return (
    <>
          <div className="bg-gray-100 rounded-bl-full w-screen shadow-md shadow-neutral-300 h-screen max-lg:-bottom-[860px] max-md:-bottom-[570px] max-sm:-bottom-[560px]">
              <div className="pb-10 flex items-center mx-auto w-3/5 pt-8 gap-20 max-lg:flex-col max-lg:w-4/5 max-lg:pt-3">
                  <p className="text-center py-24 text-5xl font-title text-black w-96 tracking-widest max-md:text-4xl max-md:w-64 max-md:py-2">Para onde você quer ir?</p>
                  <div className="flex flex-col bg-neutral-200 shadow-md shadow-neutral-500 mx-auto rounded-4xl w-3/4 max-xl:w-full">
                      <Form firstLabel={
                          <>
                              <SlPaperPlane /> Origem
                          </>}
                          firstPlaceholder="Digite o endereço de origem"
                          secondLabel={
                              <>
                                  <IoLocationOutline /> Destino
                              </>}
                          secondPlaceholder="Digite o endereço de destino"
                          textButtonForm="Buscar rotas"
                          classNameBtn='bg-central rounded-full px-5 py-3 mb-20 shadow-md w-2/4 mx-auto my-6 shadow-neutral-400 cursor-pointer hover:bg-central/70 hover:border-neutral-300 transition-all duration-200 ease-in-out'
                      />
                  </div>
              </div>
          </div>
    </>
  );
};

export default FormRota;
