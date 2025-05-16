import React from "react";
import banner from "../assets/banner.jpg";
import ContentCardAbout from "./ContentCardAbout";
import imgIa from "../assets/ia.png";
import { Link } from "react-router-dom";

const SectionAboutHome = () => {
    return (
        <section>
            <div>
                <img src={banner} alt="Foto de um homem com celular" className="w-screen max-h-[980px] object-cover overflow-hidden max-w-[100vw]" />
            </div>
            <div className="bg-neutral-900 shadow-2xl min-h-screen w-screen">
                <div className="font-title flex flex-col max-w-6xl mx-auto pb-10">
                    <div className="flex flex-col py-20">
                        <span className="text-central pb-5 overflow-y-hidden text-xl tracking-wide font-about">SOBRE</span>
                        <p className="text-neutral-100 text-5xl overflow-y-hidden pb-3">Nosso objetivo é tornar seus trajetos mais seguros, </p>
                        <p className="text-neutral-100 text-4xl  overflow-y-hidden">bem planejados e adaptados ao seu estilo de vida.</p>
                        <p className="text-neutral-400 text-lg pt-6 max-w-1/2  ">Basta escolher o destino que deseja alcançar e nós cuidamos do resto
                        </p>
                    </div>
                    <ContentCardAbout />
                    <div className="flex items-center gap-10 h-full w-full">
                        <div className="flex flex-col items-start max-w-1/2">
                            <span className="text-white pb-5 overflow-y-hidden text-5xl tracking-wide font-title text-center">E mais.. </span>
                            <p className="text-central text-2xl py-3 overflow-y-hidden ">Você pode conversar com uma Inteligência Artificial que te ajuda a entender melhor o caminho escolhido — ela responde dúvidas sobre segurança da rota, presença de ciclofaixas, entre outras informações úteis.</p>
                        </div>
                        <div>
                            <img src={imgIa} alt="Imagem de um braço de robô" />
                        </div>
                    </div>
                    <Link to="/rota-segura/buscar">
                        <button className='bg-central cursor-pointer mb-10 rounded-full px-11 py-4 shadow-md hover:bg-yellow-600 hover:text-white shadow-neutral-600 max-sm:px-7 max-sm:py-5'>Buscar rotas</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SectionAboutHome;
